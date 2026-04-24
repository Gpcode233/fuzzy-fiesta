import Link from 'next/link';
import type { Route } from 'next';
import { createDemoQrSvgMarkup, createDemoPaymentLink } from '@/lib/demo';
import { mockMerchantProfile, mockReceipts, mockTransactions } from '@/lib/mockDb';
import { ReceiptTable } from '@/components/dashboard/merchant/ReceiptTable';
import { TransactionTable } from '@/components/shared/TransactionTable';
import { PosterActions } from '@/components/merchant/PosterActions';

const money = new Intl.NumberFormat('en-NG');

export default async function MerchantDashboardPage() {
  const paidReceipts = mockReceipts.filter((receipt) => receipt.status === 'paid');
  const totalReceived = paidReceipts.reduce((sum, receipt) => sum + receipt.subtotal, 0);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const qrSvgMarkup = await createDemoQrSvgMarkup(`${appUrl}${mockMerchantProfile.fixedCheckoutPath}`);
  const posterLink = createDemoPaymentLink(mockMerchantProfile.id, {
    title: mockMerchantProfile.storeName,
    description: `${mockMerchantProfile.storeCategory} checkout`,
    amount: mockReceipts[0]?.subtotal ?? 16000,
    currency: mockMerchantProfile.settlementCurrency,
    settlementCurrency: mockMerchantProfile.settlementCurrency
  });

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-6 rounded-[34px] border border-[#ddcdb9] bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.12),_transparent_30%),linear-gradient(180deg,_#fbf4ea,_#f3e6d6)] px-6 py-8 shadow-[0_24px_60px_rgba(77,54,31,0.08)] md:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-5">
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#9b8468]">Merchant dashboard</p>
                <h1 className="mt-3 text-4xl font-semibold leading-[0.96] md:text-5xl">{mockMerchantProfile.storeName}</h1>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[#6e5a46] md:text-base">
                  Store QR checkout, receipt activity, and settlement visibility in one merchant surface.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/merchant/store" className="btn-primary rounded-full px-6 py-3">
                  Create payment receipt
                </Link>
                <Link href={'/dashboard/merchant/settings' as Route} className="rounded-full border border-[#cfbba6] px-6 py-3 text-sm font-semibold text-[#4d3a2c] transition hover:bg-[#f7efe4]">
                  Open settings
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-[#eadbc9] bg-[#fffaf4] p-4">
                  <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#9b8468]">Total received</p>
                  <p className="mt-3 text-3xl font-semibold">N{money.format(totalReceived)}</p>
                </div>
                <div className="rounded-[24px] border border-[#eadbc9] bg-[#fffaf4] p-4">
                  <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#9b8468]">Draft receipts</p>
                  <p className="mt-3 text-3xl font-semibold">{mockReceipts.filter((receipt) => receipt.status === 'draft').length}</p>
                </div>
                <div className="rounded-[24px] border border-[#eadbc9] bg-[#fffaf4] p-4">
                  <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#9b8468]">Settlements</p>
                  <p className="mt-3 text-3xl font-semibold">{mockTransactions.length}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#dcc9b2] bg-[#fff9f1] p-5 shadow-[0_16px_32px_rgba(77,54,31,0.06)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Store QR</p>
                  <h2 className="mt-3 text-2xl font-semibold">Ready to print and share.</h2>
                </div>
                <div className="rounded-full border border-[#d7c3ad] bg-[#f8f1e7] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9b8468]">
                  {mockMerchantProfile.settlementCurrency}
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-[minmax(200px,240px)_1fr]">
                <div className="rounded-[28px] border border-[#eadbc9] bg-white p-3">
                  <div className="qr-code-markup" dangerouslySetInnerHTML={{ __html: qrSvgMarkup }} />
                </div>
                <div className="flex h-full flex-col justify-between gap-5">
                  <div className="rounded-[24px] border border-[#eadbc9] bg-[#f8f1e7] p-4">
                    <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#9b8468]">Checkout path</p>
                    <p className="mt-3 text-lg font-semibold text-[#2c231c]">{mockMerchantProfile.fixedCheckoutPath}</p>
                    <p className="mt-2 text-sm leading-7 text-[#6e5a46]">Use this QR on the counter, in print, or across store materials.</p>
                  </div>
                  <PosterActions paymentLink={posterLink} appUrl={appUrl} className="flex flex-wrap gap-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-[#ddcdb9] bg-[#fffaf4] p-6 shadow-[0_16px_32px_rgba(77,54,31,0.05)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Receipts</p>
                <h2 className="mt-3 text-2xl font-semibold">Customer receipts</h2>
              </div>
              <div className="rounded-full border border-[#d7c3ad] bg-[#f7efe4] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9b8468]">
                {mockReceipts.length} total
              </div>
            </div>
            <ReceiptTable receipts={mockReceipts} />
          </div>

          <div className="rounded-[28px] border border-[#ddcdb9] bg-[#fffaf4] p-6 shadow-[0_16px_32px_rgba(77,54,31,0.05)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Settlement activity</p>
                <h2 className="mt-3 text-2xl font-semibold">Settlements</h2>
              </div>
              <div className="rounded-full border border-[#d7c3ad] bg-[#f7efe4] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9b8468]">
                {mockTransactions.length} rows
              </div>
            </div>
            <TransactionTable transactions={mockTransactions} />
          </div>
        </section>
      </section>
    </main>
  );
}
