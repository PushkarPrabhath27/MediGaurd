package analytics

import (
	"context"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type AnalyticsRepository interface {
	CreateSnapshot(ctx context.Context, s *Snapshot) error
	GetLatestSnapshot(ctx context.Context, tenantID uuid.UUID) (*Snapshot, error)
	GetHistory(ctx context.Context, tenantID uuid.UUID, days int) ([]Snapshot, error)
}

type postgresAnalyticsRepository struct {
	db *sqlx.DB
}

func NewAnalyticsRepository(db *sqlx.DB) AnalyticsRepository {
	return &postgresAnalyticsRepository{db: db}
}

func (r *postgresAnalyticsRepository) CreateSnapshot(ctx context.Context, s *Snapshot) error {
	query := `
		INSERT INTO analytics_snapshots (
			tenant_id, total_equipment, healthy_equipment, watch_equipment, 
			critical_equipment, open_work_orders, avg_mtbf_days, 
			total_maintenance_cost, snapshot_date
		) VALUES (
			:tenant_id, :total_equipment, :healthy_equipment, :watch_equipment, 
			:critical_equipment, :open_work_orders, :avg_mtbf_days, 
			:total_maintenance_cost, :snapshot_date
		)
	`
	_, err := r.db.NamedExecContext(ctx, query, s)
	return err
}

func (r *postgresAnalyticsRepository) GetLatestSnapshot(ctx context.Context, tenantID uuid.UUID) (*Snapshot, error) {
	var s Snapshot
	err := r.db.GetContext(ctx, &s, "SELECT * FROM analytics_snapshots WHERE tenant_id = $1 ORDER BY snapshot_date DESC LIMIT 1", tenantID)
	return &s, err
}

func (r *postgresAnalyticsRepository) GetHistory(ctx context.Context, tenantID uuid.UUID, days int) ([]Snapshot, error) {
	var history []Snapshot
	err := r.db.SelectContext(ctx, &history, "SELECT * FROM analytics_snapshots WHERE tenant_id = $1 AND snapshot_date >= NOW() - INTERVAL '$2 days' ORDER BY snapshot_date ASC", tenantID, days)
	return history, err
}
