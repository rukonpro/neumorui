# Changelog — v0.3.9

## What's Changed

### Features
- feat(seo): add viewport, theme color, PWA manifest, dynamic component count, and storybook noindex

### Bug Fixes
- fix(seo): remove duplicate mobile-web-app-capable meta tag

### Other
- chore: bump version to 0.3.9
- chore(seo): update README counts, add NPM keywords, add Storybook branding
- chore: update docs version to 0.3.8
- docs: auto-generate changelog for v0.3.7 [skip ci]


---

# Changelog — v0.3.7

## What's Changed

### Features
- feat: add AlertDialog component with useAlertDialog hook
- feat: add AI Chat category — 5 new components
- feat: add JSDoc comments to all 118 component props
- feat: add forwardRef to all 20 form components
- feat: improve all components — reduced motion, changelog, className, displayName
- feat(ci): fully auto version bump + npm publish
- feat: auto-sync README component count via pre-commit hook
- feat(docs): move npm downloads to homepage stats section
- feat(docs): show total + weekly npm downloads in header
- feat(docs): show npm weekly download count in header
- feat(storybook): add missing stories for 12 components
- feat(ui): ThemeCustomizer supports fixed + inline position modes
- feat(docs): enable live playground for 92 of 106 components
- feat(docs): enable live playground for 38 components
- feat: add 8 new components — DateRangePicker, TimePicker, TableOfContents, ThemeCustomizer, MultiSelect, AvatarGroup, RichTextEditor, MarkdownEditor
- feat(docs): add global search, props playground, and copy install button
- feat(a11y): add eslint-plugin-jsx-a11y and fix 50 accessibility issues

### Bug Fixes
- fix(ui): fix modal positioning, animations, and doc playground interactivity
- fix(ci): npm publish only on tag push — no more auto bump
- fix(lint): suppress a11y lint for ChatInput autoFocus and StreamingText click
- fix(ui): replace hardcoded colors with CSS variables in 5 components
- fix(ui): add disabled visual feedback to Accordion, Select, Slider
- fix(a11y): add aria-labels to 16 buttons in 4 components
- fix: add Escape key close to 7 popup/dropdown components
- fix: docs preview showing for all components + SpeedDial improvements
- fix(docs): SpeedDial demo — center aligned, proper height
- fix(docs): fix SpeedDial empty preview — remove overflow:hidden
- fix(docs): remove browser alert() from demos — use no-op instead
- fix: correct author name — Rukon Islam → Rukon Uddin
- fix: optimize core README for npm — fix image, remove dev sections
- fix: sync core README with root README — npm was showing old 61 count
- fix: correct component count 106 → 118, bump v0.3.2
- fix(ui): ThemeCustomizer panel uses portal — popup over everything
- fix(ui): ThemeCustomizer panel inline — no more overflow clipping
- fix(ui): ThemeCustomizer panel overflow — open left instead of right
- fix(docs): show live preview below demo when playground props changed
- fix(docs): make Playground live edit actually work with real components
- fix(docs): hide v0.2.1 from version dropdown until custom domain available
- fix(docs): enable v0.2.1 version link — Vercel branch deployment live
- fix(docs): disable undeployed versions in dropdown — no more GitHub redirect
- fix(docs): update v0.2.1 URL to GitHub branch until Vercel subdomain setup
- fix(docs): merge playground + code into single section — no duplicate preview
- fix(vercel): add .next to turbo build outputs — fixes routes-manifest not found
- fix(ci): auto-publish to npm on master push when version changes
- fix(docs): make Playground actually work — live preview with prop editing

### Performance
- perf: reduce bundle size 53% by externalizing dependencies

### Other
- chore(release): auto bump version [skip ci]
- chore(release): auto bump version [skip ci]
- chore(release): auto bump version [skip ci]
- chore: add tsbuildinfo to gitignore
- docs: update README — 106 components, 352 tests, new features

