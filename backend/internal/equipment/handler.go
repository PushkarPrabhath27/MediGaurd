package equipment

import (
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"net/http"
	"github.com/mediguard/core/internal/shared/models"
	mgMiddleware "github.com/mediguard/core/internal/shared/middleware"
)

type EquipmentHandler struct {
	repo EquipmentRepository
}

func NewEquipmentHandler(repo EquipmentRepository) *EquipmentHandler {
	return &EquipmentHandler{repo: repo}
}

func (h *EquipmentHandler) RegisterRoutes(r chi.Router) {
	r.Route("/equipment", func(r chi.Router) {
		r.Post("/", h.CreateEquipment)
		r.Get("/", h.ListEquipment)
		r.Get("/{id}", h.GetEquipment)
		r.Put("/{id}", h.UpdateEquipment)
		r.Delete("/{id}", h.DeleteEquipment)
		r.Get("/qr/{qrCode}", h.GetByQRCode)
	})
}

func (h *EquipmentHandler) CreateEquipment(w http.ResponseWriter, r *http.Request) {
	// Implementation...
}

func (h *EquipmentHandler) ListEquipment(w http.ResponseWriter, r *http.Request) {
	tenantID := r.Context().Value(mgMiddleware.TenantIDKey).(uuid.UUID)
	equipment, err := h.repo.FindAll(r.Context(), tenantID, nil)
	if err != nil {
		models.ErrorResponse(w, http.StatusInternalServerError, "Failed to list equipment", nil)
		return
	}
	models.SuccessResponse(w, http.StatusOK, equipment)
}

func (h *EquipmentHandler) GetEquipment(w http.ResponseWriter, r *http.Request) {
	tenantID := r.Context().Value(mgMiddleware.TenantIDKey).(uuid.UUID)
	id, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		models.ErrorResponse(w, http.StatusBadRequest, "Invalid equipment ID", nil)
		return
	}

	e, err := h.repo.FindByID(r.Context(), tenantID, id)
	if err != nil {
		models.ErrorResponse(w, http.StatusInternalServerError, "Failed to fetch equipment", nil)
		return
	}
	if e == nil {
		models.ErrorResponse(w, http.StatusNotFound, "Equipment not found", nil)
		return
	}

	models.SuccessResponse(w, http.StatusOK, e)
}

func (h *EquipmentHandler) UpdateEquipment(w http.ResponseWriter, r *http.Request) {
	// Implementation...
}

func (h *EquipmentHandler) DeleteEquipment(w http.ResponseWriter, r *http.Request) {
	// Implementation...
}

func (h *EquipmentHandler) GetByQRCode(w http.ResponseWriter, r *http.Request) {
	// Implementation...
}
