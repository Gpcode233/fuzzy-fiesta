import { mockPaymentLinks } from '@/lib/mockDb';
import type { BushaQuote, PaymentLink, PaymentLinkPayload } from '@/types';

const BUSHA_BASE_URL = process.env.BUSHA_BASE_URL ?? 'https://api.sandbox.busha.so';
const BUSHA_API_KEY = process.env.BUSHA_API_KEY;

type QuoteParams = {
  source_currency: string;
  target_currency: string;
  target_amount?: string;
  source_amount?: string;
  pay_in?: Record<string, string>;
  pay_out?: Record<string, string>;
};

type BushaEnvelope<T> = {
  status?: string;
  message?: string;
  data?: T;
  errors?: unknown;
};

const extractBushaError = async (res: Response): Promise<string> => {
  const fallback = `Request failed: ${res.status}`;

  try {
    const payload = (await res.json()) as BushaEnvelope<unknown> | Record<string, unknown>;

    if ('message' in payload && typeof payload.message === 'string' && payload.message) {
      return payload.message;
    }

    if ('error' in payload && typeof payload.error === 'string' && payload.error) {
      return payload.error;
    }

    if ('errors' in payload && payload.errors) {
      return typeof payload.errors === 'string' ? payload.errors : JSON.stringify(payload.errors);
    }

    return fallback;
  } catch {
    try {
      const text = await res.text();
      return text || fallback;
    } catch {
      return fallback;
    }
  }
};

const normalizePaymentLink = (id: string, payload: PaymentLinkPayload): PaymentLink => ({
  id,
  userId: 'merchant-1',
  title: payload.title,
  description: payload.description,
  amount: payload.amount,
  currency: payload.currency,
  acceptedCurrencies: payload.acceptedCurrencies ?? ['BTC', 'ETH', 'USDT', 'NGN'],
  settlementCurrency: payload.settlementCurrency ?? payload.currency,
  status: payload.status ?? 'active',
  totalReceived: 0,
  transactionCount: 0,
  createdAt: new Date().toISOString()
});

export async function listPaymentLinks(): Promise<PaymentLink[]> {
  return mockPaymentLinks;
}

export async function getPaymentLink(id: string): Promise<PaymentLink | null> {
  return mockPaymentLinks.find((link) => link.id === id) ?? null;
}

export async function createPaymentLink(payload: PaymentLinkPayload): Promise<PaymentLink> {
  const id = payload.title.toLowerCase().trim().replaceAll(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `link-${Date.now()}`;
  const link = normalizePaymentLink(id, payload);
  mockPaymentLinks.push(link);
  return link;
}

export async function updatePaymentLink(id: string, payload: Partial<PaymentLinkPayload>): Promise<PaymentLink | null> {
  const index = mockPaymentLinks.findIndex((link) => link.id === id);
  if (index === -1) {
    return null;
  }

  const current = mockPaymentLinks[index];
  const updated: PaymentLink = {
    ...current,
    ...payload,
    acceptedCurrencies: payload.acceptedCurrencies ?? current.acceptedCurrencies,
    settlementCurrency: payload.settlementCurrency ?? current.settlementCurrency,
    status: payload.status ?? current.status
  };
  mockPaymentLinks[index] = updated;
  return updated;
}

export async function deletePaymentLink(id: string): Promise<boolean> {
  const index = mockPaymentLinks.findIndex((link) => link.id === id);
  if (index === -1) {
    return false;
  }

  mockPaymentLinks.splice(index, 1);
  return true;
}

export async function createQuote(params: QuoteParams): Promise<BushaQuote> {
  if (!BUSHA_API_KEY) {
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

  let res: Response;
  try {
    res = await fetch(`${BUSHA_BASE_URL}/v1/quotes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BUSHA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
  } catch (error) {
    throw new Error(`Busha quote request could not reach ${BUSHA_BASE_URL}. Check BUSHA_BASE_URL, DNS, or network access.`, { cause: error });
  }

  if (!res.ok) {
    throw new Error(`Quote request failed: ${await extractBushaError(res)}`);
  }
  const payload = (await res.json()) as BushaEnvelope<BushaQuote> | BushaQuote;
  if ('data' in payload && payload.data) {
    return payload.data;
  }

  return payload as BushaQuote;
}

export async function executeTransfer(quoteId: string) {
  if (!BUSHA_API_KEY) {
    return { id: `tr_mock_${Date.now()}`, quote_id: quoteId, status: 'pending' };
  }

  let res: Response;
  try {
    res = await fetch(`${BUSHA_BASE_URL}/v1/transfers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BUSHA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quote_id: quoteId })
    });
  } catch (error) {
    throw new Error(`Busha transfer request could not reach ${BUSHA_BASE_URL}. Check BUSHA_BASE_URL, DNS, or network access.`, { cause: error });
  }

  if (!res.ok) {
    throw new Error(`Transfer request failed: ${await extractBushaError(res)}`);
  }
  const payload = (await res.json()) as BushaEnvelope<Record<string, unknown>> | Record<string, unknown>;
  if ('data' in payload && payload.data) {
    return payload.data;
  }

  return payload;
}
