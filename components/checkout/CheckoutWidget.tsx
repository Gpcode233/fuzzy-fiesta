'use client';

import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MerchantProfile, PaymentReceipt } from '@/types';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { CurrencySelector } from './CurrencySelector';

const currencySymbols: Record<string, string> = {
  NGN: 'NGN',
  KES: 'KES',
  BTC: 'BTC',
  ETH: 'ETH',
  USDT: 'USDT'
};

const conversionRates: Record<string, number> = {
  NGN: 1,
  KES: 0.081,
  BTC: 1 / 154000000,
  ETH: 1 / 5800000,
  USDT: 1 / 1600
};

const formatter = new Intl.NumberFormat('en-NG');

const normalizeTransactionId = (value: string) => value.replace(/\D/g, '').slice(0, 6);

export function CheckoutWidget({
  merchant,
  receipts,
  initialTransactionId
}: {
  merchant: MerchantProfile;
  receipts: PaymentReceipt[];
  initialTransactionId?: string;
}) {
  const supportedCurrencies = ['BTC', 'ETH', 'USDT', 'NGN', 'KES'];
  const otpRef = useRef<HTMLInputElement | null>(null);
  const [currency, setCurrency] = useState('USDT');
  const [transactionId, setTransactionId] = useState(normalizeTransactionId(initialTransactionId ?? ''));
  const [status, setStatus] = useState<string | null>(null);
  const [browserReceipts, setBrowserReceipts] = useState<PaymentReceipt[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem('flux-generated-receipts');
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as PaymentReceipt[];
      setBrowserReceipts(parsed.map((receipt) => ({ ...receipt, transactionId: normalizeTransactionId(receipt.transactionId) })));
    } catch {
      setBrowserReceipts([]);
    }
  }, []);

  const allReceipts = useMemo(() => {
    const seen = new Set<string>();
    return [...browserReceipts, ...receipts]
      .map((receipt) => ({ ...receipt, transactionId: normalizeTransactionId(receipt.transactionId) }))
      .filter((receipt) => {
        if (seen.has(receipt.transactionId)) return false;
        seen.add(receipt.transactionId);
        return true;
      });
  }, [browserReceipts, receipts]);

  const activeReceipt = useMemo(
    () => allReceipts.find((receipt) => receipt.transactionId === normalizeTransactionId(transactionId)) ?? null,
    [allReceipts, transactionId]
  );

  const merchantAmount = activeReceipt?.subtotal ?? 0;
  const selectedRate = conversionRates[currency] ?? 1;
  const customerAmount = merchantAmount ? (currency === merchant.settlementCurrency ? merchantAmount : merchantAmount * selectedRate) : 0;
  const formattedCustomerAmount = customerAmount >= 1 ? customerAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }) : customerAmount.toFixed(6);

  const proceedToCheckout = () => {
    if (!activeReceipt) {
      setStatus('Enter a valid 6-digit transaction ID from the seller to continue.');
      return;
    }

    setStatus(`Payment confirmed for ${activeReceipt.transactionId}. The receipt is now ready to save under ${merchant.storeName}.`);
  };

  return (
    <section className="grid overflow-hidden rounded-[28px] border border-[#ddcdb9] bg-[#f8f1e7] shadow-[0_24px_60px_rgba(77,54,31,0.12)] md:grid-cols-[1.05fr_1fr]">
      <div className="flex min-h-[620px] flex-col justify-between border-r border-[#e4d4c1] bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.16),_transparent_38%),linear-gradient(180deg,_#f8f1e7,_#f1e5d6)] px-8 py-10 md:px-10">
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-lg font-serif font-bold text-black shadow-sm">
              {(merchant.storeName[0] ?? 'F').toUpperCase()}
            </div>
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Merchant</p>
              <p className="font-serif text-xl font-medium text-zinc-900">{merchant.storeName}</p>
            </div>
          </div>

          <div>
            <p className="font-serif text-sm uppercase tracking-[0.3em] text-[#9b8468]">How this works</p>
            <div className="mt-4 space-y-3 text-[#6e5a46]">
              <p>1. Ask the seller for the 6-digit transaction ID.</p>
              <p>2. Enter the ID to load the receipt.</p>
              <p>3. Choose your currency and pay.</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-serif text-sm uppercase tracking-[0.3em] text-[#9b8468]">Receipt total</p>
            <div className="rounded-2xl border border-[#ddcdb9] bg-[#fbf6ef] px-4 py-4 shadow-[0_10px_24px_rgba(77,54,31,0.08)]">
              {activeReceipt ? (
                <>
                  <p className="font-serif text-4xl font-medium text-zinc-900">N{formatter.format(activeReceipt.subtotal)}</p>
                  <p className="mt-2 text-sm text-[#7d6852]">{activeReceipt.items.length} items • settles in {merchant.settlementCurrency}</p>
                </>
              ) : (
                <>
                  <p className="font-serif text-3xl font-medium text-zinc-900">Waiting for transaction ID</p>
                  <p className="mt-2 text-sm text-[#7d6852]">The receipt appears here after a valid ID is entered.</p>
                </>
              )}
            </div>
          </div>

          {activeReceipt ? (
            <div className="rounded-2xl border border-[#ddcdb9] bg-[#fbf6ef] px-4 py-4 shadow-[0_10px_24px_rgba(77,54,31,0.08)]">
              <p className="text-sm text-[#9b8468]">Customer pays</p>
              <p className="mt-2 font-serif text-2xl font-medium text-zinc-900">{formattedCustomerAmount} {currencySymbols[currency] ?? currency}</p>
              <p className="mt-1 text-sm text-[#7d6852]">Receipt ID {activeReceipt.transactionId}</p>
            </div>
          ) : null}
        </div>

        <p className="mt-10 text-sm text-[#9b8468]">Secured by <span className="font-serif font-semibold text-accent-dark">flux</span></p>
      </div>

      <div className="flex min-h-[620px] flex-col justify-center bg-[#fdf8f2] px-8 py-10 md:px-12">
        <div className="mx-auto w-full max-w-[420px] space-y-6">
          <div>
            <h2 className="font-serif text-4xl font-medium text-zinc-900">Enter transaction ID</h2>
            <p className="mt-3 text-lg text-[#7d6852]">Your seller gives you the 6-digit code that matches this receipt.</p>
          </div>

          <div className="space-y-3">
            <InputOTP
              ref={otpRef}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={transactionId}
              onChange={(value) => setTransactionId(normalizeTransactionId(value))}
              autoFocus
              className="text-[#2c231c] caret-[#2c231c]"
              containerClassName="justify-center"
            >
              <div className="flex justify-center" onClick={() => otpRef.current?.focus()}>
                <InputOTPGroup className="cursor-text overflow-hidden rounded-[18px] border border-[#ddcdb9] bg-[#fffaf4] shadow-[0_10px_24px_rgba(77,54,31,0.06)]">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="h-14 w-12 border-[#ddcdb9] bg-[#fffaf4] text-lg font-semibold text-[#2c231c] first:rounded-l-[18px] last:rounded-r-[18px] data-[active=true]:border-accent data-[active=true]:bg-[#fff6d8] data-[active=true]:text-[#2c231c] data-[active=true]:ring-2 data-[active=true]:ring-accent/30"
                    />
                  ))}
                </InputOTPGroup>
              </div>
            </InputOTP>
            <p className="text-center text-sm text-[#8d735b]">Numbers only</p>
          </div>

          <div className="space-y-4">
            <p className="font-serif text-sm uppercase tracking-[0.3em] text-[#9b8468]">Choose currency</p>
            <CurrencySelector currencies={supportedCurrencies} value={currency} onChange={setCurrency} />
          </div>

          {activeReceipt ? (
            <div className="rounded-2xl border border-[#ddcdb9] bg-[#f6ede2] px-4 py-4 text-sm text-[#6e5a46]">
              <p className="font-medium text-[#3b2d21]">{activeReceipt.customerLabel}</p>
              <ul className="mt-3 space-y-2">
                {activeReceipt.items.map((item) => (
                  <li key={item.inventoryItemId} className="flex items-center justify-between gap-3">
                    <span>{item.name} x {item.quantity}</span>
                    <span>N{formatter.format(item.total)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <button className="w-full rounded-full bg-accent px-6 py-4 text-lg font-semibold text-black shadow-md shadow-accent/20 transition hover:bg-accent-dark" onClick={proceedToCheckout} type="button">
            Pay now
          </button>

          {status ? (
            <div className="rounded-2xl border border-[#ddcdb9] bg-[#f6ede2] px-4 py-4 text-sm text-[#6e5a46]">
              {status}
            </div>
          ) : null}

          <p className="pt-2 text-center text-sm text-[#9b8468]">Secured by <span className="font-serif font-semibold text-accent-dark">flux</span></p>
        </div>
      </div>
    </section>
  );
}
