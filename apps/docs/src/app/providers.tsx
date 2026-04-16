"use client";

import { NeuProvider } from "neumorui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeuProvider defaultTheme="light" defaultAccent="violet">
      {children}
    </NeuProvider>
  );
}
