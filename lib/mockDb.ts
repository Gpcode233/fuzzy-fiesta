import type { PaymentLink, Transaction } from '@/types';

export const mockPaymentLinks: PaymentLink[] = [
  {
    id: 'lavender-store',
    userId: 'merchant-1',
    title: 'Lavender Perfume Store',
    description: 'Premium scents from Lagos',
    amount: 50000,
    currency: 'NGN',
    acceptedCurrencies: ['BTC', 'ETH', 'USDT', 'NGN'],
    settlementCurrency: 'NGN',
    status: 'active',
    totalReceived: 245000,
    transactionCount: 7,
    createdAt: new Date().toISOString()
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    paymentLinkId: 'lavender-store',
    payerCurrency: 'BTC',
    payerAmount: '0.0009',
    settlementCurrency: 'NGN',
    settlementAmount: '50000',
    exchangeRate: '55555555.55',
    status: 'completed',
    bushaQuoteId: 'quote_123',
    bushaTransferId: 'tr_123',
    createdAt: new Date().toISOString()
  }
];
