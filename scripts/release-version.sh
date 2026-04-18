#!/bin/bash
# ──────────────────────────────────────────────────────────────────────
# NeumorUI Version Release Script
#
# Usage: ./scripts/release-version.sh
#
# What it does:
# 1. Reads current version from packages/core/package.json
# 2. Creates a docs branch (docs/vX.Y.Z) to preserve current docs
# 3. Pushes the branch to origin
# 4. Tells you what to update in versions.ts for the NEW version
# ──────────────────────────────────────────────────────────────────────

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./packages/core/package.json').version")
BRANCH_NAME="docs/v${CURRENT_VERSION}"

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   NeumorUI Version Release               ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "Current version: ${GREEN}v${CURRENT_VERSION}${NC}"
echo -e "Branch to create: ${YELLOW}${BRANCH_NAME}${NC}"
echo ""

# Check if branch already exists
if git rev-parse --verify "$BRANCH_NAME" >/dev/null 2>&1; then
  echo -e "${RED}Error: Branch '${BRANCH_NAME}' already exists!${NC}"
  echo "This version has already been snapshotted."
  exit 1
fi

# Check for uncommitted changes
if ! git diff --quiet HEAD 2>/dev/null; then
  echo -e "${RED}Error: You have uncommitted changes. Commit or stash them first.${NC}"
  exit 1
fi

# Confirm
echo -e "${YELLOW}This will:${NC}"
echo "  1. Create branch '${BRANCH_NAME}' from current HEAD"
echo "  2. Push it to origin"
echo "  3. The current docs will be preserved at this branch"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 0
fi

# Create and push the version branch
echo ""
echo -e "${BLUE}Creating branch ${BRANCH_NAME}...${NC}"
git branch "$BRANCH_NAME"
git push origin "$BRANCH_NAME"

echo ""
echo -e "${GREEN}✓ Branch '${BRANCH_NAME}' created and pushed!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo ""
echo "  1. Bump version in packages/core/package.json"
echo "  2. Update apps/docs/src/data/versions.ts:"
echo ""
echo -e "     Add the NEW version on top and update the old one:"
echo ""
echo -e "     ${GREEN}// versions.ts${NC}"
echo -e "     ${GREEN}export const versions: VersionEntry[] = [${NC}"
echo -e "     ${GREEN}  {${NC}"
echo -e "     ${GREEN}    version: \"NEW_VERSION\",${NC}"
echo -e "     ${GREEN}    label: \"vNEW_VERSION\",${NC}"
echo -e "     ${GREEN}    branch: \"master\",${NC}"
echo -e "     ${GREEN}    url: \"https://neumorui.vercel.app\",${NC}"
echo -e "     ${GREEN}    latest: true,${NC}"
echo -e "     ${GREEN}  },${NC}"
echo -e "     ${GREEN}  {${NC}"
echo -e "     ${GREEN}    version: \"${CURRENT_VERSION}\",${NC}"
echo -e "     ${GREEN}    label: \"v${CURRENT_VERSION}\",${NC}"
echo -e "     ${GREEN}    branch: \"${BRANCH_NAME}\",${NC}"
echo -e "     ${GREEN}    url: \"https://${BRANCH_NAME//\//-}.neumorui.vercel.app\",${NC}"
echo -e "     ${GREEN}  },${NC}"
echo -e "     ${GREEN}];${NC}"
echo ""
echo "  3. Commit and push to master"
echo "  4. Deploy the version branch on Vercel with the subdomain"
echo ""
echo -e "${GREEN}Done! 🎉${NC}"
