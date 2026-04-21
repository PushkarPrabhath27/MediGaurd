package workorder

import (
	"time"

	"github.com/google/uuid"
)

type WorkOrder struct {
	ID           uuid.UUID `db:"id" json:"id"`
	TenantID     uuid.UUID `db:"tenant_id" json:"tenant_id"`
	EquipmentID  uuid.UUID `db:"equipment_id" json:"equipment_id"`
	CreatorID    *uuid.UUID `db:"creator_id" json:"creator_id"`
	AssigneeID   *uuid.UUID `db:"assignee_id" json:"assignee_id"`
	Priority     string    `db:"priority" json:"priority"`
	Status       string    `db:"status" json:"status"`
	Type         string    `db:"type" json:"type"`
	Subject      string    `db:"subject" json:"subject"`
	Description  string    `db:"description" json:"description"`
	DueDate      *time.Time `db:"due_date" json:"due_date"`
	SLADeadline  *time.Time `db:"sla_deadline" json:"sla_deadline"`
	CompletedAt  *time.Time `db:"completed_at" json:"completed_at"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time `db:"updated_at" json:"updated_at"`
}

type WorkOrderHistory struct {
	ID          uuid.UUID `db:"id" json:"id"`
	WorkOrderID uuid.UUID `db:"work_order_id" json:"work_order_id"`
	UserID      uuid.UUID `db:"user_id" json:"user_id"`
	FromStatus  string    `db:"from_status" json:"from_status"`
	ToStatus    string    `db:"to_status" json:"to_status"`
	Comment     string    `db:"comment" json:"comment"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
}

// Status transitions
var ValidTransitions = map[string][]string{
	"open":        {"in_progress", "cancelled"},
	"in_progress": {"pending_parts", "completed", "cancelled"},
	"pending_parts": {"in_progress", "cancelled"},
}
