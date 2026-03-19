import { ApiKeyCard } from '@/components/dashboard/dev/ApiKeyCard';
import { WebhookConfig } from '@/components/dashboard/dev/WebhookConfig';
import { CodeSnippet } from '@/components/dashboard/dev/CodeSnippet';
import { TransactionTable } from '@/components/shared/TransactionTable';
import { getMockTransactions } from '@/lib/mockDb';

export default function DeveloperDashboardPage() {
  const transactions = getMockTransactions();

  return (
    <main className="mx-auto max-w-6xl space-y-4 p-8">
      <h1 className="text-3xl font-bold">Developer dashboard</h1>
      <p className="font-mono text-sm text-white/70">SDK + webhook tools for your AnyPay integration.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <ApiKeyCard />
        <WebhookConfig />
      </div>
      <CodeSnippet />
      <TransactionTable transactions={transactions} />
    </main>
  );
}
