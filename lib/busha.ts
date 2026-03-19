import { mockPaymentLinks } from '@/lib/mockDb';
import type { PaymentLink, PaymentLinkPayload } from '@/types';

const BUSHA_BASE_URL = process.env.BUSHA_BASE_URL ?? 'https://api.sandbox.busha.so';
const BUSHA_SECRET_KEY = process.env.BUSHA_SECRET_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

const authHeaders = {
  Authorization: `Bearer ${BUSHA_SECRET_KEY}`,
  'Content-Type': 'application/json'
};

function toAppPaymentLink(raw: Record<string, unknown>): PaymentLink {
  const id = String(raw.id ?? `pl_${Date.now()}`);
  const quoteAmount = raw.quote_amount ? String(raw.quote_amount) : undefined;
  const quoteCurrency = String(raw.quote_currency ?? raw.target_currency ?? 'NGN');

  return {
    id,
    userId: 'merchant-1',
    name: String(raw.name ?? 'AnyPay Store'),
    title: String(raw.title ?? raw.name ?? 'Payment'),
    description: raw.description ? String(raw.description) : undefined,
    isFixed: Boolean(raw.fixed ?? quoteAmount),
    quoteAmount,
    quoteCurrency,
    settlementCurrency: String(raw.target_currency ?? quoteCurrency),
    allowCustomerAmount: Boolean(raw.allow_customer_amount),
    status: (raw.status as PaymentLink['status']) ?? 'active',
    link: String(raw.link ?? `${APP_URL}/pay/${id}`),
    pubKey: String(raw.pub_key ?? `pk_test_${id}`),
    totalReceived: Number(raw.total_received ?? 0),
    transactionCount: Number(raw.transaction_count ?? 0),
    createdAt: String(raw.created_at ?? new Date().toISOString())
  };
}

function createMockPaymentLink(payload: PaymentLinkPayload): PaymentLink {
  const id = `pl_${Math.random().toString(36).slice(2, 10)}`;
  const link = {
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
    status: 'active' as const,
    link: `${APP_URL}/pay/${id}`,
    pubKey: `pk_test_${id}`,
    totalReceived: 0,
    transactionCount: 0,
    createdAt: new Date().toISOString()
  };

  mockPaymentLinks.unshift(link);
  return link;
}

export async function createPaymentLink(payload: PaymentLinkPayload): Promise<PaymentLink> {
  if (!BUSHA_SECRET_KEY) {
    return createMockPaymentLink(payload);
  }

  const response = await fetch(`${BUSHA_BASE_URL}/v1/payments/links`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Failed to create payment link (${response.status})`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  return toAppPaymentLink(data);
}

export async function listPaymentLinks(): Promise<PaymentLink[]> {
  if (!BUSHA_SECRET_KEY) return mockPaymentLinks;

  const response = await fetch(`${BUSHA_BASE_URL}/v1/payments/links`, {
    headers: { Authorization: `Bearer ${BUSHA_SECRET_KEY}` },
    cache: 'no-store'
  });

  if (!response.ok) throw new Error(`Failed to list payment links (${response.status})`);
  const data = (await response.json()) as { data?: Record<string, unknown>[] };
  const rows = data.data ?? [];
  return rows.map((row) => toAppPaymentLink(row));
}

export async function getPaymentLink(id: string): Promise<PaymentLink | null> {
  if (!BUSHA_SECRET_KEY) {
    return mockPaymentLinks.find((link) => link.id === id) ?? null;
  }

  const response = await fetch(`${BUSHA_BASE_URL}/v1/payments/links/${id}`, {
    headers: { Authorization: `Bearer ${BUSHA_SECRET_KEY}` },
    cache: 'no-store'
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch payment link (${response.status})`);

  const data = (await response.json()) as Record<string, unknown>;
  return toAppPaymentLink(data);
}

export async function updatePaymentLink(id: string, payload: Partial<PaymentLinkPayload>) {
  if (!BUSHA_SECRET_KEY) {
    const target = mockPaymentLinks.find((link) => link.id === id);
    if (!target) return null;

    if (payload.title) target.title = payload.title;
    if (payload.description !== undefined) target.description = payload.description;
    if (payload.target_currency) target.settlementCurrency = payload.target_currency;
    if (payload.quote_amount !== undefined) target.quoteAmount = payload.quote_amount;
    if (payload.quote_currency) target.quoteCurrency = payload.quote_currency;
    if (payload.fixed !== undefined) target.isFixed = payload.fixed;
    if (payload.allow_customer_amount !== undefined) target.allowCustomerAmount = payload.allow_customer_amount;
    return target;
  }

  const response = await fetch(`${BUSHA_BASE_URL}/v1/payments/links/${id}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify(payload)
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to update payment link (${response.status})`);

  const data = (await response.json()) as Record<string, unknown>;
  return toAppPaymentLink(data);
}

export async function deletePaymentLink(id: string): Promise<boolean> {
  if (!BUSHA_SECRET_KEY) {
    const idx = mockPaymentLinks.findIndex((link) => link.id === id);
    if (idx < 0) return false;
    mockPaymentLinks.splice(idx, 1);
    return true;
  }

  const response = await fetch(`${BUSHA_BASE_URL}/v1/payments/links/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${BUSHA_SECRET_KEY}` }
  });

  if (response.status === 404) return false;
  if (!response.ok) throw new Error(`Failed to delete payment link (${response.status})`);

  return true;
}

export async function createQuote(payload: Record<string, unknown>) {
  if (!BUSHA_SECRET_KEY) {
    return {
      id: `quote_mock_${Date.now()}`,
      source_currency: String(payload.source_currency ?? 'BTC'),
      target_currency: String(payload.target_currency ?? 'NGN'),
      source_amount: String(payload.source_amount ?? '0.0008'),
      target_amount: String(payload.target_amount ?? '25000'),
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      status: 'active'
    };
  }

  const response = await fetch(`${BUSHA_BASE_URL}/v1/quotes`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error(`Failed to create quote (${response.status})`);
  return response.json();
}

export async function executeTransfer(quoteId: string) {
  if (!BUSHA_SECRET_KEY) {
    return { id: `tr_mock_${Date.now()}`, quote_id: quoteId, status: 'pending' };
  }

  const response = await fetch(`${BUSHA_BASE_URL}/v1/transfers`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ quote_id: quoteId })
  });

  if (!response.ok) throw new Error(`Failed to execute transfer (${response.status})`);
  return response.json();
}
