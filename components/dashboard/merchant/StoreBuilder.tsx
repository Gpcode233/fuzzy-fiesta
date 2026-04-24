'use client';

import { Plus, Search, ShoppingBag } from 'lucide-react';
import { useMemo, useState } from 'react';
import { mockInventory, mockMerchantProfile } from '@/lib/mockDb';
import type { InventoryItem, PaymentReceipt } from '@/types';

type BuilderRow = {
  id: string;
  query: string;
  itemId: string | null;
  quantity: number;
};

const naira = new Intl.NumberFormat('en-NG');

const makeTransactionId = () => String(Math.floor(100000 + Math.random() * 900000));

const findItem = (itemId: string | null) => mockInventory.find((item) => item.id === itemId) ?? null;

export function StoreBuilder() {
  const [rows, setRows] = useState<BuilderRow[]>([{ id: 'row-1', query: '', itemId: null, quantity: 1 }]);
  const [customerLabel, setCustomerLabel] = useState('Walk-in customer');
  const [generatedTransactionId, setGeneratedTransactionId] = useState<string | null>(null);

  const selectedItems = useMemo(() => rows
    .map((row) => {
      const item = findItem(row.itemId);
      if (!item) return null;

      return {
        ...row,
        item,
        total: item.price * row.quantity
      };
    })
    .filter(Boolean) as Array<BuilderRow & { item: InventoryItem; total: number }>, [rows]);

  const subtotal = selectedItems.reduce((sum, row) => sum + row.total, 0);

  const addRow = () => {
    setRows((current) => [...current, { id: `row-${current.length + 1}`, query: '', itemId: null, quantity: 1 }]);
  };

  const updateRow = (rowId: string, patch: Partial<BuilderRow>) => {
    setRows((current) => current.map((row) => (row.id === rowId ? { ...row, ...patch } : row)));
  };

  const removeRow = (rowId: string) => {
    setRows((current) => current.length === 1 ? current : current.filter((row) => row.id !== rowId));
  };

  const generateReceipt = () => {
    if (!selectedItems.length) return;
    const transactionId = makeTransactionId();
    const receipt: PaymentReceipt = {
      id: `receipt-${Date.now()}`,
      merchantId: mockMerchantProfile.id,
      transactionId,
      customerLabel: customerLabel.trim() || 'Walk-in customer',
      items: selectedItems.map((row) => ({
        inventoryItemId: row.item.id,
        name: row.item.name,
        unitPrice: row.item.price,
        quantity: row.quantity,
        total: row.total
      })),
      subtotal,
      settlementCurrency: mockMerchantProfile.settlementCurrency,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      const existing = window.localStorage.getItem('flux-generated-receipts');
      const parsed = existing ? JSON.parse(existing) as PaymentReceipt[] : [];
      window.localStorage.setItem('flux-generated-receipts', JSON.stringify([receipt, ...parsed]));
    }

    setGeneratedTransactionId(transactionId);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <div className="rounded-[30px] border border-[#ddcdb9] bg-[#fffaf4] p-5 shadow-[0_16px_40px_rgba(77,54,31,0.06)] md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Payment receipt builder</p>
            <h2 className="mt-3 text-2xl font-semibold">Add items from inventory and generate a transaction ID.</h2>
          </div>
          <button type="button" onClick={addRow} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9c7b2] bg-[#f7efe4] text-[#5d4835] transition hover:bg-[#f1e7da]">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="grid gap-2 text-sm text-[#7d6852]">
            Customer label
            <input className="input" value={customerLabel} onChange={(event) => setCustomerLabel(event.target.value)} placeholder="Walk-in customer" />
          </label>

          <div className="space-y-3">
            {rows.map((row) => {
              const item = findItem(row.itemId);
              const matches = mockInventory.filter((entry) => entry.name.toLowerCase().includes(row.query.toLowerCase())).slice(0, 5);

              return (
                <div key={row.id} className="rounded-[24px] border border-[#eadbc9] bg-[#f8f1e7] p-4">
                  <div className="grid gap-3 md:grid-cols-[1.4fr_140px_110px_72px] md:items-start">
                    <div className="space-y-2">
                      <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b8468]" />
                        <input
                          className="input pl-10"
                          value={row.query}
                          onChange={(event) => updateRow(row.id, { query: event.target.value, itemId: null })}
                          placeholder="Search inventory item"
                        />
                      </div>
                      {!item && row.query ? (
                        <div className="rounded-2xl border border-[#e2d0bb] bg-white p-2">
                          {matches.length ? matches.map((match) => (
                            <button
                              key={match.id}
                              type="button"
                              onClick={() => updateRow(row.id, { itemId: match.id, query: match.name })}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-[#5d4835] transition hover:bg-[#f8f1e7]"
                            >
                              <span>{match.name}</span>
                              <span className="text-[#9b8468]">N{naira.format(match.price)}</span>
                            </button>
                          )) : <p className="px-3 py-2 text-sm text-[#9b8468]">No inventory match.</p>}
                        </div>
                      ) : null}
                    </div>

                    <div className="rounded-2xl border border-[#e2d0bb] bg-white px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-[#9b8468]">Price</p>
                      <p className="mt-2 text-sm font-semibold text-[#3b2d21]">{item ? `N${naira.format(item.price)}` : 'Auto'}</p>
                    </div>

                    <label className="grid gap-2 text-sm text-[#7d6852]">
                      Qty
                      <input
                        className="input"
                        type="number"
                        min={1}
                        value={row.quantity}
                        onChange={(event) => updateRow(row.id, { quantity: Math.max(1, Number(event.target.value) || 1) })}
                      />
                    </label>

                    <button type="button" onClick={() => removeRow(row.id)} className="text-sm text-[#8f6f52] transition hover:text-[#5d4835]">
                      Remove
                    </button>
                  </div>

                  {item ? (
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#9b8468]">
                      <span>{item.category}</span>
                      <span>Stock {item.stock}</span>
                      <span>{item.sku}</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <button
            className="btn-primary w-full rounded-full py-3 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={generateReceipt}
            disabled={!selectedItems.length}
            type="button"
          >
            Generate receipt
          </button>

          {generatedTransactionId ? (
            <div className="rounded-[24px] border border-[#d7c3ad] bg-[#f7efe4] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#9b8468]">Transaction ID</p>
              <p className="mt-3 font-serif text-3xl font-semibold text-[#3b2d21]">{generatedTransactionId}</p>
              <p className="mt-3 text-sm leading-7 text-[#6e5a46]">
                Ask the customer to scan the store QR code and enter this ID on checkout. The fixed checkout page stays the same for every sale.
              </p>
              <p className="mt-2 text-sm text-[#8d735b]">{mockMerchantProfile.fixedCheckoutPath}?txn={generatedTransactionId}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-[30px] border border-[#ddcdb9] bg-[linear-gradient(180deg,_#f8f1e7,_#f3e7d7)] shadow-[0_16px_40px_rgba(77,54,31,0.06)]">
        <div className="border-b border-[#e3d2bf] px-5 py-5 md:px-6">
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Live preview</p>
          <h3 className="mt-3 text-2xl font-semibold">Receipt draft</h3>
        </div>

        <div className="space-y-6 px-5 py-6 md:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-serif text-xl font-semibold text-[#2c231c]">{mockMerchantProfile.storeName}</p>
              <p className="mt-1 text-sm text-[#7d6852]">{mockMerchantProfile.storeCategory}</p>
            </div>
            <div className="rounded-full border border-[#d8c7b2] bg-[#fffaf4] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9b8468]">
              Pending payment
            </div>
          </div>

          <div className="space-y-3 rounded-[28px] border border-[#eadbc9] bg-[#fffdf9] p-5">
            <div className="flex items-center justify-between text-sm text-[#8d735b]">
              <span>Customer</span>
              <span>{customerLabel || 'Walk-in customer'}</span>
            </div>
            <div className="h-px bg-[#efe1d0]" />
            {selectedItems.length ? selectedItems.map((row) => (
              <div key={row.id} className="flex items-start justify-between gap-4 text-sm text-[#4d3a2c]">
                <div>
                  <p className="font-medium">{row.item.name}</p>
                  <p className="text-[#8d735b]">{row.quantity} x N{naira.format(row.item.price)}</p>
                </div>
                <p className="font-semibold">N{naira.format(row.total)}</p>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-[#e4d4c1] bg-[#fcf7f1] px-4 py-8 text-center text-sm text-[#9b8468]">
                Pick items from inventory to build the receipt.
              </div>
            )}
            <div className="h-px bg-[#efe1d0]" />
            <div className="flex items-center justify-between font-serif text-xl font-semibold text-[#2c231c]">
              <span>Total</span>
              <span>N{subtotal ? naira.format(subtotal) : '0'}</span>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#eadbc9] bg-[#fffaf4] px-4 py-4 text-sm leading-7 text-[#6e5a46]">
            The seller hands the customer the transaction ID, the customer scans the fixed QR code, enters the ID, picks a currency, and pays.
          </div>

          <div className="flex items-center gap-3 text-[#9b8468]">
            <ShoppingBag className="h-5 w-5" />
            <p className="text-sm">Logo upload and receipt branding live in Settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
