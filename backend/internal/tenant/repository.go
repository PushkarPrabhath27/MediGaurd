package tenant

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type TenantRepository interface {
	Create(ctx context.Context, t *Tenant) error
	FindByID(ctx context.Context, id uuid.UUID) (*Tenant, error)
	Update(ctx context.Context, t *Tenant) error
	SoftDelete(ctx context.Context, id uuid.UUID) error
	List(ctx context.Context) ([]Tenant, error)

	CreateDepartment(ctx context.Context, d *Department) error
	ListDepartments(ctx context.Context, tenantID uuid.UUID) ([]Department, error)
	UpdateDepartment(ctx context.Context, d *Department) error
	DeleteDepartment(ctx context.Context, id uuid.UUID) error
}

type postgresTenantRepository struct {
	db *sqlx.DB
}

func NewTenantRepository(db *sqlx.DB) TenantRepository {
	return &postgresTenantRepository{db: db}
}

func (r *postgresTenantRepository) Create(ctx context.Context, t *Tenant) error {
	query := `
		INSERT INTO tenants (name, slug, plan, max_devices)
		VALUES (:name, :slug, :plan, :max_devices)
		RETURNING id, created_at, updated_at
	`
	rows, err := r.db.NamedQueryContext(ctx, query, t)
	if err != nil {
		return err
	}
	defer rows.Close()
	if rows.Next() {
		return rows.Scan(&t.ID, &t.CreatedAt, &t.UpdatedAt)
	}
	return nil
}

func (r *postgresTenantRepository) FindByID(ctx context.Context, id uuid.UUID) (*Tenant, error) {
	var t Tenant
	err := r.db.GetContext(ctx, &t, "SELECT * FROM tenants WHERE id = $1 AND is_active = true", id)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	return &t, err
}

func (r *postgresTenantRepository) Update(ctx context.Context, t *Tenant) error {
	query := `
		UPDATE tenants SET name = :name, plan = :plan, max_devices = :max_devices, updated_at = NOW()
		WHERE id = :id
	`
	_, err := r.db.NamedExecContext(ctx, query, t)
	return err
}

func (r *postgresTenantRepository) SoftDelete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, "UPDATE tenants SET is_active = false WHERE id = $1", id)
	return err
}

func (r *postgresTenantRepository) List(ctx context.Context) ([]Tenant, error) {
	var tenants []Tenant
	err := r.db.SelectContext(ctx, &tenants, "SELECT * FROM tenants WHERE is_active = true")
	return tenants, err
}

func (r *postgresTenantRepository) CreateDepartment(ctx context.Context, d *Department) error {
	query := `
		INSERT INTO departments (tenant_id, name, floor, building)
		VALUES (:tenant_id, :name, :floor, :building)
		RETURNING id, created_at, updated_at
	`
	rows, err := r.db.NamedQueryContext(ctx, query, d)
	if err != nil {
		return err
	}
	defer rows.Close()
	if rows.Next() {
		return rows.Scan(&d.ID, &d.CreatedAt, &d.UpdatedAt)
	}
	return nil
}

func (r *postgresTenantRepository) ListDepartments(ctx context.Context, tenantID uuid.UUID) ([]Department, error) {
	var depts []Department
	err := r.db.SelectContext(ctx, &depts, "SELECT * FROM departments WHERE tenant_id = $1", tenantID)
	return depts, err
}

func (r *postgresTenantRepository) UpdateDepartment(ctx context.Context, d *Department) error {
	query := `
		UPDATE departments SET name = :name, floor = :floor, building = :building, head_user_id = :head_user_id, updated_at = NOW()
		WHERE id = :id AND tenant_id = :tenant_id
	`
	_, err := r.db.NamedExecContext(ctx, query, d)
	return err
}

func (r *postgresTenantRepository) DeleteDepartment(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, "DELETE FROM departments WHERE id = $1", id)
	return err
}
