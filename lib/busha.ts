import type { BushaQuote } from '@/types';

const BUSHA_BASE_URL = process.env.BUSHA_BASE_URL ?? 'https://sandbox.api.busha.io';
const BUSHA_API_KEY = process.env.BUSHA_API_KEY;

type QuoteParams = {
  source_currency: string;
  target_currency: string;
  target_amount?: string;
  source_amount?: string;
  pay_in?: Record<string, string>;
  pay_out?: Record<string, string>;
};

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

  const res = await fetch(`${BUSHA_BASE_URL}/v1/quotes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BUSHA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });

  if (!res.ok) throw new Error(`Quote request failed: ${res.status}`);
  return (await res.json()) as BushaQuote;
}

export async function executeTransfer(quoteId: string) {
  if (!BUSHA_API_KEY) {
    return { id: `tr_mock_${Date.now()}`, quote_id: quoteId, status: 'pending' };
  }

  const res = await fetch(`${BUSHA_BASE_URL}/v1/transfers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BUSHA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quote_id: quoteId })
  });

  if (!res.ok) throw new Error(`Transfer request failed: ${res.status}`);
  return res.json();
}
