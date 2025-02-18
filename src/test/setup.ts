import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

declare module "vitest" {
  interface Assertion {
    toBeInTheDocument(): void;
    toHaveTextContent(text: string | RegExp): void;
    toHaveAttribute(attr: string, value?: string): void;
  }
}

// Runs a cleanup after each test case
afterEach(() => {
  cleanup();
});
