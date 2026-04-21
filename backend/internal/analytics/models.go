package analytics

import (
	"time"

	"github.com/google/uuid"
)

type Snapshot struct {
	ID                  uuid.UUID `db:"id" json:"id"`
	TenantID            uuid.UUID `db:"tenant_id" json:"tenant_id"`
	TotalEquipment      int       `db:"total_equipment" json:"total_equipment"`
	HealthyEquipment    int       `db:"healthy_equipment" json:"healthy_equipment"`
	WatchEquipment      int       `db:"watch_equipment" json:"watch_equipment"`
	CriticalEquipment   int       `db:"critical_equipment" json:"critical_equipment"`
	OpenWorkOrders      int       `db:"open_work_orders" json:"open_work_orders"`
	AvgMTBFDays         float64   `db:"avg_mtbf_days" json:"avg_mtbf_days"`
	TotalMaintenanceCost float64   `db:"total_maintenance_cost" json:"total_maintenance_cost"`
	SnapshotDate        time.Time `db:"snapshot_date" json:"snapshot_date"`
}
