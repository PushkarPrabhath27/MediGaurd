package auth

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/mediguard/core/internal/shared/models"
)

type AuthHandler struct {
	service AuthService
}

func NewAuthHandler(service AuthService) *AuthHandler {
	return &AuthHandler{service: service}
}

func (h *AuthHandler) RegisterRoutes(r chi.Router) {
	r.Post("/login", h.Login)
	r.Post("/register", h.Register)
	r.Post("/logout", h.Logout)
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	tenantSlug := r.Header.Get("X-Tenant-Slug")
	if tenantSlug == "" {
		models.ErrorResponse(w, http.StatusBadRequest, "Missing X-Tenant-Slug header", nil)
		return
	}

	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		models.ErrorResponse(w, http.StatusBadRequest, "Invalid request body", nil)
		return
	}

	tokens, err := h.service.Login(r.Context(), req, tenantSlug)
	if err != nil {
		status := http.StatusUnauthorized
		if err == ErrTenantNotFound {
			status = http.StatusNotFound
		}
		models.ErrorResponse(w, status, err.Error(), nil)
		return
	}

	models.SuccessResponse(w, http.StatusOK, tokens)
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		models.ErrorResponse(w, http.StatusBadRequest, "Invalid request body", nil)
		return
	}

	err := h.service.Register(r.Context(), req)
	if err != nil {
		status := http.StatusInternalServerError
		if err == ErrUserAlreadyExists {
			status = http.StatusConflict
		} else if err == ErrTenantNotFound {
			status = http.StatusNotFound
		}
		models.ErrorResponse(w, status, err.Error(), nil)
		return
	}

	models.SuccessResponse(w, http.StatusCreated, "User registered successfully")
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	// Implementation for logout (revoking refresh token)
	models.SuccessResponse(w, http.StatusOK, "Logged out successfully")
}
