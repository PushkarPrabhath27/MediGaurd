package prediction

import (
	"math"
	"time"

	"github.com/google/uuid"
	"github.com/mediguard/core/internal/equipment"
	"github.com/rs/zerolog/log"
)

type HealthScore struct {
	ID                  uuid.UUID `db:"id" json:"id"`
	EquipmentID         uuid.UUID `db:"equipment_id" json:"equipment_id"`
	Score               float64   `db:"score" json:"score"`
	Band                string    `db:"band" json:"band"`
	DaysSinceMaint      int       `db:"days_since_maintenance" json:"days_since_maintenance"`
	RecentRepairCount   int       `db:"recent_repair_count" json:"recent_repair_count"`
	AgeMonths           int       `db:"age_months" json:"age_months"`
	PendingIssuesCount  int       `db:"pending_issues_count" json:"pending_issues_count"`
	FactorsJSON         string    `db:"factors_json" json:"factors"`
	CalculatedAt        time.Time `db:"calculated_at" json:"calculated_at"`
}

// CalculateScore implements the penalty-based health scoring algorithm
func CalculateScore(e *equipment.Equipment, repairCount90Days int, openIssuesCount int) (float64, string, map[string]interface{}) {
	score := 100.0
	factors := make(map[string]interface{})

	// 1. Maintenance recency penalty
	if e.RecommendedMaintenanceInterval > 0 && e.UpdatedAt.After(time.Time{}) {
		daysSince := int(time.Since(e.UpdatedAt).Hours() / 24)
		ratio := float64(daysSince) / float64(e.RecommendedMaintenanceInterval)
		penalty := 0.0
		if ratio > 1.0 && ratio <= 1.5 {
			penalty = 15
		} else if ratio > 1.5 && ratio <= 2.0 {
			penalty = 30
		} else if ratio > 2.0 {
			penalty = 45
		}
		score -= penalty
		factors["maintenance_penalty"] = penalty
		factors["days_since_maintenance"] = daysSince
	}

	// 2. Repair frequency penalty (last 90 days)
	repairPenalty := 0.0
	if repairCount90Days == 1 {
		repairPenalty = 5
	} else if repairCount90Days == 2 {
		repairPenalty = 15
	} else if repairCount90Days >= 3 {
		repairPenalty = 30
	}
	score -= repairPenalty
	factors["repair_penalty"] = repairPenalty
	factors["recent_repairs"] = repairCount90Days

	// 3. Age penalty
	if e.ExpectedLifecycleMonths > 0 && e.PurchaseDate != nil {
		ageMonths := int(time.Since(*e.PurchaseDate).Hours() / (24 * 30))
		ratio := float64(ageMonths) / float64(e.ExpectedLifecycleMonths)
		agePenalty := 0.0
		if ratio >= 0.5 && ratio < 0.75 {
			agePenalty = 5
		} else if ratio >= 0.75 && ratio < 1.0 {
			agePenalty = 15
		} else if ratio >= 1.0 {
			agePenalty = 25
		}
		score -= agePenalty
		factors["age_penalty"] = agePenalty
		factors["age_months"] = ageMonths
	}

	// 4. Open issues penalty
	issuePenalty := float64(openIssuesCount * 8)
	if issuePenalty > 24 {
		issuePenalty = 24
	}
	score -= issuePenalty
	factors["issue_penalty"] = issuePenalty

	// 5. AMC expired penalty
	if e.AMCExpiryDate != nil && time.Now().After(*e.AMCExpiryDate) {
		score -= 10
		factors["amc_penalty"] = 10
	}

	score = math.Max(0, score)
	band := "healthy"
	if score < 50 {
		band = "critical"
	} else if score < 80 {
		band = "watch"
	}

	return score, band, factors
}

// RecalculateAllJob runs daily to update all equipment scores
func RecalculateAllJob() {
	ticker := time.NewTicker(24 * time.Hour)
	for range ticker.C {
		log.Info().Msg("Starting daily health score recalculation job")
		// 1. Fetch all active equipment
		// 2. For each, calculate score and store
		// 3. Update Redis cache
	}
}
