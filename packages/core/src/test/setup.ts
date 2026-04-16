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

if (typeof globalThis.ResizeObserver === "undefined") {
  (globalThis as any).ResizeObserver = ResizeObserverPolyfill;
}
if (typeof globalThis.IntersectionObserver === "undefined") {
  (globalThis as any).IntersectionObserver = IntersectionObserverPolyfill;
}

// Radix primitives call these on HTMLElement during pointer interactions.
if (typeof Element !== "undefined") {
  if (!(Element.prototype as any).hasPointerCapture) {
    (Element.prototype as any).hasPointerCapture = () => false;
  }
  if (!(Element.prototype as any).setPointerCapture) {
    (Element.prototype as any).setPointerCapture = () => {};
  }
  if (!(Element.prototype as any).releasePointerCapture) {
    (Element.prototype as any).releasePointerCapture = () => {};
  }
  if (!(Element.prototype as any).scrollIntoView) {
    (Element.prototype as any).scrollIntoView = () => {};
  }
}
