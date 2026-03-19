export function ApiKeyCard() {
  const key = process.env.BUSHA_API_KEY ? '••••••••••••••••' : 'Mock mode enabled';
  return (
    <div className="card">
      <h3 className="font-semibold">API Key</h3>
      <p className="mt-2 font-mono text-sm">{key}</p>
    </div>
  );
}
