export function WebhookConfig() {
  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="font-serif text-xs uppercase tracking-[0.35em] text-zinc-400">Realtime</p>
      <h3 className="mt-3 font-serif text-2xl font-semibold text-zinc-900">Webhook configuration</h3>
      <p className="mt-2 max-w-md text-sm text-zinc-500">Point Busha to your webhook endpoint and verify deliveries with the shared signing secret.</p>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Endpoint</p>
          <p className="mt-2 font-mono text-sm text-zinc-900">POST /api/webhook</p>
        </div>
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Signing secret</p>
          <p className="mt-2 font-mono text-sm text-zinc-900">BUSHA_WEBHOOK_SECRET</p>
        </div>
        <div className="rounded-2xl border border-accent/20 bg-accent/10 p-4 text-sm text-zinc-600">
          Sandbox tip: use your public tunnel URL ending in <span className="font-mono text-zinc-900 font-semibold">/api/webhook</span>.
        </div>
      </div>
    </section>
  );
}
