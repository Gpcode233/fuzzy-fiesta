'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { UserType } from '@/types';
import { OnboardingTypeSelector } from '@/components/shared/OnboardingTypeSelector';

export default function SignupPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType | null>(null);
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('');
  const [settlementCurrency, setSettlementCurrency] = useState('NGN');

  const canContinue = userType === 'developer' || Boolean(storeName.trim() && storeCategory.trim());

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <section className="mx-auto max-w-4xl rounded-[32px] border border-[#ddcdb9] bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.14),_transparent_28%),linear-gradient(180deg,_#fbf4ea,_#f4e8d8)] p-6 shadow-[0_24px_60px_rgba(77,54,31,0.08)] md:p-8">
        <div className="space-y-3 border-b border-[#e5d5c3] pb-6">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#9b8468]">Create account</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Set up Flux for your business or product team.</h1>
          <p className="max-w-2xl text-sm leading-7 text-[#6e5a46] md:text-base">
            Choose how you&apos;ll use Flux. Merchant accounts get a short store setup before the dashboard opens.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.94fr]">
          <div className="space-y-5">
            <div className="card grid gap-3">
              <input className="input" placeholder="Full name" defaultValue="John Matt" />
              <input className="input" placeholder="Email" type="email" />
              <input className="input" placeholder="Password" type="password" />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-medium">How will you use Flux?</h2>
              <OnboardingTypeSelector selected={userType} onSelect={setUserType} />
            </div>

            <button
              className="btn-primary w-full rounded-full py-3"
              type="button"
              disabled={!userType || !canContinue}
              onClick={() => router.push(userType === 'developer' ? '/dashboard/dev' : '/dashboard/merchant')}
            >
              Continue
            </button>
          </div>

          <div className="rounded-[28px] border border-[#ddcdb9] bg-[#fffaf4] p-5 shadow-[0_10px_24px_rgba(77,54,31,0.06)]">
            {userType === 'merchant' ? (
              <div className="space-y-4">
                <div>
                  <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Merchant setup</p>
                  <h2 className="mt-3 text-2xl font-semibold">Store details</h2>
                  <p className="mt-2 text-sm leading-7 text-[#6e5a46]">
                    This becomes the merchant dashboard profile, fixed QR checkout, and receipt header.
                  </p>
                </div>

                <input className="input" value={storeName} onChange={(event) => setStoreName(event.target.value)} placeholder="Store name" />
                <input className="input" value={storeCategory} onChange={(event) => setStoreCategory(event.target.value)} placeholder="What do you sell?" />

                <label className="grid gap-2 text-sm text-[#7d6852]">
                  Settlement currency
                  <select className="input" value={settlementCurrency} onChange={(event) => setSettlementCurrency(event.target.value)}>
                    <option value="NGN">NGN</option>
                    <option value="KES">KES</option>
                    <option value="USDT">USDT</option>
                  </select>
                </label>

                <div className="rounded-3xl border border-dashed border-[#d7c3ad] bg-[#f7efe4] px-4 py-5 text-sm text-[#7d6852]">
                  Logo upload lives in Settings after signup, so merchants can update the receipt header later.
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">What opens next</p>
                <h2 className="text-2xl font-semibold">Developer console or merchant dashboard.</h2>
                <p className="text-sm leading-7 text-[#6e5a46]">
                  Developers go straight to keys and webhooks. Merchants add a store profile first, then manage receipts, inventory, and checkout.
                </p>
                <div className="grid gap-3">
                  <div className="rounded-3xl border border-[#eadbc9] bg-[#f8f1e7] px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#9b8468]">Merchant flow</p>
                    <p className="mt-2 text-sm text-[#6e5a46]">Create store, get a fixed QR code, build receipts from inventory, and accept any supported currency.</p>
                  </div>
                  <div className="rounded-3xl border border-[#eadbc9] bg-[#f8f1e7] px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#9b8468]">Developer flow</p>
                    <p className="mt-2 text-sm text-[#6e5a46]">Issue test keys, inspect sample payouts, and wire up Busha settlement with less friction.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
