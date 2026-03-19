import Link from 'next/link';
import type { PaymentLink } from '@/types';

export function PaymentLinkCard({ link }: { link: PaymentLink }) {
  return (
    <div className="card">
      <h4 className="font-semibold">{link.title}</h4>
      <p className="text-sm text-white/70">{link.transactionCount} payments • {link.totalReceived} {link.settlementCurrency}</p>
      <Link href={`/pay/${link.id}`} className="mt-3 inline-block text-accent">Open checkout ↗</Link>
    </div>
  );
}
