import { TransactionTable } from '@/components/shared/TransactionTable';
import { mockTransactions } from '@/lib/mockDb';

export default function MerchantTransactionsPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      <TransactionTable transactions={mockTransactions} />
    </main>
  );
}
