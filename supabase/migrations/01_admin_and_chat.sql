ALTER TABLE ai_messages ADD COLUMN model TEXT DEFAULT 'gemini';
ALTER TABLE ai_messages ADD COLUMN media_url TEXT;
ALTER TABLE ai_messages ADD COLUMN media_type TEXT CHECK (media_type IN ('image', 'document', 'audio'));

CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read all" ON activity_log
    FOR SELECT TO authenticated
    USING ( (SELECT role FROM profiles WHERE id = auth.uid()) = 'ADMIN' );
