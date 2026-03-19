import type { PaymentLink, PaymentLinkPayload, Transaction } from '@/types';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

const initialPaymentLinks: PaymentLink[] = [
  {
    id: 'lavender-no5',
    userId: 'merchant-1',
    name: 'Lavender Perfume Store',
    title: 'Buy Lavender No.5',
    description: 'Premium perfume, 50ml',
    isFixed: true,
    quoteAmount: '25000',
    quoteCurrency: 'NGN',
    settlementCurrency: 'NGN',
    allowCustomerAmount: false,
    status: 'active',
    link: `${APP_URL}/pay/lavender-no5`,
    pubKey: 'pk_test_lavender_no5',
    totalReceived: 245000,
    transactionCount: 7,
    createdAt: new Date().toISOString()
  }
];

const initialTransactions: Transaction[] = [
  {
    id: 'txn-1001',
    paymentLinkId: 'lavender-no5',
    payerCurrency: 'BTC',
    payerAmount: '0.0008',
    settlementCurrency: 'NGN',
    settlementAmount: '25000',
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'txn-1002',
    paymentLinkId: 'lavender-no5',
    payerCurrency: 'NGN',
    payerAmount: '25000',
    settlementCurrency: 'NGN',
    settlementAmount: '25000',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

const mockState = {
  paymentLinks: structuredClone(initialPaymentLinks),
  transactions: structuredClone(initialTransactions)
};

export function getMockPaymentLinks(): PaymentLink[] {
  return structuredClone(mockState.paymentLinks);
}

export function getMockTransactions(): Transaction[] {
  return structuredClone(mockState.transactions);
}

export function findMockPaymentLink(id: string): PaymentLink | null {
  const link = mockState.paymentLinks.find((item) => item.id === id);
  return link ? structuredClone(link) : null;
}

export function insertMockPaymentLink(payload: PaymentLinkPayload): PaymentLink {
  const id = `pl_${Math.random().toString(36).slice(2, 10)}`;
  const link: PaymentLink = {
    id,
    userId: 'merchant-1',
    name: payload.name,
    title: payload.title,
    description: payload.description,
    isFixed: payload.fixed,
    quoteAmount: payload.quote_amount,
    quoteCurrency: payload.quote_currency,
    settlementCurrency: payload.target_currency,
    allowCustomerAmount: payload.allow_customer_amount,
    status: 'active',
    link: `${APP_URL}/pay/${id}`,
    pubKey: `pk_test_${id}`,
    totalReceived: 0,
    transactionCount: 0,
    createdAt: new Date().toISOString()
  };

  mockState.paymentLinks.unshift(link);
  return structuredClone(link);
}

export function updateMockPaymentLink(id: string, payload: Partial<PaymentLinkPayload>): PaymentLink | null {
  const link = mockState.paymentLinks.find((item) => item.id === id);
  if (!link) return null;

  if (payload.title) link.title = payload.title;
  if (payload.description !== undefined) link.description = payload.description;
  if (payload.target_currency) link.settlementCurrency = payload.target_currency;
  if (payload.quote_amount !== undefined) link.quoteAmount = payload.quote_amount;
  if (payload.quote_currency) link.quoteCurrency = payload.quote_currency;
  if (payload.fixed !== undefined) link.isFixed = payload.fixed;
  if (payload.allow_customer_amount !== undefined) link.allowCustomerAmount = payload.allow_customer_amount;

  return structuredClone(link);
}

export function removeMockPaymentLink(id: string): boolean {
  const index = mockState.paymentLinks.findIndex((item) => item.id === id);
  if (index < 0) return false;
  mockState.paymentLinks.splice(index, 1);
  return true;
}
