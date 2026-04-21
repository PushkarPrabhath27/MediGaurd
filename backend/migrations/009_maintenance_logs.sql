CREATE TABLE maintenance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID NOT NULL REFERENCES equipment(id),
  technician_id UUID REFERENCES users(id),
  service_type VARCHAR(50) NOT NULL, -- 'preventive', 'corrective', 'calibration'
  description TEXT,
  parts_replaced JSONB,
  cost DECIMAL(12,2),
  performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  next_service_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
