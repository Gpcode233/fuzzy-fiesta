import type { BushaQuote } from '@/types';
import { createQuote } from '@/lib/busha';

export async function createOrRefreshQuote(currentQuote?: BushaQuote, params?: Parameters<typeof createQuote>[0]) {
  const now = Date.now();
  if (!currentQuote) {
    if (!params) throw new Error('Params required for initial quote creation');
    return createQuote(params);
  }

  if (new Date(currentQuote.expires_at).getTime() > now + 10_000) {
    return currentQuote;
  }

  if (!params) throw new Error('Params required for quote refresh');
  return createQuote(params);
}
