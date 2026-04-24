import type { PaymentLink } from '@/types';

const slugToTitle = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const hashSeed = (input: string) => {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }

  return hash || 1;
};
export const createDemoQrSvgMarkup = async (value: string) => {
  const qrCodeModule = await import('qrcode');
  const qrCode = (qrCodeModule.default ?? qrCodeModule) as unknown as {
    toString: (input: string, options: {
      type: 'svg';
      errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
      margin: number;
      color: { dark: string; light: string };
    }) => string | Promise<string>;
  };

  return await qrCode.toString(value, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    color: {
      dark: '#111111',
      light: '#ffffff'
    }
  });
};

export const createDemoPaymentLink = (
  linkId: string,
  overrides?: Partial<Pick<PaymentLink, 'title' | 'description' | 'amount' | 'currency' | 'settlementCurrency'>>
): PaymentLink => ({
  id: linkId,
  userId: 'merchant-demo',
  title: overrides?.title ?? (slugToTitle(linkId) || 'Demo Store'),
  description: overrides?.description,
  amount: overrides?.amount ?? (hashSeed(linkId) % 90000) + 10000,
  currency: overrides?.currency ?? 'NGN',
  acceptedCurrencies: ['BTC', 'ETH', 'USDT', 'NGN'],
  settlementCurrency: overrides?.settlementCurrency ?? overrides?.currency ?? 'NGN',
  status: 'active',
  totalReceived: 0,
  transactionCount: 0,
  createdAt: new Date().toISOString()
});

export const buildDemoCheckoutPath = (link: PaymentLink) => {
  const params = new URLSearchParams();
  params.set('title', link.title);
  if (typeof link.amount === 'number') {
    params.set('amount', String(link.amount));
  }
  params.set('currency', link.currency);
  if (link.description && link.description !== 'Generated via builder') {
    params.set('description', link.description);
  }

  return `/pay/${link.id}?${params.toString()}`;
};

export const getPaymentLinkFromSearchParams = (
  linkId: string,
  searchParams: Record<string, string | string[] | undefined>
) => {
  const title = typeof searchParams.title === 'string' ? searchParams.title : undefined;
  const description = typeof searchParams.description === 'string' ? searchParams.description : undefined;
  const currency = typeof searchParams.currency === 'string' ? searchParams.currency : undefined;
  const amountParam = typeof searchParams.amount === 'string' ? Number(searchParams.amount) : undefined;

  return createDemoPaymentLink(linkId, {
    title,
    description,
    currency,
    settlementCurrency: currency,
    amount: Number.isFinite(amountParam) ? amountParam : undefined
  });
};
