export default function DeveloperDocsPage() {
  return (
    <main className="mx-auto max-w-4xl p-8 space-y-3">
      <h1 className="text-3xl font-bold font-serif">Flux SDK Quick Start</h1>
      <p className="text-zinc-600">Use /api/quote then /api/transfer to process payments.</p>
      <pre className="card text-xs overflow-auto">{`POST /api/quote\nPOST /api/transfer\nPOST /api/webhook`}</pre>
    </main>
  );
}
