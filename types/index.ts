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

export interface MerchantProfile {
  id: string;
  ownerName: string;
  storeName: string;
  storeCategory: string;
  settlementCurrency: string;
  logoUrl?: string;
  fixedCheckoutPath: string;
  qrCodeSeed: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

export interface ReceiptLineItem {
  inventoryItemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface PaymentReceipt {
  id: string;
  merchantId: string;
  transactionId: string;
  customerLabel: string;
  items: ReceiptLineItem[];
  subtotal: number;
  settlementCurrency: string;
  status: 'draft' | 'paid';
  createdAt: string;
  paidAt?: string;
}

export interface PaymentLinkPayload {
  title: string;
  description?: string;
  amount?: number;
  currency: string;
  acceptedCurrencies?: string[];
  settlementCurrency?: string;
  status?: PaymentLink['status'];
}

export interface Transaction {
  id: string;
  transactionId?: string;
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
