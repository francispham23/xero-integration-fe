export interface Account {
  AccountID: string;
  Code: string;
  Name: string;
  Status: string;
  Type: string;
  TaxType: string;
  Class: string;
  EnablePaymentsToAccount: boolean;
  ShowInExpenseClaims: boolean;
  BankAccountNumber?: string;
  BankAccountType?: string;
  CurrencyCode: string;
  ReportingCode: string;
  ReportingCodeName: string;
}

export interface AccountsResponse {
  Id: string;
  Status: string;
  ProviderName: string;
  DateTimeUTC: string;
  Accounts: Account[];
}
