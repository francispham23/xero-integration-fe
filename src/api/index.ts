import { AccountsResponse, VendorsResponse } from "../types";

export const fetchAuth = async () => {
  const response = await fetch("api/xero/auth/authorize", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch auth");
  }
  return response.json();
};

export const fetchDisconnect = async () => {
  try {
    const response = await fetch("api/xero/auth/disconnect", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Error during sign out:", error);
  }
};

export const fetchVendors = async (): Promise<VendorsResponse> => {
  const response = await fetch("api/xero/local/vendors", {
    credentials: "include",
  });
  if (!response.ok) {
    localStorage.setItem("section_id", "");
    throw new Error("Failed to fetch vendors");
  }
  return response.json();
};

export const fetchAccounts = async (): Promise<AccountsResponse> => {
  const response = await fetch("api/xero/local/accounts", {
    credentials: "include",
  });
  if (!response.ok) {
    localStorage.setItem("section_id", "");
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
};
