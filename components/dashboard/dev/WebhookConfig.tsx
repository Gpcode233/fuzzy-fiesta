export function WebhookConfig() {
  return (
    <div className="card space-y-2">
      <h3 className="font-semibold">Webhook URL</h3>
      <input className="input font-mono text-sm" defaultValue="https://your-app.com/api/webhook" />
      <p className="text-xs text-white/70">Use the secret from Busha dashboard to validate events server-side.</p>
    </div>
  );
}
