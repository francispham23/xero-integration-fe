import { ReactElement } from "react";
import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
  within,
  RenderOptions,
} from "@testing-library/react";
import { TestWrapper } from "./TestWrapper";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: TestWrapper, ...options });

export { customRender as render, screen, fireEvent, waitFor, within };
