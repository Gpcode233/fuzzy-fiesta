import Link from 'next/link';
import { PaymentLinkCard } from '@/components/dashboard/merchant/PaymentLinkCard';
import { SettlementSettings } from '@/components/dashboard/merchant/SettlementSettings';
import { mockPaymentLinks, mockTransactions } from '@/lib/mockDb';
import { TransactionTable } from '@/components/shared/TransactionTable';

export default function MerchantDashboardPage() {
  return (
    <main className="mx-auto max-w-6xl p-8 space-y-4">
      <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p>Total received</p><p className="text-2xl font-bold">₦245,000</p></div>
        <div className="card"><p>Active links</p><p className="text-2xl font-bold">{mockPaymentLinks.length}</p></div>
        <SettlementSettings />
      </div>
      <Link href="/dashboard/merchant/store" className="btn-primary inline-block">Create Payment Link</Link>
      <div className="grid gap-3 md:grid-cols-2">
        {mockPaymentLinks.map((link) => <PaymentLinkCard key={link.id} link={link} />)}
      </div>
      <TransactionTable transactions={mockTransactions} />
    </main>
  );
}
