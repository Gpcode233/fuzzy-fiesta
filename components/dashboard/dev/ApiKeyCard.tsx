export function ApiKeyCard() {
  const key = process.env.BUSHA_SECRET_KEY ? '••••••••••••••••••••••' : 'Demo mode';

  return (
    <div className="card space-y-3">
      <h3 className="font-semibold">Secret key</h3>
      <p className="rounded-md border border-white/10 bg-black/40 p-2 font-mono text-sm">{key}</p>
      <div className="flex gap-2 text-sm">
        <button className="rounded-lg border border-white/20 px-3 py-1.5">Copy</button>
        <button className="rounded-lg border border-white/20 px-3 py-1.5">Regenerate</button>
      </div>
    </div>
  );
}
