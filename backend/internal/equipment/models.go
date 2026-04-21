package equipment

import (
	"time"

	"github.com/google/uuid"
)

type Equipment struct {
	ID                               uuid.UUID `db:"id" json:"id"`
	TenantID                         uuid.UUID `db:"tenant_id" json:"tenant_id"`
	DepartmentID                     *uuid.UUID `db:"department_id" json:"department_id"`
	VendorID                         *uuid.UUID `db:"vendor_id" json:"vendor_id"`
	Name                             string    `db:"name" json:"name"`
	Model                            string    `db:"model" json:"model"`
	Manufacturer                     string    `db:"manufacturer" json:"manufacturer"`
	SerialNumber                     string    `db:"serial_number" json:"serial_number"`
	AssetTag                         string    `db:"asset_tag" json:"asset_tag"`
	PurchaseDate                     *time.Time `db:"purchase_date" json:"purchase_date"`
	PurchaseCost                     float64   `db:"purchase_cost" json:"purchase_cost"`
	ExpectedLifecycleMonths          int       `db:"expected_lifecycle_months" json:"expected_lifecycle_months"`
	AMCStartDate                     *time.Time `db:"amc_start_date" json:"amc_start_date"`
	AMCCost                          float64   `db:"amc_cost" json:"amc_cost"`
	AMCExpiryDate                    *time.Time `db:"amc_expiry_date" json:"amc_expiry_date"`
	RecommendedMaintenanceInterval   int       `db:"recommended_maintenance_interval_days" json:"maintenance_interval"`
	LocationDescription              string    `db:"location_description" json:"location"`
	QRCode                           string    `db:"qr_code" json:"qr_code"`
	Status                           string    `db:"status" json:"status"`
	CreatedAt                        time.Time `db:"created_at" json:"created_at"`
	UpdatedAt                        time.Time `db:"updated_at" json:"updated_at"`

	// Joined fields
	LatestHealthScore *float64 `db:"latest_health_score" json:"latest_health_score,omitempty"`
}

type Vendor struct {
	ID           uuid.UUID `db:"id" json:"id"`
	TenantID     uuid.UUID `db:"tenant_id" json:"tenant_id"`
	Name         string    `db:"name" json:"name"`
	ContactEmail string    `db:"contact_email" json:"contact_email"`
	ContactPhone string    `db:"contact_phone" json:"contact_phone"`
	Country      string    `db:"country" json:"country"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
}
