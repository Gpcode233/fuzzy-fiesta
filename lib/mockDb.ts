import type { InventoryItem, MerchantProfile, PaymentLink, PaymentReceipt, Transaction } from '@/types';

declare global {
  var __fluxMockDb:
    | {
        merchantProfile: MerchantProfile;
        inventory: InventoryItem[];
        receipts: PaymentReceipt[];
        paymentLinks: PaymentLink[];
        transactions: Transaction[];
      }
    | undefined;
}

const merchantProfile: MerchantProfile = {
  id: 'john-matt-store',
  ownerName: 'John Matt',
  storeName: 'Little Sprout',
  storeCategory: 'Baby essentials',
  settlementCurrency: 'NGN',
  logoUrl: '/logo-mark.svg',
  fixedCheckoutPath: '/pay/john-matt-store',
  qrCodeSeed: 'flux-john-matt-store',
  createdAt: new Date().toISOString()
};

const inventory: InventoryItem[] = [
  { id: 'itm-flask', name: 'ThermoCool Flask', category: 'Feeding', price: 7000, stock: 14, sku: 'LS-FLASK-01' },
  { id: 'itm-feeder', name: 'Baby Feeder Set', category: 'Feeding', price: 4500, stock: 22, sku: 'LS-FEED-02' },
  { id: 'itm-bath', name: 'Soft Bath Towel', category: 'Bath', price: 6000, stock: 11, sku: 'LS-BATH-03' },
  { id: 'itm-onesie', name: 'Cotton Onesie', category: 'Clothing', price: 8500, stock: 19, sku: 'LS-CLOT-04' },
  { id: 'itm-toy', name: 'Sensory Toy Set', category: 'Play', price: 9500, stock: 9, sku: 'LS-PLAY-05' },
  { id: 'itm-bottle', name: 'Water Bottle Pack', category: 'Hydration', price: 5000, stock: 16, sku: 'LS-HYDR-06' }
];

const receipts: PaymentReceipt[] = [
  {
    id: 'receipt-001',
    merchantId: merchantProfile.id,
    transactionId: '482917',
    customerLabel: 'Walk-in customer',
    items: [
      { inventoryItemId: 'itm-flask', name: 'ThermoCool Flask', unitPrice: 7000, quantity: 1, total: 7000 },
      { inventoryItemId: 'itm-feeder', name: 'Baby Feeder Set', unitPrice: 4500, quantity: 2, total: 9000 }
    ],
    subtotal: 16000,
    settlementCurrency: 'NGN',
    status: 'paid',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    paidAt: new Date(Date.now() - 1000 * 60 * 78).toISOString()
  },
  {
    id: 'receipt-002',
    merchantId: merchantProfile.id,
    transactionId: '482931',
    customerLabel: 'Walk-in customer',
    items: [
      { inventoryItemId: 'itm-onesie', name: 'Cotton Onesie', unitPrice: 8500, quantity: 1, total: 8500 },
      { inventoryItemId: 'itm-bath', name: 'Soft Bath Towel', unitPrice: 6000, quantity: 1, total: 6000 }
    ],
    subtotal: 14500,
    settlementCurrency: 'NGN',
    status: 'draft',
    createdAt: new Date(Date.now() - 1000 * 60 * 22).toISOString()
  }
];

const paymentLinks: PaymentLink[] = [
  {
    id: merchantProfile.id,
    userId: 'merchant-1',
    title: merchantProfile.storeName,
    description: `${merchantProfile.storeCategory} checkout`,
    amount: 16000,
    currency: merchantProfile.settlementCurrency,
    acceptedCurrencies: ['BTC', 'ETH', 'USDT', 'NGN', 'KES'],
    settlementCurrency: merchantProfile.settlementCurrency,
    status: 'active',
    totalReceived: 245000,
    transactionCount: 7,
    createdAt: new Date().toISOString()
  }
];

const transactions: Transaction[] = [
  {
    id: 'txn-1',
    transactionId: '482917',
    paymentLinkId: merchantProfile.id,
    payerCurrency: 'USDT',
    payerAmount: '10.00',
    settlementCurrency: 'NGN',
    settlementAmount: '16000',
    exchangeRate: '1600.00',
    status: 'completed',
    bushaQuoteId: 'quote_123',
    bushaTransferId: 'tr_123',
    createdAt: new Date(Date.now() - 1000 * 60 * 78).toISOString()
  },
  {
    id: 'txn-2',
    transactionId: '482931',
    paymentLinkId: merchantProfile.id,
    payerCurrency: 'KES',
    payerAmount: '0',
    settlementCurrency: 'NGN',
    settlementAmount: '14500',
    exchangeRate: '12.35',
    status: 'pending',
    bushaQuoteId: 'quote_124',
    createdAt: new Date(Date.now() - 1000 * 60 * 22).toISOString()
  }
];

const mockDb = globalThis.__fluxMockDb ?? {
  merchantProfile,
  inventory,
  receipts,
  paymentLinks,
  transactions
};

globalThis.__fluxMockDb = mockDb;

export const mockMerchantProfile = mockDb.merchantProfile;
export const mockInventory = mockDb.inventory;
export const mockReceipts = mockDb.receipts;
export const mockPaymentLinks = mockDb.paymentLinks;
export const mockTransactions = mockDb.transactions;

export const getReceiptByTransactionId = (transactionId: string) =>
  mockReceipts.find((receipt) => receipt.transactionId.toLowerCase() === transactionId.trim().toLowerCase()) ?? null;
