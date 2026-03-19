import { ApiKeyCard } from '@/components/dashboard/dev/ApiKeyCard';
import { WebhookConfig } from '@/components/dashboard/dev/WebhookConfig';
import { CodeSnippet } from '@/components/dashboard/dev/CodeSnippet';
import { TransactionTable } from '@/components/shared/TransactionTable';
import { mockTransactions } from '@/lib/mockDb';

export default function DeveloperDashboardPage() {
  return (
    <main className="mx-auto max-w-6xl p-8 space-y-4">
      <h1 className="text-3xl font-bold">Developer Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <ApiKeyCard />
        <WebhookConfig />
      </div>
      <CodeSnippet />
      <TransactionTable transactions={mockTransactions} />
    </main>
  );
}
