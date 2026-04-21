package auth

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/mediguard/core/internal/shared/redis"
)

type AuthRepository interface {
	FindUserByEmail(ctx context.Context, tenantID uuid.UUID, email string) (*User, error)
	CreateUser(ctx context.Context, user *User) error
	UpdateLastLogin(ctx context.Context, userID uuid.UUID) error
	StoreRefreshToken(ctx context.Context, userID uuid.UUID, token string, expiry time.Duration) error
	ValidateRefreshToken(ctx context.Context, token string) (uuid.UUID, error)
	RevokeRefreshToken(ctx context.Context, token string) error
	FindTenantBySlug(ctx context.Context, slug string) (uuid.UUID, error)
}

type postgresAuthRepository struct {
	db *sqlx.DB
}

func NewAuthRepository(db *sqlx.DB) AuthRepository {
	return &postgresAuthRepository{db: db}
}

func (r *postgresAuthRepository) FindUserByEmail(ctx context.Context, tenantID uuid.UUID, email string) (*User, error) {
	var user User
	err := r.db.GetContext(ctx, &user, "SELECT * FROM users WHERE tenant_id = $1 AND email = $2 AND is_active = true", tenantID, email)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func (r *postgresAuthRepository) CreateUser(ctx context.Context, user *User) error {
	query := `
		INSERT INTO users (tenant_id, email, password_hash, first_name, last_name, role)
		VALUES (:tenant_id, :email, :password_hash, :first_name, :last_name, :role)
		RETURNING id, created_at, updated_at
	`
	rows, err := r.db.NamedQueryContext(ctx, query, user)
	if err != nil {
		return err
	}
	defer rows.Close()

	if rows.Next() {
		return rows.Scan(&user.ID, &user.CreatedAt, &user.UpdatedAt)
	}
	return fmt.Errorf("failed to create user")
}

func (r *postgresAuthRepository) UpdateLastLogin(ctx context.Context, userID uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, "UPDATE users SET last_login_at = NOW() WHERE id = $1", userID)
	return err
}

func (r *postgresAuthRepository) StoreRefreshToken(ctx context.Context, userID uuid.UUID, token string, expiry time.Duration) error {
	key := fmt.Sprintf("refresh_token:%s", token)
	return redis.Set(ctx, key, userID.String(), expiry)
}

func (r *postgresAuthRepository) ValidateRefreshToken(ctx context.Context, token string) (uuid.UUID, error) {
	key := fmt.Sprintf("refresh_token:%s", token)
	var userIDStr string
	err := redis.Get(ctx, key, &userIDStr)
	if err != nil {
		return uuid.Nil, err
	}
	return uuid.Parse(userIDStr)
}

func (r *postgresAuthRepository) RevokeRefreshToken(ctx context.Context, token string) error {
	key := fmt.Sprintf("refresh_token:%s", token)
	return redis.Delete(ctx, key)
}

func (r *postgresAuthRepository) FindTenantBySlug(ctx context.Context, slug string) (uuid.UUID, error) {
	var id uuid.UUID
	err := r.db.GetContext(ctx, &id, "SELECT id FROM tenants WHERE slug = $1 AND is_active = true", slug)
	return id, err
}
