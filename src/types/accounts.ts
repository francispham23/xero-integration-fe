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
