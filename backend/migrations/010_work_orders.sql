CREATE TABLE work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  equipment_id UUID NOT NULL REFERENCES equipment(id),
  creator_id UUID REFERENCES users(id),
  assignee_id UUID REFERENCES users(id),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'emergency'
  status VARCHAR(20) NOT NULL DEFAULT 'open', -- 'open', 'in_progress', 'pending_parts', 'completed', 'cancelled'
  type VARCHAR(50) NOT NULL, -- 'breakdown', 'maintenance', 'inspection'
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  sla_deadline TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
