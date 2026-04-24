import { CheckoutWidget } from '@/components/checkout/CheckoutWidget';
import { mockMerchantProfile, mockReceipts } from '@/lib/mockDb';

export default async function PublicCheckoutPage({
  searchParams
}: {
  params: Promise<{ linkId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const transactionId = typeof resolvedSearchParams.txn === 'string' ? resolvedSearchParams.txn : undefined;

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <CheckoutWidget merchant={mockMerchantProfile} receipts={mockReceipts} initialTransactionId={transactionId} />
    </main>
  );
}
