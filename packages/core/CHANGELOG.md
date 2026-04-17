# neumorui

## 0.2.0

### Minor Changes

- a97097f: Design polish — cleaner, more authentic neumorphism.

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

### Patch Changes

- 0e0a6c5: Fix browser default button background bleeding through Radix triggers.

  **Affected components:** `Accordion` (trigger) and `Tabs` (trigger) were rendering with the user agent's `buttonface` color — visible as near-white pills in dark mode where the trigger text became unreadable against the trigger's own default background.

  Now the triggers explicitly reset `background: transparent` so they inherit from the parent item. `Select` trigger hardened the same way for safety (explicit `--neu-bg` and `border: 0`).

## 0.1.0

### Minor Changes

- d4b5cb7: Initial release of NeumorUI — a neumorphic React component library.

  **34 components** across 9 categories:
  - **Form**: Button, Input, Textarea, Switch, Checkbox, RadioGroup, Select, Slider, ToggleGroup, FileUpload
  - **Layout**: Card, Divider
  - **Data display**: Badge, Avatar, Progress, Skeleton, Spinner, DataTable
  - **Navigation**: Tabs, Breadcrumb, Pagination
  - **Overlay**: Modal, Popover, Tooltip, DropdownMenu
  - **Feedback**: Alert, Toast
  - **Disclosure**: Accordion
  - **Date**: Calendar, DatePicker
  - **Command**: Command, Combobox
  - **Animation**: Reveal

  **Features:**
  - Dark mode with smooth transitions
  - Theme tokens via CSS variables (customizable accent colors)
  - Animation utilities: `useReveal`, `useCountUp`, `useRipple`
  - TypeScript-first, fully typed
  - Built on Radix UI primitives for accessibility
  - Tailwind CSS integration
