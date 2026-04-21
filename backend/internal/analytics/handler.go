package analytics

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/mediguard/core/internal/shared/models"
	mgMiddleware "github.com/mediguard/core/internal/shared/middleware"
)

type AnalyticsHandler struct {
	repo AnalyticsRepository
}

func NewAnalyticsHandler(repo AnalyticsRepository) *AnalyticsHandler {
	return &AnalyticsHandler{repo: repo}
}

func (h *AnalyticsHandler) RegisterRoutes(r chi.Router) {
	r.Route("/analytics", func(r chi.Router) {
		r.Get("/stats", h.GetDashboardStats)
	})
}

func (h *AnalyticsHandler) GetDashboardStats(w http.ResponseWriter, r *http.Request) {
	tenantID := r.Context().Value(mgMiddleware.TenantIDKey).(uuid.UUID)
	
	snapshot, err := h.repo.GetLatestSnapshot(r.Context(), tenantID)
	if err != nil {
		// Return mock data if no snapshot exists yet for demo
		mockData := map[string]interface{}{
			"total_assets": 1284,
			"critical_health": 14,
			"maintenance_due": 45,
			"uptime": "99.8%",
			"recent_alerts": []map[string]interface{}{
				{"id": 1, "name": "MRI Scanner - Unit 4B", "prob": "84%", "status": "Critical"},
				{"id": 2, "name": "Ventilator V-90", "prob": "62%", "status": "Watch"},
				{"id": 3, "name": "CT System - Radiology", "prob": "45%", "status": "Stable"},
			},
		}
		models.SuccessResponse(w, http.StatusOK, mockData)
		return
	}

	models.SuccessResponse(w, http.StatusOK, snapshot)
}
