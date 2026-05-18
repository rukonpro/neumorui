import "@testing-library/jest-dom/vitest";

// Polyfills for jsdom — required by Radix primitives (ResizeObserver),
// react-intersection components like Reveal (IntersectionObserver), and
// some Radix pointer/layout features.

class ResizeObserverPolyfill {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverPolyfill {
  root = null;
  rootMargin = "";
  thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

type Polyfill = typeof ResizeObserverPolyfill | typeof IntersectionObserverPolyfill;
const installGlobal = (key: "ResizeObserver" | "IntersectionObserver", impl: Polyfill) => {
  if (typeof (globalThis as Record<string, unknown>)[key] === "undefined") {
    (globalThis as Record<string, unknown>)[key] = impl;
  }
};
installGlobal("ResizeObserver", ResizeObserverPolyfill);
installGlobal("IntersectionObserver", IntersectionObserverPolyfill);

// Radix primitives call these on HTMLElement during pointer interactions.
if (typeof Element !== "undefined") {
  const proto = Element.prototype as unknown as Record<string, unknown>;
  if (!proto.hasPointerCapture) proto.hasPointerCapture = () => false;
  if (!proto.setPointerCapture) proto.setPointerCapture = () => {};
  if (!proto.releasePointerCapture) proto.releasePointerCapture = () => {};
  if (!proto.scrollIntoView) proto.scrollIntoView = () => {};
}
