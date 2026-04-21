package prediction

import (
	"time"

	"github.com/google/uuid"
)

type Prediction struct {
	ID                 uuid.UUID `db:"id" json:"id"`
	EquipmentID        uuid.UUID `db:"equipment_id" json:"equipment_id"`
	HorizonDays        int       `db:"horizon_days" json:"horizon_days"`
	FailureProbability float64   `db:"failure_probability" json:"failure_probability"`
	ConfidenceLevel    float64   `db:"confidence_level" json:"confidence_level"`
	ModelVersion       string    `db:"model_version" json:"model_version"`
	FactorsJSON        string    `db:"factors_json" json:"factors"`
	CalculatedAt       time.Time `db:"calculated_at" json:"calculated_at"`
}

// GeneratePredictions creates 7, 14, and 30-day failure probabilities based on health band
func GeneratePredictions(equipmentID uuid.UUID, band string, score float64) []Prediction {
	horizons := []int{7, 14, 30}
	predictions := make([]Prediction, 0, len(horizons))

	for _, h := range horizons {
		prob := 0.0
		conf := 0.85 // Base confidence

		switch band {
		case "healthy":
			if h == 7 { prob = 2.0 } else if h == 14 { prob = 5.0 } else { prob = 10.0 }
		case "watch":
			if h == 7 { prob = 15.0 } else if h == 14 { prob = 30.0 } else { prob = 50.0 }
		case "critical":
			if h == 7 { prob = 40.0 } else if h == 14 { prob = 70.0 } else { prob = 95.0 }
		}

		// Adjust probability slightly based on exact score within the band
		// Lower score within band = higher probability

		predictions = append(predictions, Prediction{
			ID:                 uuid.New(),
			EquipmentID:        equipmentID,
			HorizonDays:        h,
			FailureProbability: prob,
			ConfidenceLevel:    conf,
			ModelVersion:       "v1.0.heuristic",
			CalculatedAt:       time.Now(),
		})
	}

	return predictions
}
