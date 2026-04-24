export function CodeSnippet() {
  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-zinc-400">Quick Start</p>
          <h3 className="mt-3 font-serif text-2xl font-semibold text-zinc-900">Drop-in request example</h3>
        </div>
        <div className="rounded-full border border-zinc-200 px-4 py-2 text-xs uppercase tracking-[0.3em] text-zinc-400">
          POST /api/quote
        </div>
      </div>
      <pre className="mt-6 overflow-auto rounded-3xl border border-zinc-100 bg-zinc-50 p-5 text-sm text-zinc-700">
{`fetch('/api/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    source_currency: 'KES',
    target_currency: 'NGN',
    target_amount: '50000'
  })
});`}
      </pre>
    </section>
  );
}
