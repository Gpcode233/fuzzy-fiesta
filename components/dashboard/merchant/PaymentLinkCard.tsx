import Link from 'next/link';
import type { PaymentLink } from '@/types';

export function PaymentLinkCard({ link }: { link: PaymentLink }) {
  return (
    <div className="card">
      <h4 className="text-lg font-semibold">{link.title}</h4>
      <p className="mt-2 text-sm text-[#6e5a46]">{link.transactionCount} payments • {link.totalReceived} {link.settlementCurrency}</p>
      <Link href={`/pay/${link.id}`} className="mt-3 inline-block font-medium text-accent-dark transition hover:underline">
        Open checkout
      </Link>
    </div>
  );
}
