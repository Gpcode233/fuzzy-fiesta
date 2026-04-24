import { ApiKeyCard } from '@/components/dashboard/dev/ApiKeyCard';
import { WebhookConfig } from '@/components/dashboard/dev/WebhookConfig';
import { CodeSnippet } from '@/components/dashboard/dev/CodeSnippet';
import { TransactionTable } from '@/components/shared/TransactionTable';
import { mockTransactions } from '@/lib/mockDb';

export default function DeveloperDashboardPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-6 md:px-8 md:py-10 text-zinc-900 font-sans">
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-6 rounded-[32px] border border-zinc-200 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.15),_transparent_32%),linear-gradient(180deg,_#ffffff,_#fafafa)] px-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div className="space-y-5">
            <p className="font-serif text-xs uppercase tracking-[0.4em] text-zinc-400">Developer Console</p>
            <h1 className="max-w-2xl font-serif text-5xl font-semibold leading-tight">Build, rotate, and monitor your Busha payment integration.</h1>
            <p className="max-w-xl text-lg text-zinc-500">Manage API credentials, keep webhooks aligned with your local tunnel, and inspect recent payment activity from one place.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5 shadow-sm">
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Keys</p>
              <p className="mt-3 text-3xl font-semibold">1 active</p>
            </div>
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5 shadow-sm">
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Webhook mode</p>
              <p className="mt-3 text-3xl font-semibold">Sandbox</p>
            </div>
            <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-5 shadow-sm">
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Recent payouts</p>
              <p className="mt-3 text-3xl font-semibold">{mockTransactions.length}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <ApiKeyCard />
          <WebhookConfig />
        </div>

        <CodeSnippet />

        <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.35em] text-zinc-400">Activity</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold">Recent transactions</h2>
            </div>
            <div className="rounded-full border border-zinc-200 px-4 py-2 text-xs uppercase tracking-[0.3em] text-zinc-400">
              Updated just now
            </div>
          </div>
          <TransactionTable transactions={mockTransactions} />
        </section>
      </section>
    </main>
  );
}
