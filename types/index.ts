export type UserType = 'developer' | 'merchant';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  settlementCurrency: string;
  bushaAccountId?: string;
  createdAt: string;
}

export interface PaymentLink {
  id: string;
  userId: string;
  title: string;
  description?: string;
  amount?: number;
  currency: string;
  acceptedCurrencies: string[];
  settlementCurrency: string;
  status: 'active' | 'paused' | 'completed';
  totalReceived: number;
  transactionCount: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  paymentLinkId: string;
  payerCurrency: string;
  payerAmount: string;
  settlementCurrency: string;
  settlementAmount: string;
  exchangeRate: string;
  status: 'pending' | 'completed' | 'failed';
  bushaQuoteId: string;
  bushaTransferId?: string;
  createdAt: string;
}

export interface BushaQuote {
  id: string;
  source_currency: string;
  target_currency: string;
  source_amount: string;
  target_amount: string;
  rate: { product: string; rate: string; side: string; type: string };
  fees: Array<{ name: string; amount: string }>;
  expires_at: string;
  status: string;
}
