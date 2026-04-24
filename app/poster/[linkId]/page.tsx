import { getPaymentLink } from '@/lib/busha';
import { createDemoQrSvgMarkup, getPaymentLinkFromSearchParams } from '@/lib/demo';
import { PrintPoster } from '@/components/merchant/PrintPoster';
import { PosterPrintTrigger } from '@/components/merchant/PosterPrintTrigger';

export default async function PosterPage({
  params,
  searchParams
}: {
  params: Promise<{ linkId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { linkId } = await params;
  const resolvedSearchParams = await searchParams;
  const storedLink = await getPaymentLink(linkId);
  const link = storedLink ?? getPaymentLinkFromSearchParams(linkId, resolvedSearchParams);
  const shouldPrint = resolvedSearchParams.print === '1';
  const checkoutQuery = new URLSearchParams();

  if (typeof resolvedSearchParams.title === 'string') checkoutQuery.set('title', resolvedSearchParams.title);
  if (typeof resolvedSearchParams.amount === 'string') checkoutQuery.set('amount', resolvedSearchParams.amount);
  if (typeof resolvedSearchParams.currency === 'string') checkoutQuery.set('currency', resolvedSearchParams.currency);
  if (typeof resolvedSearchParams.description === 'string') checkoutQuery.set('description', resolvedSearchParams.description);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const checkoutUrl = `${appUrl}/pay/${link.id}${checkoutQuery.toString() ? `?${checkoutQuery.toString()}` : ''}`;
  const qrSvgMarkup = await createDemoQrSvgMarkup(checkoutUrl);

  return (
    <main className="min-h-screen bg-white p-8">
      <PosterPrintTrigger enabled={shouldPrint} />
      <PrintPoster paymentLink={link} qrSvgMarkup={qrSvgMarkup} checkoutUrl={checkoutUrl} />
    </main>
  );
}
