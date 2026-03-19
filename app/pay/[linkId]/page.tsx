import { notFound } from 'next/navigation';
import { CheckoutWidget } from '@/components/checkout/CheckoutWidget';
import { getPaymentLink } from '@/lib/busha';

export default async function PublicCheckoutPage({ params }: { params: Promise<{ linkId: string }> }) {
  const { linkId } = await params;
  const link = await getPaymentLink(linkId);

  if (!link) return notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center p-6">
      <div className="w-full space-y-4 rounded-2xl border border-white/10 bg-panel/80 p-6">
        <p className="text-xs uppercase tracking-wide text-white/60">AnyPay checkout</p>
        <h1 className="text-3xl font-bold">{link.title}</h1>
        <p className="text-white/70">{link.description}</p>
        <p className="text-2xl font-semibold">
          {link.isFixed && link.quoteAmount ? `${link.quoteCurrency} ${Number(link.quoteAmount).toLocaleString()}` : 'Pay any amount'}
        </p>
        <CheckoutWidget link={link} />
      </div>
    </main>
  );
}
