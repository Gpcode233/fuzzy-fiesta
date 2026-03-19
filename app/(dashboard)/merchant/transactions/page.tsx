import { TransactionTable } from '@/components/shared/TransactionTable';
import { getMockTransactions } from '@/lib/mockDb';

export default function MerchantTransactionsPage() {
  const transactions = getMockTransactions();

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-4 text-3xl font-bold">Transactions</h1>
      <TransactionTable transactions={transactions} />
    </main>
  );
}
