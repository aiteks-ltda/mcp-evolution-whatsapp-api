FROM node:20-bullseye AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production=false --silent || npm install --silent

# Copy source
COPY . .

# Build the TypeScript project into dist
RUN npx esbuild src/main.ts --bundle --platform=node --outfile=dist/main.js --target=node18 --format=esm && chmod +x dist/main.js

FROM node:20-bullseye-slim

WORKDIR /app

# Copy built files and production deps
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --production --silent || npm install --production --silent

EXPOSE 3000

# Start with node (script expects to run as a stdio MCP server)
CMD ["node", "dist/main.js"]
