FROM node:18-bullseye-slim

# Install Python 3 for the Skill Sandbox execution engine
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY apps/server/package*.json ./apps/server/
COPY packages/ ./packages/

# Install dependencies (only for server)
RUN npm ci --workspace=apps/server

# Copy server source code
COPY apps/server/ ./apps/server/

# Expose port 4000
EXPOSE 4000

# Start the server (ensure it runs using ts-node or compiled dist)
WORKDIR /app/apps/server
CMD ["npm", "run", "dev"]
