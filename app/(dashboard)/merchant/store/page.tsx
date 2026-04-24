import { StoreBuilder } from '@/components/dashboard/merchant/StoreBuilder';

export default function MerchantStorePage() {
  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-3">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#9b8468]">Merchant dashboard</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Create payment receipts from store inventory.</h1>
          <p className="max-w-2xl text-sm leading-7 text-[#6e5a46] md:text-base">
            Add inventory items, lock prices from your catalog, and generate a transaction ID for checkout.
          </p>
        </div>
        <StoreBuilder />
      </section>
    </main>
  );
}
