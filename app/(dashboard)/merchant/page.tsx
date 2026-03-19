import Link from 'next/link';
import { PaymentLinkCard } from '@/components/dashboard/merchant/PaymentLinkCard';
import { getMockPaymentLinks, getMockTransactions } from '@/lib/mockDb';

const currency = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 });

export default function MerchantDashboardPage() {
  const paymentLinks = getMockPaymentLinks();
  const transactions = getMockTransactions();
  const totalReceived = paymentLinks.reduce((sum, link) => sum + link.totalReceived, 0);

  return (
    <main className="mx-auto max-w-6xl space-y-5 p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Merchant dashboard</h1>
          <p className="text-white/70">Manage your store links and payouts in one place.</p>
        </div>
        <Link href="/dashboard/merchant/create" className="btn-primary inline-block">Create Payment Link</Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="text-white/70">Total received</p><p className="mt-1 text-2xl font-bold">{currency.format(totalReceived)}</p></div>
        <div className="card"><p className="text-white/70">Active links</p><p className="mt-1 text-2xl font-bold">{paymentLinks.filter((link) => link.status === 'active').length}</p></div>
        <div className="card"><p className="text-white/70">Transactions</p><p className="mt-1 text-2xl font-bold">{transactions.length}</p></div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Your payment links</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {paymentLinks.map((link) => <PaymentLinkCard key={link.id} link={link} />)}
        </div>
      </section>
    </main>
  );
}
