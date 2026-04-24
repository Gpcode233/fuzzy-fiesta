'use client';

import { CheckoutWidget } from '@/components/checkout/CheckoutWidget';
import { useStore } from '@/lib/store/useStore';
import { useParams, useSearchParams } from 'next/navigation';

export default function PublicCheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { merchantProfile, receipts } = useStore();
  
  const transactionId = searchParams.get('txn') ?? undefined;

  if (!merchantProfile) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fdf8f3]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Store not found</h2>
          <p className="text-muted-foreground">The merchant profile you are looking for is not initialized.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <CheckoutWidget 
        merchant={merchantProfile} 
        receipts={receipts} 
        initialTransactionId={transactionId} 
      />
    </main>
  );
}
