package equipment

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type EquipmentRepository interface {
	Create(ctx context.Context, e *Equipment) error
	FindByID(ctx context.Context, tenantID, id uuid.UUID) (*Equipment, error)
	FindAll(ctx context.Context, tenantID uuid.UUID, filters map[string]interface{}) ([]Equipment, error)
	Update(ctx context.Context, e *Equipment) error
	SoftDelete(ctx context.Context, tenantID, id uuid.UUID) error
	FindByQRCode(ctx context.Context, qrCode string) (*Equipment, error)
}

type postgresEquipmentRepository struct {
	db *sqlx.DB
}

func NewEquipmentRepository(db *sqlx.DB) EquipmentRepository {
	return &postgresEquipmentRepository{db: db}
}

func (r *postgresEquipmentRepository) Create(ctx context.Context, e *Equipment) error {
	query := `
		INSERT INTO equipment (
			tenant_id, department_id, vendor_id, name, model, manufacturer, 
			serial_number, asset_tag, purchase_date, purchase_cost, 
			expected_lifecycle_months, amc_start_date, amc_expiry_date, 
			amc_cost, recommended_maintenance_interval_days, location_description, 
			qr_code, status
		) VALUES (
			:tenant_id, :department_id, :vendor_id, :name, :model, :manufacturer, 
			:serial_number, :asset_tag, :purchase_date, :purchase_cost, 
			:expected_lifecycle_months, :amc_start_date, :amc_expiry_date, 
			:amc_cost, :recommended_maintenance_interval_days, :location_description, 
			:qr_code, :status
		) RETURNING id, created_at, updated_at
	`
	rows, err := r.db.NamedQueryContext(ctx, query, e)
	if err != nil {
		return err
	}
	defer rows.Close()
	if rows.Next() {
		return rows.Scan(&e.ID, &e.CreatedAt, &e.UpdatedAt)
	}
	return nil
}

func (r *postgresEquipmentRepository) FindByID(ctx context.Context, tenantID, id uuid.UUID) (*Equipment, error) {
	var e Equipment
	query := `
		SELECT e.*, h.score as latest_health_score 
		FROM equipment e 
		LEFT JOIN health_scores h ON e.id = h.equipment_id 
		AND h.calculated_at = (SELECT MAX(calculated_at) FROM health_scores WHERE equipment_id = e.id)
		WHERE e.id = $1 AND e.tenant_id = $2 AND e.status != 'decommissioned'
	`
	err := r.db.GetContext(ctx, &e, query, id, tenantID)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	return &e, err
}

func (r *postgresEquipmentRepository) FindAll(ctx context.Context, tenantID uuid.UUID, filters map[string]interface{}) ([]Equipment, error) {
	var eList []Equipment
	query := `
		SELECT e.*, h.score as latest_health_score 
		FROM equipment e 
		LEFT JOIN health_scores h ON e.id = h.equipment_id 
		AND h.calculated_at = (SELECT MAX(calculated_at) FROM health_scores WHERE equipment_id = e.id)
		WHERE e.tenant_id = $1 AND e.status != 'decommissioned'
	`
	// TODO: Add dynamic filters for department, status, etc.
	err := r.db.SelectContext(ctx, &eList, query, tenantID)
	return eList, err
}

func (r *postgresEquipmentRepository) Update(ctx context.Context, e *Equipment) error {
	query := `
		UPDATE equipment SET 
			department_id = :department_id, vendor_id = :vendor_id, name = :name, 
			model = :model, manufacturer = :manufacturer, serial_number = :serial_number, 
			asset_tag = :asset_tag, purchase_date = :purchase_date, purchase_cost = :purchase_cost, 
			expected_lifecycle_months = :expected_lifecycle_months, amc_start_date = :amc_start_date, 
			amc_expiry_date = :amc_expiry_date, amc_cost = :amc_cost, 
			recommended_maintenance_interval_days = :recommended_maintenance_interval_days, 
			location_description = :location_description, status = :status, updated_at = NOW()
		WHERE id = :id AND tenant_id = :tenant_id
	`
	_, err := r.db.NamedExecContext(ctx, query, e)
	return err
}

func (r *postgresEquipmentRepository) SoftDelete(ctx context.Context, tenantID, id uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, "UPDATE equipment SET status = 'decommissioned' WHERE id = $1 AND tenant_id = $2", id, tenantID)
	return err
}

func (r *postgresEquipmentRepository) FindByQRCode(ctx context.Context, qrCode string) (*Equipment, error) {
	var e Equipment
	err := r.db.GetContext(ctx, &e, "SELECT * FROM equipment WHERE qr_code = $1", qrCode)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	return &e, err
}
