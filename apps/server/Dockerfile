FROM node:18-bullseye-slim

# Install Python 3 for the Skill Sandbox execution engine
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY apps/server/package*.json ./apps/server/
COPY packages/ ./packages/

# Install dependencies
RUN npm ci

# Copy all source code
COPY . .

# Build the server and shared packages
RUN npm run build --workspace=packages/types || true
RUN npm run build --workspace=apps/server

# Expose port 4000
EXPOSE 4000

# Start the server using the compiled dist
WORKDIR /app/apps/server
CMD ["npm", "start"]
