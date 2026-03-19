import type { PaymentLink, Transaction } from '@/types';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const mockPaymentLinks: PaymentLink[] = [
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

export const mockTransactions: Transaction[] = [
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
