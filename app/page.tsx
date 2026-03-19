import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-4xl font-bold">AnyPay</h1>
      <p className="mt-2 text-white/70">Accept any currency. Settle in yours.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/signup" className="btn-primary">Get Started</Link>
        <Link href="/dashboard/merchant" className="card">View Merchant Demo</Link>
      </div>
    </main>
  );
}
