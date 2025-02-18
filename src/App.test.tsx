import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "./test/utils";
import App from "./App";
import type { AccountsResponse, VendorsResponse } from "./types";

// Mock the API functions
vi.mock("./api", () => ({
  fetchAuth: vi.fn(),
  fetchDisconnect: vi.fn(),
  fetchVendors: vi
    .fn()
    .mockResolvedValue({ vendors: [] } as unknown as VendorsResponse),
  fetchAccounts: vi
    .fn()
    .mockResolvedValue({ accounts: [] } as unknown as AccountsResponse),
}));

describe("App", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear URL parameters
    window.history.pushState({}, "", "/");
    // Clear all mocks
    vi.clearAllMocks();
  });

  it("renders SignInBox when not authenticated", () => {
    render(<App />);
    expect(screen.getByText(/sign in with xero/i)).toBeInTheDocument();
  });

  it("renders tabs and content when authenticated", () => {
    // Set auth status in URL and localStorage
    const sectionId = "test-section-id";
    window.history.pushState({}, "", `?auth=${sectionId}`);
    localStorage.setItem("section_id", sectionId);

    render(<App />);

    // Check if tabs are rendered
    expect(screen.getByRole("tab", { name: /accounts/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /vendors/i })).toBeInTheDocument();

    // Check if sign out button is rendered
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it("switches between tabs correctly", () => {
    // Set auth status
    const sectionId = "test-section-id";
    window.history.pushState({}, "", `?auth=${sectionId}`);
    localStorage.setItem("section_id", sectionId);

    render(<App />);

    // Initially Accounts tab should be active
    const accountsTab = screen.getByRole("tab", { name: /accounts/i });
    const vendorsTab = screen.getByRole("tab", { name: /vendors/i });

    expect(accountsTab).toHaveAttribute("aria-selected", "true");
    expect(vendorsTab).toHaveAttribute("aria-selected", "false");

    // Click Vendors tab
    fireEvent.click(vendorsTab);

    // Now Vendors tab should be active
    expect(accountsTab).toHaveAttribute("aria-selected", "false");
    expect(vendorsTab).toHaveAttribute("aria-selected", "true");
  });

  it("handles authentication error correctly", () => {
    // Mock console.error to prevent error message in tests
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Set error message in URL
    window.history.pushState(
      {},
      "",
      "?auth=test&message=Authentication%20failed"
    );

    render(<App />);

    // Verify error was logged
    expect(consoleError).toHaveBeenCalledWith(
      "Authentication failed:",
      "Authentication failed"
    );

    consoleError.mockRestore();
  });

  it("clears section_id on sign out", () => {
    // Set initial authenticated state
    const sectionId = "test-section-id";
    window.history.pushState({}, "", `?auth=${sectionId}`);
    localStorage.setItem("section_id", sectionId);

    render(<App />);

    // Click sign out
    const signOutButton = screen.getByText(/sign out/i);
    fireEvent.click(signOutButton);

    // Verify section_id was cleared
    expect(localStorage.getItem("section_id")).toBe("");
  });
});
