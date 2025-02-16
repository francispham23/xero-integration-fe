export interface Address {
  AddressType: string;
}

export interface Balance {
  Outstanding: number;
  Overdue: number;
}

export interface Balances {
  AccountsReceivable: Balance;
  AccountsPayable: Balance;
}

export interface Contact {
  ContactID: string;
  ContactNumber?: string;
  ContactStatus: string;
  Name: string;
  FirstName?: string;
  LastName?: string;
  EmailAddress?: string;
  Addresses?: Address[];
  Balances?: Balances;
}

export interface VendorsResponse {
  Id: string;
  Status: string;
  ProviderName: string;
  DateTimeUTC: string;
  Contacts: Contact[];
}
