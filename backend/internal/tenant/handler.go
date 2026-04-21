package tenant

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/mediguard/core/internal/shared/models"
	mgMiddleware "github.com/mediguard/core/internal/shared/middleware"
)

type TenantHandler struct {
	repo TenantRepository
}

func NewTenantHandler(repo TenantRepository) *TenantHandler {
	return &TenantHandler{repo: repo}
}

func (h *TenantHandler) RegisterRoutes(r chi.Router) {
	// Public or admin routes
	r.Route("/tenants", func(r chi.Router) {
		r.Post("/", h.CreateTenant) // super_admin
		r.Get("/", h.ListTenants)   // super_admin
	})

	// Department routes (within tenant context)
	r.Route("/departments", func(r chi.Router) {
		r.Post("/", h.CreateDepartment)
		r.Get("/", h.ListDepartments)
	})
}

func (h *TenantHandler) CreateTenant(w http.ResponseWriter, r *http.Request) {
	// Implementation...
}

func (h *TenantHandler) ListTenants(w http.ResponseWriter, r *http.Request) {
	// Implementation...
}

func (h *TenantHandler) CreateDepartment(w http.ResponseWriter, r *http.Request) {
	tenantID := r.Context().Value(mgMiddleware.TenantIDKey).(uuid.UUID)
	// Implementation...
}

func (h *TenantHandler) ListDepartments(w http.ResponseWriter, r *http.Request) {
	tenantID := r.Context().Value(mgMiddleware.TenantIDKey).(uuid.UUID)
	depts, err := h.repo.ListDepartments(r.Context(), tenantID)
	if err != nil {
		models.ErrorResponse(w, http.StatusInternalServerError, "Failed to list departments", nil)
		return
	}
	models.SuccessResponse(w, http.StatusOK, depts)
}
