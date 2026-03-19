export function CodeSnippet() {
  return (
    <pre className="card overflow-auto bg-black text-xs leading-relaxed text-accent">
{`import BushaCommerce from "@busha/commerce-js";

BushaCommerce({
  public_key: paymentLink.pub_key,
  quote_amount: "25000",
  quote_currency: "NGN",
  target_currency: "NGN",
  source: "payment-link",
  source_id: paymentLink.id,
  meta: { email: "payer@email.com", name: "John" },
  onSuccess: () => console.log("paid"),
});`}
    </pre>
  );
}
