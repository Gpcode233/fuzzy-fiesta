export function WebhookConfig() {
  return (
    <div className="card">
      <h3 className="font-semibold">Webhook Configuration</h3>
      <p className="mt-2 text-sm text-white/70">POST /api/webhook</p>
      <p className="text-sm text-white/70">Secret: BUSHA_WEBHOOK_SECRET</p>
    </div>
  );
}
