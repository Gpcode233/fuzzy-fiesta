import {
  findMockPaymentLink,
  getMockPaymentLinks,
  insertMockPaymentLink,
  removeMockPaymentLink,
  updateMockPaymentLink
} from '@/lib/mockDb';
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

export async function createPaymentLink(payload: PaymentLinkPayload): Promise<PaymentLink> {
  if (!BUSHA_SECRET_KEY) {
    return insertMockPaymentLink(payload);
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
  if (!BUSHA_SECRET_KEY) return getMockPaymentLinks();

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
    return findMockPaymentLink(id);
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
    return updateMockPaymentLink(id, payload);
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
    return removeMockPaymentLink(id);
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
