package models

import (
	"encoding/json"
	"net/http"
	"time"
)

type ResponseEnvelope struct {
	Success   bool        `json:"success"`
	Data      interface{} `json:"data,omitempty"`
	Error     interface{} `json:"error,omitempty"`
	RequestID string      `json:"request_id"`
	Timestamp string      `json:"timestamp"`
}

func SuccessResponse(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	// Extract request ID from context (assuming middleware sets it)
	reqID := "unknown"
	// In a real implementation, we would pull this from r.Context()
	// But since this helper doesn't have access to 'r', we might need to pass it or change the signature.
	// For now, we'll generate a placeholder or just omit it if not available.

	json.NewEncoder(w).Encode(ResponseEnvelope{
		Success:   true,
		Data:      data,
		RequestID: reqID,
		Timestamp: time.Now().Format(time.RFC3339),
	})
}

func ErrorResponse(w http.ResponseWriter, status int, message string, details interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	json.NewEncoder(w).Encode(ResponseEnvelope{
		Success: false,
		Error: map[string]interface{}{
			"message": message,
			"details": details,
		},
		RequestID: "unknown",
		Timestamp: time.Now().Format(time.RFC3339),
	})
}
