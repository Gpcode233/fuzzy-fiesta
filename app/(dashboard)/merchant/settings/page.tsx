import Link from 'next/link';
import type { Route } from 'next';
import { Boxes, Card, Upload, UserCircle } from '@solar-icons/react';
import { createDemoQrSvgMarkup } from '@/lib/demo';
import { mockInventory, mockMerchantProfile } from '@/lib/mockDb';
import { InventoryManager } from '@/components/dashboard/merchant/InventoryManager';

const sections = [
  { key: 'profile', label: 'Profile', icon: UserCircle },
  { key: 'inventory', label: 'Inventory', icon: Boxes },
  { key: 'checkout', label: 'Checkout', icon: Card }
] as const;

export default async function MerchantSettingsPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const activeSection = typeof resolvedSearchParams?.section === 'string' && sections.some((section) => section.key === resolvedSearchParams.section)
    ? resolvedSearchParams.section
    : 'profile';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const qrSvgMarkup = await createDemoQrSvgMarkup(`${appUrl}${mockMerchantProfile.fixedCheckoutPath}`);

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-3">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#9b8468]">Settings</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Store controls</h1>
          <p className="max-w-2xl text-sm leading-7 text-[#6e5a46] md:text-base">
            Manage the merchant profile, inventory catalog, and the fixed checkout experience from one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-[30px] border border-[#ddcdb9] bg-[#fffaf4] p-4 shadow-[0_16px_40px_rgba(77,54,31,0.06)]">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = section.key === activeSection;

                return (
                  <Link
                    key={section.key}
                    href={`/dashboard/merchant/settings?section=${section.key}` as Route}
                    className={`flex items-center gap-3 rounded-[20px] px-4 py-3 text-sm font-medium transition ${
                      isActive ? 'bg-[#f3e7d7] text-[#2c231c]' : 'text-[#7d6852] hover:bg-[#f8f1e7]'
                    }`}
                  >
                    <Icon weight="BoldDuotone" className="h-4 w-4" />
                    <span>{section.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="rounded-[30px] border border-[#ddcdb9] bg-[#fffaf4] p-6 shadow-[0_16px_40px_rgba(77,54,31,0.06)]">
            {activeSection === 'profile' ? (
              <div className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
                <div className="grid gap-4">
                  <label className="grid gap-2 text-sm text-[#7d6852]">
                    Store name
                    <input className="input" defaultValue={mockMerchantProfile.storeName} />
                  </label>
                  <label className="grid gap-2 text-sm text-[#7d6852]">
                    Owner
                    <input className="input" defaultValue={mockMerchantProfile.ownerName} />
                  </label>
                  <label className="grid gap-2 text-sm text-[#7d6852]">
                    Category
                    <input className="input" defaultValue={mockMerchantProfile.storeCategory} />
                  </label>
                  <label className="grid gap-2 text-sm text-[#7d6852]">
                    Settlement currency
                    <select className="input" defaultValue={mockMerchantProfile.settlementCurrency}>
                      <option value="NGN">NGN</option>
                      <option value="KES">KES</option>
                      <option value="USDT">USDT</option>
                    </select>
                  </label>

                  <div className="rounded-[24px] border border-dashed border-[#d7c3ad] bg-[#f7efe4] p-5">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-white p-3">
                        <Upload weight="BoldDuotone" className="h-5 w-5 text-[#7d6852]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#3b2d21]">Receipt logo</p>
                        <p className="mt-2 text-sm leading-7 text-[#6e5a46]">
                          Upload a square logo here so every receipt preview and printed receipt keeps the store brand visible.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button type="button" className="btn-primary rounded-full py-3">Save profile</button>
                </div>

                <div className="rounded-[30px] border border-[#ddcdb9] bg-[linear-gradient(180deg,_#f8f1e7,_#f3e7d7)] p-6 shadow-[0_16px_40px_rgba(77,54,31,0.06)]">
                  <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Receipt preview</p>
                  <div className="mt-5 rounded-[28px] border border-[#eadbc9] bg-[#fffdf9] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-serif text-xl font-semibold text-[#2c231c]">{mockMerchantProfile.storeName}</p>
                        <p className="mt-1 text-sm text-[#8d735b]">{mockMerchantProfile.storeCategory}</p>
                      </div>
                      <div className="rounded-full border border-[#d7c3ad] bg-[#f8f1e7] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9b8468]">
                        Logo area
                      </div>
                    </div>
                    <div className="mt-5 rounded-[24px] border border-[#eadbc9] bg-[#f8f1e7] p-4 text-sm leading-7 text-[#6e5a46]">
                      The uploaded logo appears at the top of generated receipts and matches the merchant checkout experience.
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeSection === 'inventory' ? (
              <InventoryManager initialItems={mockInventory} />
            ) : null}

            {activeSection === 'checkout' ? (
              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-4">
                  <div>
                    <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Checkout</p>
                    <h2 className="mt-3 text-2xl font-semibold">Fixed QR payment flow</h2>
                    <p className="mt-3 text-sm leading-7 text-[#6e5a46]">
                      This QR code always points to the same checkout page. Sellers only need to generate a numeric transaction ID for each receipt.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#eadbc9] bg-[#f8f1e7] px-4 py-4 text-sm text-[#4d3a2c]">
                    {mockMerchantProfile.fixedCheckoutPath}
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#eadbc9] bg-[#fffdf9] p-5">
                  <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Store QR code</p>
                  <div className="mx-auto mt-4 rounded-[28px] border border-[#eadbc9] bg-white p-3">
                    <div className="qr-code-markup" dangerouslySetInnerHTML={{ __html: qrSvgMarkup }} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
