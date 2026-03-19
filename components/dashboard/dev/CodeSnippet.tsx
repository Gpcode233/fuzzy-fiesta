export function CodeSnippet() {
  return (
    <pre className="card overflow-auto text-xs">
{`fetch('/api/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ source_currency: 'BTC', target_currency: 'NGN', target_amount: '50000' })
});`}
    </pre>
  );
}
