---
"neumorui": patch
---

Fix browser default button background bleeding through Radix triggers.

**Affected components:** `Accordion` (trigger) and `Tabs` (trigger) were rendering with the user agent's `buttonface` color — visible as near-white pills in dark mode where the trigger text became unreadable against the trigger's own default background.

Now the triggers explicitly reset `background: transparent` so they inherit from the parent item. `Select` trigger hardened the same way for safety (explicit `--neu-bg` and `border: 0`).
