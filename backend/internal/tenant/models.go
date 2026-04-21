package tenant

import (
	"time"
	"github.com/google/uuid"
)

type Tenant struct {
	ID         uuid.UUID `db:"id" json:"id"`
	Name       string    `db:"name" json:"name"`
	Slug       string    `db:"slug" json:"slug"`
	Plan       string    `db:"plan" json:"plan"`
	MaxDevices int       `db:"max_devices" json:"max_devices"`
	IsActive   bool      `db:"is_active" json:"is_active"`
	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}

type Department struct {
	ID         uuid.UUID `db:"id" json:"id"`
	TenantID   uuid.UUID `db:"tenant_id" json:"tenant_id"`
	Name       string    `db:"name" json:"name"`
	Floor      string    `db:"floor" json:"floor"`
	Building   string    `db:"building" json:"building"`
	HeadUserID *uuid.UUID `db:"head_user_id" json:"head_user_id"`
	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at" json:"updated_at"`
}
