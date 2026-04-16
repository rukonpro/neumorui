---
"neumorui": minor
---

Design polish — cleaner, more authentic neumorphism.

**Dark mode shadows:**

- Deeper `--neu-shadow-dark` (pure black with 55% alpha) for real depth
- Brighter `--neu-shadow-light` (blue-tinted) for a proper lifted edge
- Larger shadow offsets and blur radii so raised/inset surfaces read clearly on dark backgrounds
- Slightly warmer `--neu-bg` (#1a1e33) for better shadow contrast

**Removed 1px borders on:**

- `Badge` — colored variants (primary, success, danger, warning, info) now use pure tinted backgrounds
- `Card` — `flat` variant no longer has a border (use `raised` or `inset` for visible surface)
- `Button` — `flat` variant no longer has a border

Intentional boundary borders (Divider, DataTable rows, Command/Combobox section separators, FileUpload dropzone) are preserved.
