#!/usr/bin/env bash
set -euo pipefail

# create-repo.sh
# Usage: ./scripts/create-repo.sh [owner/repo]
# If no argument is provided the script will prompt for the repository name.

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI is required. Install from https://cli.github.com/ and authenticate (gh auth login)."
  exit 1
fi

REPO=${1:-}
if [ -z "$REPO" ]; then
  read -rp "Enter new GitHub repo name (owner/repo or repo for your account): " REPO
fi

echo "Creating GitHub repository: $REPO"

# Create the repo on GitHub and push current directory
# --source=. will populate the repo with the current directory contents
gh repo create "$REPO" --public --source=. --remote=origin --push

echo "Repository created and pushed to origin/$REPO"
echo "Open it: https://github.com/$REPO"
