CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID NOT NULL REFERENCES equipment(id),
  horizon_days INTEGER NOT NULL,
  failure_probability DECIMAL(5,2) NOT NULL,
  confidence_level DECIMAL(5,2),
  model_version VARCHAR(50),
  factors_json JSONB,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
