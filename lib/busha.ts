import { mockPaymentLinks } from '@/lib/mockDb';
import type { BushaQuote, PaymentLink, PaymentLinkPayload } from '@/types';

const BUSHA_BASE_URL = process.env.BUSHA_BASE_URL ?? 'https://api.sandbox.busha.so';
const BUSHA_API_KEY = process.env.BUSHA_API_KEY;
const BUSHA_SECRET_KEY = process.env.BUSHA_SECRET_KEY;
const BUSHA_PROFILE_ID = process.env.BUSHA_PROFILE_ID;

const getAuthToken = () => {
  if (!BUSHA_API_KEY || !BUSHA_SECRET_KEY) return null;
  return Buffer.from(`${BUSHA_API_KEY}:${BUSHA_SECRET_KEY}`).toString('base64');
};

type BushaEnvelope<T> = {
  status?: string;
  message?: string;
  data?: T;
  errors?: unknown;
};

interface BushaPaymentLinkResponse {
  id: string;
  link: string;
  title: string;
  description: string;
  target_amount: string;
  target_currency: string;
  status: string;
  created_at: string;
}

const extractBushaError = async (res: Response): Promise<string> => {
  const fallback = `Request failed: ${res.status}`;
  try {
    const payload = (await res.json()) as BushaEnvelope<unknown> | Record<string, unknown>;
    if ('message' in payload && typeof payload.message === 'string' && payload.message) {
      return payload.message;
    }
    if ('errors' in payload && payload.errors) {
      return typeof payload.errors === 'string' ? payload.errors : JSON.stringify(payload.errors);
    }
    return fallback;
  } catch {
    return fallback;
  }
};

const mapBushaToLocal = (busha: BushaPaymentLinkResponse): PaymentLink => ({
  id: busha.id,
  userId: 'merchant-1',
  title: busha.title,
  description: busha.description,
  amount: parseFloat(busha.target_amount),
  currency: busha.target_currency,
  acceptedCurrencies: ['BTC', 'ETH', 'USDT', 'NGN'],
  settlementCurrency: busha.target_currency,
  status: 'active',
  totalReceived: 0,
  transactionCount: 0,
  createdAt: busha.created_at,
  hostedUrl: busha.link
});

export async function listPaymentLinks(): Promise<PaymentLink[]> {
  const token = getAuthToken();
  if (!token || !BUSHA_PROFILE_ID) return mockPaymentLinks;

  try {
    const res = await fetch(`${BUSHA_BASE_URL}/v1/payments/links`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-BU-PROFILE-ID': BUSHA_PROFILE_ID
      }
    });
    if (!res.ok) throw new Error(await extractBushaError(res));
    const payload = (await res.json()) as BushaEnvelope<BushaPaymentLinkResponse[]>;
    return (payload.data ?? []).map(mapBushaToLocal);
  } catch (error) {
    console.error('Error listing payment links:', error);
    return mockPaymentLinks;
  }
}

export async function getPaymentLink(id: string): Promise<PaymentLink | null> {
  const token = getAuthToken();
  if (!token || !BUSHA_PROFILE_ID) return mockPaymentLinks.find((link) => link.id === id) ?? null;

  try {
    const res = await fetch(`${BUSHA_BASE_URL}/v1/payments/links/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-BU-PROFILE-ID': BUSHA_PROFILE_ID
      }
    });
    if (!res.ok) return null;
    const payload = (await res.json()) as BushaEnvelope<BushaPaymentLinkResponse>;
    return payload.data ? mapBushaToLocal(payload.data) : null;
  } catch {
    return null;
  }
}

export async function createPaymentLink(payload: PaymentLinkPayload): Promise<PaymentLink> {
  const token = getAuthToken();
  if (!token || !BUSHA_PROFILE_ID) {
    const id = payload.title.toLowerCase().trim().replaceAll(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `link-${Date.now()}`;
    const link: PaymentLink = {
      id,
      userId: 'merchant-1',
      title: payload.title,
      description: payload.description,
      amount: payload.amount,
      currency: payload.currency,
      acceptedCurrencies: payload.acceptedCurrencies ?? ['BTC', 'ETH', 'USDT', 'NGN'],
      settlementCurrency: payload.settlementCurrency ?? payload.currency,
      status: 'active',
      totalReceived: 0,
      transactionCount: 0,
      createdAt: new Date().toISOString()
    };
    mockPaymentLinks.push(link);
    return link;
  }

  const res = await fetch(`${BUSHA_BASE_URL}/v1/payments/links`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-BU-PROFILE-ID': BUSHA_PROFILE_ID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fixed: !!payload.amount,
      one_time: false,
      name: payload.title,
      title: payload.title,
      description: payload.description || 'Payment for items',
      target_currency: payload.currency,
      target_amount: payload.amount?.toString(),
      type: 'payment_link'
    })
  });

  if (!res.ok) throw new Error(await extractBushaError(res));
  const result = (await res.json()) as BushaEnvelope<BushaPaymentLinkResponse>;
  if (!result.data) throw new Error('Failed to create payment link');
  return mapBushaToLocal(result.data);
}

export async function updatePaymentLink(id: string, payload: Partial<PaymentLinkPayload>): Promise<PaymentLink | null> {
  const index = mockPaymentLinks.findIndex((link) => link.id === id);
  if (index !== -1) {
    const current = mockPaymentLinks[index];
    const updated = { ...current, ...payload };
    mockPaymentLinks[index] = updated as PaymentLink;
    return updated as PaymentLink;
  }
  return null;
}

export async function deletePaymentLink(id: string): Promise<boolean> {
  const index = mockPaymentLinks.findIndex((link) => link.id === id);
  if (index !== -1) {
    mockPaymentLinks.splice(index, 1);
    return true;
  }
  return false;
}

export async function createQuote(params: {
  source_currency: string;
  target_currency: string;
  target_amount?: string;
  source_amount?: string;
}): Promise<BushaQuote> {
  const token = getAuthToken();
  if (!token) {
    return {
      id: `quote_mock_${Date.now()}`,
      source_currency: params.source_currency,
      target_currency: params.target_currency,
      source_amount: params.source_amount ?? '0.001',
      target_amount: params.target_amount ?? '50000',
      rate: { product: `${params.source_currency}-${params.target_currency}`, rate: '50000000', side: 'sell', type: 'market' },
      fees: [],
      expires_at: new Date(Date.now() + 60_000).toISOString(),
      status: 'active'
    };
  }

  const res = await fetch(`${BUSHA_BASE_URL}/v1/quotes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });

  if (!res.ok) throw new Error(await extractBushaError(res));
  const payload = (await res.json()) as BushaEnvelope<BushaQuote>;
  return payload.data!;
}

export async function executeTransfer(quoteId: string) {
  const token = getAuthToken();
  if (!token) return { id: `tr_mock_${Date.now()}`, quote_id: quoteId, status: 'pending' };

  const res = await fetch(`${BUSHA_BASE_URL}/v1/transfers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quote_id: quoteId })
  });

  if (!res.ok) throw new Error(await extractBushaError(res));
  const payload = (await res.json()) as BushaEnvelope<Record<string, unknown>>;
  return payload.data;
}

