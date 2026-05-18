import type { Metadata } from "next";
import { GuideCodeBlock } from "@/components/GuideCodeBlock";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neumorui.vercel.app";

export const metadata: Metadata = {
  title: "Theming — NeumorUI",
  description: "Customize NeumorUI colors, radius, and fonts via NeuProvider theme prop, CSS variables, and light/dark mode.",
  alternates: { canonical: `${SITE_URL}/docs/theming` },
  openGraph: {
    title: "Theming — NeumorUI",
    description: "Theme override API, CSS variables, dark mode, animation control.",
    url: `${SITE_URL}/docs/theming`,
    type: "article",
  },
};

const sectionTitle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  color: "var(--neu-text-primary)",
  margin: "32px 0 12px",
  letterSpacing: "-0.01em",
};
const paragraph: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.7,
  color: "var(--neu-text-secondary)",
  margin: "0 0 12px",
};
const inlineCode: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
  fontSize: "13px",
  padding: "2px 6px",
  borderRadius: "6px",
  background: "var(--neu-bg)",
  boxShadow: "var(--neu-shadow-inset-sm)",
  color: "var(--neu-accent)",
};

export default function ThemingPage() {
  return (
    <article>
      <header style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 900,
            color: "var(--neu-text-primary)",
            letterSpacing: "-0.02em",
            margin: "0 0 8px",
          }}
        >
          Theming
        </h1>
        <p style={{ ...paragraph, fontSize: "15px", margin: 0 }}>
          Customize colors, radius, and fonts without forking. Available since v0.6.0.
        </p>
      </header>

      <h2 style={sectionTitle}>Built-in: light + dark</h2>
      <p style={paragraph}>
        Two themes ship out of the box. Toggle via the <code style={inlineCode}>useNeuTheme</code> hook,
        or follow the user&apos;s OS preference:
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`<NeuProvider defaultTheme="dark" followSystemTheme>
  <App />
</NeuProvider>`}
      />
      <GuideCodeBlock
        language="tsx"
        code={`import { useNeuTheme } from "neumorui";

function ThemeToggle() {
  const { theme, toggleTheme } = useNeuTheme();
  return <button onClick={toggleTheme}>{theme === "dark" ? "🌙" : "☀️"}</button>;
}`}
      />

      <h2 style={sectionTitle}>Theme override prop (typed)</h2>
      <p style={paragraph}>
        Pass a <code style={inlineCode}>theme</code> object to override colors, radius, or font globally.
        Every component that uses the affected CSS variables updates automatically.
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`<NeuProvider
  theme={{
    accent: "#ff6b6b",
    danger: "#e74c3c",
    success: "#27ae60",
    radius: { sm: "8px", md: "16px", lg: "24px" },
    fontFamily: '"Inter", system-ui, sans-serif',
  }}
>
  <App />
</NeuProvider>`}
      />

      <h2 style={sectionTitle}>ThemeOverride shape</h2>
      <p style={paragraph}>
        All fields are optional. Import the type for editor autocomplete:
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`import type { ThemeOverride } from "neumorui";

const myTheme: ThemeOverride = {
  // Colors
  accent: "#6c7ef8",
  accentLight: "#8490fa",
  accentDark: "#5a6cf5",
  danger: "#f87c6c",
  success: "#5ecba1",
  warning: "#f9c74f",
  info: "#5b9ee0",
  bg: "#f0f4ff",
  textPrimary: "#2a2d4a",
  textSecondary: "#7880a8",
  textMuted: "#b0b8d8",
  border: "rgba(176,184,216,0.25)",

  // Radius scale
  radius: { sm: "10px", md: "14px", lg: "18px", xl: "24px" },

  // Font
  fontFamily: 'system-ui, sans-serif',
};`}
      />

      <h2 style={sectionTitle}>CSS variables (escape hatch)</h2>
      <p style={paragraph}>
        For variables not in the typed shape (e.g. shadow definitions, glow colors),
        use <code style={inlineCode}>cssVars</code> to set them directly:
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`<NeuProvider
  cssVars={{
    "--neu-shadow-raised": "10px 10px 24px rgba(0,0,0,.15), -8px -8px 20px rgba(255,255,255,.9)",
    "--neu-accent-glow": "rgba(255, 107, 107, 0.5)",
  }}
>
  <App />
</NeuProvider>`}
      />

      <h2 style={sectionTitle}>All available CSS variables</h2>
      <p style={paragraph}>
        Set any of these directly via <code style={inlineCode}>cssVars</code>, or override
        in your own stylesheet:
      </p>
      <GuideCodeBlock
        language="css"
        code={`/* Surfaces */
--neu-bg
--neu-bg-light
--neu-bg-dark

/* Shadows */
--neu-shadow-raised
--neu-shadow-raised-sm
--neu-shadow-raised-lg
--neu-shadow-inset
--neu-shadow-inset-sm
--neu-shadow-dark    /* shadow tone */
--neu-shadow-light   /* highlight tone */

/* Colors */
--neu-accent, --neu-accent-light, --neu-accent-dark, --neu-accent-glow
--neu-success, --neu-success-light, --neu-success-dark, --neu-success-glow
--neu-danger,  --neu-danger-light,  --neu-danger-dark,  --neu-danger-glow
--neu-warning, --neu-warning-light, --neu-warning-dark, --neu-warning-glow
--neu-info,    --neu-info-light,    --neu-info-dark,    --neu-info-glow

/* Text */
--neu-text-primary
--neu-text-secondary
--neu-text-muted

/* Tints (alerts, badges) */
--neu-tint-primary, --neu-tint-primary-text, --neu-tint-primary-border
--neu-tint-success, --neu-tint-success-text, --neu-tint-success-border
--neu-tint-danger,  --neu-tint-danger-text,  --neu-tint-danger-border
--neu-tint-warning, --neu-tint-warning-text, --neu-tint-warning-border

/* Radius */
--neu-radius-sm, --neu-radius-md, --neu-radius-lg, --neu-radius-xl, --neu-radius-full

/* Misc */
--neu-border
--neu-font-family
--neu-transition`}
      />

      <h2 style={sectionTitle}>Animation control</h2>
      <p style={paragraph}>
        Disable or reduce motion globally without waiting for user OS settings:
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`<NeuProvider defaultAnimation="reduced">  {/* short transitions, no fancy easing */}
<NeuProvider defaultAnimation="none">     {/* kill all motion entirely */}
<NeuProvider defaultAnimation="full">     {/* default — respects user OS prefers-reduced-motion */}`}
      />
      <p style={paragraph}>
        Change at runtime via context:
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`const { animation, setAnimation } = useNeuTheme();
<button onClick={() => setAnimation("none")}>Disable motion</button>`}
      />

      <h2 style={sectionTitle}>Quick accent presets</h2>
      <p style={paragraph}>
        For common accent colors, use the <code style={inlineCode}>defaultAccent</code> shortcut:
      </p>
      <GuideCodeBlock
        language="tsx"
        code={`<NeuProvider defaultAccent="violet">  {/* default */}
<NeuProvider defaultAccent="blue">
<NeuProvider defaultAccent="teal">
<NeuProvider defaultAccent="rose">
<NeuProvider defaultAccent="amber">`}
      />
      <p style={paragraph}>
        For full control, use <code style={inlineCode}>theme.accent</code> with any hex/HSL value.
      </p>
    </article>
  );
}
