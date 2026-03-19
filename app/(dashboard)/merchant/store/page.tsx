import { StoreBuilder } from '@/components/dashboard/merchant/StoreBuilder';

export default function MerchantStorePage() {
  return (
    <main className="mx-auto max-w-6xl p-8 space-y-4">
      <h1 className="text-3xl font-bold">Payment Link Builder</h1>
      <StoreBuilder />
    </main>
  );
}
