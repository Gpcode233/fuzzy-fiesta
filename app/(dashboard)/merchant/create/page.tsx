import { StoreBuilder } from '@/components/dashboard/merchant/StoreBuilder';

export default function MerchantCreateLinkPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-4 p-8">
      <h1 className="text-3xl font-bold">Create your store link</h1>
      <StoreBuilder />
    </main>
  );
}
