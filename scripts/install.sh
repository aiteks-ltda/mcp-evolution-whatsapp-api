#!/usr/bin/env bash
set -euo pipefail

# install.sh — installs dependencies, builds dist and prints run commands

echo "Installing dependencies..."
npm ci --silent || npm install --silent

echo "Building project with esbuild..."
npx esbuild src/main.ts --bundle --platform=node --outfile=dist/main.js --target=node18 --format=esm
chmod +x dist/main.js || true

cat <<'EOF'
Build complete.

Run locally (temporary environment variables):
EVOLUTION_API_URL=https://evo-api.decisao.ai/ EVOLUTION_API_KEY=YOUR_KEY node dist/main.js

Or create run-evo.sh with your env values and run it.
EOF
