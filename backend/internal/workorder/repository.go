package workorder

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type WorkOrderRepository interface {
	Create(ctx context.Context, wo *WorkOrder) error
	FindByID(ctx context.Context, tenantID, id uuid.UUID) (*WorkOrder, error)
	UpdateStatus(ctx context.Context, id uuid.UUID, tenantID uuid.UUID, fromStatus, toStatus string, userID uuid.UUID, comment string) error
	List(ctx context.Context, tenantID uuid.UUID) ([]WorkOrder, error)
}

type postgresWorkOrderRepository struct {
	db *sqlx.DB
}

func NewWorkOrderRepository(db *sqlx.DB) WorkOrderRepository {
	return &postgresWorkOrderRepository{db: db}
}

func (r *postgresWorkOrderRepository) Create(ctx context.Context, wo *WorkOrder) error {
	query := `
		INSERT INTO work_orders (tenant_id, equipment_id, creator_id, priority, type, subject, description, sla_deadline)
		VALUES (:tenant_id, :equipment_id, :creator_id, :priority, :type, :subject, :description, :sla_deadline)
		RETURNING id, status, created_at, updated_at
	`
	rows, err := r.db.NamedQueryContext(ctx, query, wo)
	if err != nil {
		return err
	}
	defer rows.Close()
	if rows.Next() {
		return rows.Scan(&wo.ID, &wo.Status, &wo.CreatedAt, &wo.UpdatedAt)
	}
	return nil
}

func (r *postgresWorkOrderRepository) FindByID(ctx context.Context, tenantID, id uuid.UUID) (*WorkOrder, error) {
	var wo WorkOrder
	err := r.db.GetContext(ctx, &wo, "SELECT * FROM work_orders WHERE id = $1 AND tenant_id = $2", id, tenantID)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	return &wo, err
}

func (r *postgresWorkOrderRepository) UpdateStatus(ctx context.Context, id uuid.UUID, tenantID uuid.UUID, fromStatus, toStatus string, userID uuid.UUID, comment string) error {
	tx, err := r.db.Beginx()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	// Update status
	_, err = tx.ExecContext(ctx, "UPDATE work_orders SET status = $1, updated_at = NOW() WHERE id = $2 AND tenant_id = $3", toStatus, id, tenantID)
	if err != nil {
		return err
	}

	// Log history
	_, err = tx.ExecContext(ctx, `
		INSERT INTO work_order_history (work_order_id, user_id, from_status, to_status, comment)
		VALUES ($1, $2, $3, $4, $5)
	`, id, userID, fromStatus, toStatus, comment)
	if err != nil {
		return err
	}

	return tx.Commit()
}

func (r *postgresWorkOrderRepository) List(ctx context.Context, tenantID uuid.UUID) ([]WorkOrder, error) {
	var list []WorkOrder
	err := r.db.SelectContext(ctx, &list, "SELECT * FROM work_orders WHERE tenant_id = $1 ORDER BY created_at DESC", tenantID)
	return list, err
}
