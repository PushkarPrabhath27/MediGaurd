CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  equipment_id UUID REFERENCES equipment(id),
  type VARCHAR(50) NOT NULL, -- 'failure_prediction', 'sla_breach', 'low_health'
  severity VARCHAR(20) NOT NULL, -- 'info', 'warning', 'critical'
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_alerts_tenant_unread ON alerts(tenant_id) WHERE is_read = false;
