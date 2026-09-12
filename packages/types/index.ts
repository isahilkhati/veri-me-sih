export enum UserRole {
  STUDENT = 'STUDENT',
  COLLEGE = 'COLLEGE',
  INDUSTRY = 'INDUSTRY',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile extends Profile {
  college_id?: string;
  degree?: string;
  graduation_year?: number;
  skills: string[];
}

export interface CollegeProfile extends Profile {
  institution_name: string;
  website?: string;
  accreditation?: string;
  location?: string;
}

export interface IndustryProfile extends Profile {
  company_name: string;
  website?: string;
  industry_type?: string;
  location?: string;
}

export enum OpportunityType {
  JOB = 'JOB',
  INTERNSHIP = 'INTERNSHIP',
  SCHOLARSHIP = 'SCHOLARSHIP',
  EVENT = 'EVENT',
  RESEARCH = 'RESEARCH' // Adding research as per PDF idea
}

export interface Opportunity {
  id: string;
  author_id: string; // ID of the College or Industry user
  title: string;
  description: string;
  type: OpportunityType;
  requirements?: string[];
  location?: string;
  is_remote: boolean;
  salary_range?: string;
  deadline?: string;
  created_at: string;
  updated_at: string;
  status: 'OPEN' | 'CLOSED' | 'DRAFT';
}

export interface ProblemStatement {
  id: string;
  industry_id: string; // Reference to industry submitting it
  title: string;
  description: string;
  domain: string;
  keywords: string[];
  expected_complexity?: string;
  status: 'OPEN' | 'MATCHING' | 'IN_PROGRESS' | 'SOLVED';
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  opportunity_id: string;
  student_id: string;
  status: 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'REJECTED';
  cover_letter?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
}
