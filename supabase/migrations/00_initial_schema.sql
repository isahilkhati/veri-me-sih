-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for User Roles
CREATE TYPE user_role AS ENUM ('STUDENT', 'COLLEGE', 'INDUSTRY', 'ADMIN');

-- Profiles Table (Extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Student Profiles
CREATE TABLE student_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    college_id UUID, -- Reference to college
    degree TEXT,
    graduation_year INT,
    skills TEXT[] DEFAULT '{}',
    resume_url TEXT
);

-- College Profiles
CREATE TABLE college_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    institution_name TEXT NOT NULL,
    website TEXT,
    accreditation TEXT,
    location TEXT,
    is_verified BOOLEAN DEFAULT FALSE
);

-- Industry Profiles
CREATE TABLE industry_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    website TEXT,
    industry_type TEXT,
    location TEXT,
    is_verified BOOLEAN DEFAULT FALSE
);

-- Opportunities (Jobs, Internships, etc.)
CREATE TYPE opportunity_type AS ENUM ('JOB', 'INTERNSHIP', 'SCHOLARSHIP', 'EVENT', 'RESEARCH');
CREATE TYPE opportunity_status AS ENUM ('OPEN', 'CLOSED', 'DRAFT');

CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type opportunity_type NOT NULL,
    requirements TEXT[] DEFAULT '{}',
    location TEXT,
    is_remote BOOLEAN DEFAULT FALSE,
    salary_range TEXT,
    deadline TIMESTAMP WITH TIME ZONE,
    status opportunity_status DEFAULT 'OPEN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Problem Statements (Specifically requested for Collaborative Research)
CREATE TYPE problem_status AS ENUM ('OPEN', 'MATCHING', 'IN_PROGRESS', 'SOLVED');

CREATE TABLE problem_statements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    industry_id UUID NOT NULL REFERENCES industry_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    domain TEXT NOT NULL,
    keywords TEXT[] DEFAULT '{}',
    expected_complexity TEXT,
    status problem_status DEFAULT 'OPEN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Applications
CREATE TYPE application_status AS ENUM ('PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED');

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES problem_statements(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    status application_status DEFAULT 'PENDING',
    cover_letter TEXT,
    resume_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT application_target_check CHECK (
        (opportunity_id IS NOT NULL AND problem_id IS NULL) OR 
        (opportunity_id IS NULL AND problem_id IS NOT NULL)
    )
);

-- AI Conversations
CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE college_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to opportunities and problem statements
CREATE POLICY "Public read opportunities" ON opportunities FOR SELECT USING (true);
CREATE POLICY "Public read problem_statements" ON problem_statements FOR SELECT USING (true);

-- Users can read all profiles (basic info)
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);

-- Users can edit their own profiles
CREATE POLICY "Users can edit own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
