# neumorui

Neumorphic UI component library for React. 34 components, dark mode, animations, TypeScript-first.

## Install

```bash
npm install neumorui
# or
pnpm add neumorui
```

Peer deps: `react >=18`, `react-dom >=18`, `tailwindcss >=3`.

## Setup

```tsx
// app entry
import { NeuProvider } from "neumorui";
import "neumorui/styles";

export default function App() {
  return (
    <NeuProvider defaultTheme="light" defaultAccent="violet">
      <YourApp />
    </NeuProvider>
  );
}
```

## Usage

```tsx
import { Button, Input, Card, Switch } from "neumorui";

export function LoginForm() {
  return (
    <Card>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Button variant="primary">Sign In</Button>
    </Card>
  );
}
```

## Components

**Form** — Button, Input, Textarea, Switch, Checkbox, RadioGroup, Select, Slider, ToggleGroup, FileUpload
**Layout** — Card, Divider
**Data display** — Badge, Avatar, Progress, Skeleton, Spinner, DataTable
**Navigation** — Tabs, Breadcrumb, Pagination
**Overlay** — Modal, Popover, Tooltip, DropdownMenu
**Feedback** — Alert, Toast
**Disclosure** — Accordion
**Date** — Calendar, DatePicker
**Command** — Command, Combobox
**Animation** — Reveal

## Hooks

- `useNeuTheme()` — `theme`, `accent`, `toggleTheme`, `setAccent`, `isDark`, `isLight`
- `useReveal(threshold?)` — IntersectionObserver-based scroll reveal
- `useCountUp(target, duration?, trigger?)` — animated number counter
- `useRipple()` — click ripple effect

## Theming

Customize via CSS variables on `:root` or `[data-theme="dark"]`:

```css
:root {
  --neu-bg: #e8e8f0;
  --neu-accent: #7c6ff7;
  --neu-radius-md: 12px;
  /* ... */
}
```

See [`src/tokens/neu.css`](src/tokens/neu.css) for the full list.

## License

MIT
