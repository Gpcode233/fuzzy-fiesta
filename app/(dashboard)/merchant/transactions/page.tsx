import { TransactionTable } from '@/components/shared/TransactionTable';
import { mockTransactions } from '@/lib/mockDb';

export default function MerchantTransactionsPage() {
  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <section className="mx-auto max-w-5xl space-y-5">
        <div>
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#9b8468]">Transactions</p>
          <h1 className="mt-3 text-4xl font-semibold">Settlement activity</h1>
        </div>
        <TransactionTable transactions={mockTransactions} />
      </section>
    </main>
  );
}
