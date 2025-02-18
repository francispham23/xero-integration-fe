export interface Account {
  id: string;
  code: string;
  name: string;
  description: string;
  status: string;
  type: string;
  taxType: string;
  class: string;
  enablePaymentsToAccount: boolean;
  showInExpenseClaims: boolean;
  bankAccountNumber?: string;
  bankAccountType?: string;
  currencyCode: string;
  reportingCode: string;
  reportingCodeName: string;
}

export interface AccountsResponse {
  id: string;
  status: string;
  providerName: string;
  dateTimeUTC: string;
  accounts: Account[];
}

export interface Address {
  addressType: string;
}

export interface Balance {
  outstanding: number;
  overdue: number;
}

export interface Balances {
  accountsReceivable: Balance;
  accountsPayable: Balance;
}

export interface Vendor {
  id: string;
  contactNumber?: string;
  status: string;
  name: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  addresses?: Address[];
  balances?: Balances;
}

export interface VendorsResponse {
  id: string;
  status: string;
  providerName: string;
  dateTimeUTC: string;
  vendors: Vendor[];
}
