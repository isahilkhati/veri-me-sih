-- This is a sample seed file for development purposes.
-- Note: In a real environment, users must be created through Supabase Auth to generate valid auth.users entries.
-- The following assumes auth.users already exist or uses raw inserts for demonstration.

-- Insert demo profiles (Replace UUIDs with real auth.user IDs in practice)
-- INSERT INTO profiles (id, email, role, full_name, bio) VALUES ...

-- Insert sample problem statement
INSERT INTO industry_profiles (id, company_name, industry_type, location, is_verified) 
VALUES ('c0000000-0000-0000-0000-000000000001', 'TechNova Solutions', 'IT Services', 'Bangalore', true)
ON CONFLICT DO NOTHING;

INSERT INTO problem_statements (industry_id, title, description, domain, keywords, expected_complexity, status)
VALUES (
  'c0000000-0000-0000-0000-000000000001', 
  'Optimize Supply Chain Logistics', 
  'We need a machine learning model to predict and optimize supply chain routes, reducing logistics costs by 15%.', 
  'Machine Learning / Logistics', 
  ARRAY['AI', 'ML', 'Optimization', 'Supply Chain'],
  'High',
  'OPEN'
)
ON CONFLICT DO NOTHING;
