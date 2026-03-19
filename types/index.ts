export type UserType = 'developer' | 'merchant';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  settlementCurrency: string;
  createdAt: string;
}

export type PaymentLinkStatus = 'active' | 'paused' | 'archived';

export interface PaymentLink {
  id: string;
  userId: string;
  name: string;
  title: string;
  description?: string;
  isFixed: boolean;
  quoteAmount?: string;
  quoteCurrency: string;
  settlementCurrency: string;
  allowCustomerAmount: boolean;
  status: PaymentLinkStatus;
  link: string;
  pubKey: string;
  totalReceived: number;
  transactionCount: number;
  createdAt: string;
}

export interface PaymentLinkPayload {
  fixed: boolean;
  one_time: boolean;
  name: string;
  title: string;
  description?: string;
  target_currency: string;
  quote_amount?: string;
  quote_currency: string;
  allow_customer_amount: boolean;
  require_extra_info: Array<{ field_name: string; required: boolean }>;
}

export interface Transaction {
  id: string;
  paymentLinkId: string;
  payerCurrency: string;
  payerAmount: string;
  settlementCurrency: string;
  settlementAmount: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface BushaQuote {
  id: string;
  source_currency: string;
  target_currency: string;
  source_amount: string;
  target_amount: string;
  expires_at: string;
  status: string;
}
