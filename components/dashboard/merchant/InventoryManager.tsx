'use client';

import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { InventoryItem } from '@/types';
import { InventoryTable } from './InventoryTable';

type DraftItem = {
  name: string;
  category: string;
  price: string;
  stock: string;
};

const emptyDraft: DraftItem = {
  name: '',
  category: '',
  price: '',
  stock: ''
};

const makeSku = (name: string, index: number) => {
  const base = name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 8);

  return `LS-${base || 'ITEM'}-${String(index).padStart(2, '0')}`;
};

export function InventoryManager({ initialItems }: { initialItems: InventoryItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<DraftItem>(emptyDraft);

  const lowStockItems = useMemo(() => items.filter((item) => item.stock < 12).length, [items]);

  const addItem = () => {
    if (!draft.name.trim() || !draft.category.trim() || !draft.price.trim() || !draft.stock.trim()) {
      return;
    }

    const nextIndex = items.length + 1;
    const nextItem: InventoryItem = {
      id: `itm-${nextIndex}`,
      name: draft.name.trim(),
      category: draft.category.trim(),
      price: Number(draft.price) || 0,
      stock: Number(draft.stock) || 0,
      sku: makeSku(draft.name, nextIndex)
    };

    setItems((current) => [...current, nextItem]);
    setDraft(emptyDraft);
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Inventory</p>
          <h2 className="mt-3 text-2xl font-semibold">Products in store</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowForm((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full bg-[#2d241c] px-5 py-3 text-sm font-semibold text-[#f8f1e7] transition hover:bg-[#1f1914]"
          >
            <Plus className="h-4 w-4" />
            Add item
          </button>
          <div className="rounded-full border border-[#d7c3ad] bg-[#f7efe4] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9b8468]">
            {lowStockItems} low stock
          </div>
        </div>
      </div>

      {showForm ? (
        <div className="grid gap-4 rounded-[24px] border border-[#eadbc9] bg-[#f8f1e7] p-4 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_140px_120px_auto] xl:items-end">
          <label className="grid gap-2 text-sm text-[#7d6852]">
            Item name
            <input
              className="input"
              value={draft.name}
              onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              placeholder="Baby wipes"
            />
          </label>
          <label className="grid gap-2 text-sm text-[#7d6852]">
            Category
            <input
              className="input"
              value={draft.category}
              onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
              placeholder="Bath"
            />
          </label>
          <label className="grid gap-2 text-sm text-[#7d6852]">
            Price
            <input
              className="input"
              type="number"
              min={0}
              value={draft.price}
              onChange={(event) => setDraft((current) => ({ ...current, price: event.target.value }))}
              placeholder="5000"
            />
          </label>
          <label className="grid gap-2 text-sm text-[#7d6852]">
            Stock
            <input
              className="input"
              type="number"
              min={0}
              value={draft.stock}
              onChange={(event) => setDraft((current) => ({ ...current, stock: event.target.value }))}
              placeholder="12"
            />
          </label>
          <div className="flex gap-3 xl:justify-end">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-[#cfbba6] px-4 py-3 text-sm font-semibold text-[#4d3a2c] transition hover:bg-[#efe2d0]">
              Cancel
            </button>
            <button type="button" onClick={addItem} className="btn-primary rounded-full px-5 py-3">
              Save
            </button>
          </div>
        </div>
      ) : null}

      <InventoryTable items={items} />
    </div>
  );
}
