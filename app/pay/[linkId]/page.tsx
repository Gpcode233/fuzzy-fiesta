import { notFound } from 'next/navigation';
import { CheckoutWidget } from '@/components/checkout/CheckoutWidget';
import { mockPaymentLinks } from '@/lib/mockDb';

export default async function PublicCheckoutPage({ params }: { params: Promise<{ linkId: string }> }) {
  const { linkId } = await params;
  const link = mockPaymentLinks.find((item) => item.id === linkId);
  if (!link) return notFound();

  return (
    <main className="mx-auto max-w-2xl p-8 space-y-4">
      <div className="card">
        <h1 className="text-3xl font-bold">{link.title}</h1>
        <p className="text-white/70">{link.description}</p>
        <p className="mt-2 text-xl">{link.amount} {link.currency}</p>
      </div>
      <CheckoutWidget link={link} />
    </main>
  );
}
