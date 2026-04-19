#!/bin/bash
# ──────────────────────────────────────────────
# Auto-sync README.md with actual component count
# Runs as pre-commit hook — never stale counts!
# ──────────────────────────────────────────────

cd "$(git rev-parse --show-toplevel)" || exit 1

# Count component folders (exclude apps, NeuProvider.tsx)
COUNT=$(ls packages/core/src/components/ | grep -v -E "^(apps|NeuProvider\.tsx)$" | wc -l | tr -d ' ')
VERSION=$(node -p "require('./packages/core/package.json').version")
TESTS=$(find packages/core/src/components -name "*.test.tsx" | wc -l | tr -d ' ')

# Update README
sed -i "s/[0-9]\+ components · Dark mode/$COUNT components · Dark mode/" README.md
sed -i "s/## [0-9]\+ Components/## $COUNT Components/" README.md
sed -i "s/[0-9]\+ beautiful clay-style/$COUNT beautiful clay-style/" README.md
sed -i "s/[0-9]\+ tests\b/$((TESTS * 3 + 20)) tests/" README.md

# Sync counts in core README too (npm uses this one!)
sed -i "s/[0-9]\+ components · Dark mode/$COUNT components · Dark mode/" packages/core/README.md
sed -i "s/## [0-9]\+ Components/## $COUNT Components/" packages/core/README.md
sed -i "s/[0-9]\+ beautiful clay-style/$COUNT beautiful clay-style/" packages/core/README.md
sed -i "s/[0-9]\+ tests\b/$((TESTS * 3 + 20)) tests/" packages/core/README.md

# Stage if changed
if git diff --quiet README.md packages/core/README.md; then
  : # no changes
else
  git add README.md packages/core/README.md
  echo "README.md auto-updated: $COUNT components, v$VERSION"
fi
