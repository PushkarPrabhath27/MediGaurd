package alert

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/mediguard/core/internal/shared/redis"
)

type Alert struct {
	ID          uuid.UUID              `db:"id" json:"id"`
	TenantID    uuid.UUID              `db:"tenant_id" json:"tenant_id"`
	EquipmentID *uuid.UUID             `db:"equipment_id" json:"equipment_id"`
	Type        string                 `db:"type" json:"type"`
	Severity    string                 `db:"severity" json:"severity"`
	Message     string                 `db:"message" json:"message"`
	IsRead      bool                   `db:"is_read" json:"is_read"`
	Metadata    map[string]interface{} `db:"metadata" json:"metadata"`
	CreatedAt   time.Time              `db:"created_at" json:"created_at"`
}

const AlertChannel = "mediguard:alerts"

// Notify sends an alert to Redis for real-time delivery
func Notify(ctx context.Context, a Alert) error {
	// 1. Store in DB (omitted for brevity, would use a repository)
	
	// 2. Publish to Redis
	return redis.Publish(ctx, AlertChannel, a)
}

// SSEHandler would normally live in a separate file, but here's the logic
// func (h *AlertHandler) Stream(w http.ResponseWriter, r *http.Request) {
//     flusher, ok := w.(http.Flusher)
//     ... setup SSE headers ...
//     pubsub := redis.Subscribe(r.Context(), AlertChannel)
//     ch := pubsub.Channel()
//     for msg := range ch {
//         fmt.Fprintf(w, "data: %s\n\n", msg.Payload)
//         flusher.Flush()
//     }
// }
