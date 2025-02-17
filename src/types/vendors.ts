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
