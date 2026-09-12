# AI-Powered Industry Problem Resolution and Collaborative Research Platform (IPRCRP)

A production-ready platform connecting Students, Colleges, and Industry with AI-powered features.

## Architecture
- **Frontend**: Next.js 15, App Router, React, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript, REST API
- **Database**: Supabase PostgreSQL, Row Level Security (RLS)
- **AI**: Google Gemini API integration

## Structure
- \`apps/web\`: Next.js frontend
- \`apps/server\`: Express backend
- \`packages/*\`: Shared types and configs
- \`supabase/\`: Database schemas and migrations

## Setup Instructions

### 1. Supabase Setup
1. Create a new Supabase project.
2. Go to the SQL Editor and run the script located at \`supabase/migrations/00_initial_schema.sql\`.
3. Get your \`Project URL\`, \`anon public key\`, and \`service_role secret\`.

### 2. Environment Variables
Create a \`.env\` file in \`apps/server\`:
\`\`\`env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
PORT=4000
FRONTEND_URL=http://localhost:3000
\`\`\`

Create a \`.env.local\` file in \`apps/web\`:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:4000/api
\`\`\`

### 3. Local Development
Install dependencies from the root directory:
\`\`\`bash
npm install
\`\`\`

Start the development servers concurrently:
\`\`\`bash
npm run dev
\`\`\`
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

### 4. Admin Demo Account
To create an admin securely without exposing credentials:
1. Register a standard user via the frontend signup.
2. Access the Supabase dashboard -> \`Table Editor\` -> \`profiles\`.
3. Locate your user record and update the \`role\` column to \`ADMIN\`.

## Security Notes
- Row Level Security (RLS) enforces authorization at the database level.
- Ensure \`service_role\` keys are never committed to frontend code.
- Always use the backend \`/api/ai/*\` routes to securely interact with the Gemini API to prevent API key exposure.
