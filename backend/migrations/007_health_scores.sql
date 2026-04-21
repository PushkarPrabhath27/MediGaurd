CREATE TABLE health_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID NOT NULL REFERENCES equipment(id),
  score DECIMAL(5,2) NOT NULL,
  band VARCHAR(20) NOT NULL,
  days_since_maintenance INTEGER,
  recent_repair_count INTEGER,
  age_months INTEGER,
  pending_issues_count INTEGER,
  factors_json JSONB,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_health_scores_equipment_id ON health_scores(equipment_id);
CREATE INDEX idx_health_scores_calculated_at ON health_scores(calculated_at);
