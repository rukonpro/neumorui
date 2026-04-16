"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Progress,
  Slider,
  Switch,
  Tabs,
  Tooltip,
  useNeuTheme,
} from "neumorui";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <Hero />
      <Showcase />
      <InstallBlock />
    </main>
  );
}

function Hero() {
  const { theme, toggleTheme } = useNeuTheme();

  return (
    <section className="mb-16 flex flex-col items-start gap-6">
      <Badge variant="primary" dot>
        v0.0.1 · beta
      </Badge>
      <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
        NeumorUI
      </h1>
      <p
        className="max-w-2xl text-lg"
        style={{ color: "var(--neu-text-secondary)" }}
      >
        Neumorphic React components with soft shadows, dark mode, and Radix
        primitives. 34 components, TypeScript-first, Tailwind-powered.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" size="lg">
          Get started
        </Button>
        <Button variant="raised" size="lg" onClick={toggleTheme}>
          Toggle {theme === "light" ? "dark" : "light"} mode
        </Button>
      </div>
    </section>
  );
}

function Showcase() {
  const [volume, setVolume] = useState([60]);
  const [notify, setNotify] = useState(true);
  const [agree, setAgree] = useState(false);

  return (
    <section className="mb-16">
      <h2 className="mb-6 text-2xl font-semibold">Component preview</h2>
      <Tabs
        tabs={[
          {
            value: "form",
            label: "Form",
            content: (
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <div className="flex flex-col gap-4">
                    <Input label="Email" placeholder="you@example.com" />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                    />
                    <Checkbox
                      label="I agree to the terms"
                      checked={agree}
                      onCheckedChange={(v) => setAgree(v === true)}
                    />
                    <Button variant="primary">Sign in</Button>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col gap-6">
                    <Switch
                      label="Notifications"
                      description="Receive updates on new releases"
                      checked={notify}
                      onCheckedChange={setNotify}
                    />
                    <Slider
                      label="Volume"
                      value={volume}
                      onValueChange={setVolume}
                    />
                    <Progress value={volume[0]} showLabel />
                  </div>
                </Card>
              </div>
            ),
          },
          {
            value: "display",
            label: "Display",
            content: (
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar initials="RK" size="lg" status="online" />
                      <div>
                        <p className="font-semibold">Rukon</p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--neu-text-secondary)" }}
                        >
                          Online
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="danger">Danger</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="info">Info</Badge>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col gap-3">
                    <Alert variant="info" title="Heads up">
                      This library is in beta — API may change.
                    </Alert>
                    <Tooltip content="Soft shadows everywhere">
                      <Button variant="raised">Hover me</Button>
                    </Tooltip>
                  </div>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </section>
  );
}

function InstallBlock() {
  return (
    <section className="mb-16">
      <h2 className="mb-4 text-2xl font-semibold">Install</h2>
      <Card variant="inset">
        <pre className="overflow-x-auto font-mono text-sm">
          <code>
            {`pnpm add neumorui

// app entry
import { NeuProvider } from "neumorui";
import "neumorui/styles";

<NeuProvider>
  <App />
</NeuProvider>`}
          </code>
        </pre>
      </Card>
    </section>
  );
}
