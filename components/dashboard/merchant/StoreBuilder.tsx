'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import type { InventoryItem, PaymentReceipt } from '@/types';
import { 
  AddCircle, 
  SearchMagnifyingGlass, 
  Bag,
  Trash,
  ChevronDown,
  ArrowLeft,
  Check
} from '@solar-icons/react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type BuilderRow = {
  id: string;
  query: string;
  itemId: string | null;
  quantity: number;
};

const naira = new Intl.NumberFormat('en-NG');

const makeTransactionId = () => String(Math.floor(100000 + Math.random() * 900000));

export function StoreBuilder() {
  const { merchantProfile, inventory, addReceipt } = useStore();
  const [rows, setRows] = useState<BuilderRow[]>([{ id: 'row-1', query: '', itemId: null, quantity: 1 }]);
  const [customerLabel, setCustomerLabel] = useState('Walk-in customer');
  const [generatedTransactionId, setGeneratedTransactionId] = useState<string | null>(null);
  const [step, setStep] = useState<'build' | 'confirm'>('build');

  const findItem = (itemId: string | null) => inventory.find((item) => item.id === itemId) ?? null;

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
    .filter(Boolean) as Array<BuilderRow & { item: InventoryItem; total: number }>, [rows, inventory]);

  const subtotal = selectedItems.reduce((sum, row) => sum + row.total, 0);

  const addRow = () => {
    setRows((current) => [...current, { id: `row-${Date.now()}`, query: '', itemId: null, quantity: 1 }]);
  };

  const updateRow = (rowId: string, patch: Partial<BuilderRow>) => {
    setRows((current) => current.map((row) => (row.id === rowId ? { ...row, ...patch } : row)));
  };

  const removeRow = (rowId: string) => {
    setRows((current) => current.length === 1 ? current : current.filter((row) => row.id !== rowId));
  };

  const generateReceipt = () => {
    if (!selectedItems.length || !merchantProfile) return;
    const transactionId = makeTransactionId();
    const receipt: PaymentReceipt = {
      id: `receipt-${Date.now()}`,
      merchantId: merchantProfile.id,
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
      settlementCurrency: merchantProfile.settlementCurrency,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    addReceipt(receipt);
    setGeneratedTransactionId(transactionId);
    toast.success(`Receipt created with ID: ${transactionId}`);
    setStep('build'); // Reset or stay to show ID
  };

  if (!merchantProfile) return null;

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <Card className="rounded-[30px] border-[#eadbc9] bg-white shadow-sm overflow-hidden">
          <CardHeader className="bg-[#fdf8f3] border-b border-[#f3e6d6] flex flex-row items-center justify-between space-y-0 py-5">
            <div className="flex items-center gap-4">
              {step === 'confirm' && (
                <Button variant="ghost" size="icon" onClick={() => setStep('build')} className="rounded-full">
                  <ArrowLeft className="size-5" />
                </Button>
              )}
              <div>
                <CardTitle className="text-xl">
                  {step === 'build' ? 'Receipt Builder' : 'Confirm Receipt'}
                </CardTitle>
                <CardDescription>
                  {step === 'build' ? 'Assemble customer orders from your catalog.' : 'Review the details before generating the ID.'}
                </CardDescription>
              </div>
            </div>
            {step === 'build' && (
              <Button onClick={addRow} variant="outline" className="rounded-full h-10 w-10 p-0 border-[#d7c3ad] bg-[#f8f1e7] text-[#9b8468]">
                <AddCircle weight="BoldDuotone" className="h-6 w-6" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-6">
            {step === 'build' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">Customer Name / Label</Label>
                  <Input 
                    className="rounded-xl border-[#eadbc9] h-12"
                    value={customerLabel} 
                    onChange={(event) => setCustomerLabel(event.target.value)} 
                    placeholder="Walk-in customer" 
                  />
                </div>

                <div className="space-y-4">
                  {rows.map((row) => {
                    const item = findItem(row.itemId);
                    const matches = inventory.filter((entry) => 
                      entry.name.toLowerCase().includes(row.query.toLowerCase()) && 
                      !rows.some(r => r.itemId === entry.id && r.id !== row.id)
                    ).slice(0, 5);

                    return (
                      <div key={row.id} className="group relative rounded-[24px] border border-[#eadbc9] bg-[#fdfaf5] p-5 transition-all hover:shadow-md">
                        <div className="grid gap-4 md:grid-cols-[1fr_auto_100px_auto] md:items-end">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-[0.2em] text-[#9b8468]">Item Search</Label>
                            <div className="relative">
                              <SearchMagnifyingGlass weight="BoldDuotone" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b8468] opacity-60" />
                              <Input
                                className="rounded-xl pl-10 h-11 bg-white border-[#eadbc9]"
                                value={row.query}
                                onChange={(event) => updateRow(row.id, { query: event.target.value, itemId: null })}
                                placeholder="Type item name..."
                              />
                            </div>
                            {!item && row.query ? (
                              <div className="absolute z-10 w-full max-w-[300px] mt-1 rounded-2xl border border-[#eadbc9] bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2">
                                {matches.length ? matches.map((match) => (
                                  <button
                                    key={match.id}
                                    type="button"
                                    onClick={() => updateRow(row.id, { itemId: match.id, query: match.name })}
                                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-[#5d4835] transition hover:bg-[#f8f1e7]"
                                  >
                                    <span className="font-medium">{match.name}</span>
                                    <span className="text-[#9b8468] font-bold">N{naira.format(match.price)}</span>
                                  </button>
                                )) : <p className="px-3 py-2 text-sm text-[#9b8468]">No inventory match.</p>}
                              </div>
                            ) : null}
                          </div>

                          <div className="h-11 flex flex-col justify-center px-4 rounded-xl border border-[#eadbc9] bg-white min-w-[120px]">
                            <p className="text-[9px] uppercase tracking-widest text-[#9b8468]">Unit Price</p>
                            <p className="text-sm font-bold text-[#3b2d21]">{item ? `N${naira.format(item.price)}` : '—'}</p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-[0.2em] text-[#9b8468]">Qty</Label>
                            <Input
                              className="rounded-xl h-11 bg-white border-[#eadbc9] text-center"
                              type="number"
                              min={1}
                              value={row.quantity}
                              onChange={(event) => updateRow(row.id, { quantity: Math.max(1, Number(event.target.value) || 1) })}
                            />
                          </div>

                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeRow(row.id)}
                            className="text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>

                        {item && (
                          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[#f3e6d6] pt-3">
                            <Badge variant="outline" className="rounded-full bg-white text-[9px] uppercase tracking-wider">{item.category}</Badge>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">SKU: {item.sku}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest ml-auto">Stock: <span className={item.stock < 10 ? 'text-amber-600 font-bold' : ''}>{item.stock}</span></span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Button
                  className="w-full rounded-full py-6 text-lg bg-[#facc15] text-black hover:bg-[#eab308] shadow-lg shadow-yellow-500/10"
                  onClick={() => setStep('confirm')}
                  disabled={!selectedItems.length}
                >
                  Confirm Items
                </Button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="bg-[#fdf8f3] rounded-2xl p-6 border border-[#eadbc9] space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-[#eadbc9]">
                    <span className="text-sm text-muted-foreground uppercase">Customer</span>
                    <span className="font-bold">{customerLabel}</span>
                  </div>
                  <div className="space-y-3">
                    {selectedItems.map((row) => (
                      <div key={row.id} className="flex justify-between text-sm">
                        <span>{row.item.name} <span className="text-muted-foreground">x {row.quantity}</span></span>
                        <span className="font-bold">N{naira.format(row.total)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-[#eadbc9] flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-black">N{naira.format(subtotal)}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 rounded-full py-6"
                    onClick={() => setStep('build')}
                  >
                    <ArrowLeft className="mr-2 size-4" />
                    Back
                  </Button>
                  <Button
                    className="flex-[2] rounded-full py-6 bg-black text-white hover:bg-zinc-800"
                    onClick={generateReceipt}
                  >
                    <Check className="mr-2 size-4" />
                    Confirm & Generate ID
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {generatedTransactionId && step === 'build' && (
          <Card className="rounded-[30px] border-[#d7c3ad] bg-[#fdf8f3] border-2 animate-in zoom-in-95 duration-300">
            <CardContent className="p-6 text-center space-y-4">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none uppercase tracking-widest px-4 py-1">Ready for checkout</Badge>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Transaction ID</p>
                <h3 className="text-5xl font-black tracking-tighter text-[#3b2d21]">{generatedTransactionId}</h3>
              </div>
              <p className="text-sm text-[#6e5a46] max-w-sm mx-auto leading-relaxed">
                Give this ID to the customer. They can scan your store QR and enter this ID to complete payment.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Button variant="outline" className="rounded-full px-6" onClick={() => window.open(`${merchantProfile.fixedCheckoutPath}?txn=${generatedTransactionId}`, '_blank')}>
                  Test Checkout
                </Button>
                <Button className="rounded-full px-6" onClick={() => { setGeneratedTransactionId(null); setRows([{ id: 'row-1', query: '', itemId: null, quantity: 1 }]); }}>
                  Create New
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card className="rounded-[30px] border-[#eadbc9] bg-[linear-gradient(180deg,_#fdfaf5,_#f8f1e7)] shadow-sm overflow-hidden sticky top-24">
          <CardHeader className="bg-white/50 backdrop-blur-sm border-b border-[#f3e6d6] py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Live Preview</CardTitle>
              <Badge variant="outline" className="rounded-full bg-white text-amber-600 border-amber-200">
                {step === 'build' ? 'Draft Receipt' : 'Awaiting Confirmation'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-bold text-[#2c231c]">{merchantProfile.storeName}</h4>
                <p className="text-sm text-[#7d6852]">{merchantProfile.storeCategory}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-white border border-[#eadbc9] flex items-center justify-center font-bold text-lg shadow-sm">
                {merchantProfile.storeName[0]}
              </div>
            </div>

            <div className="space-y-4 rounded-[24px] border border-[#eadbc9] bg-white p-5 shadow-inner">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#9b8468]">
                <span>Customer</span>
                <span className="font-bold">{customerLabel || 'Walk-in'}</span>
              </div>
              <div className="h-px bg-[#f3e6d6]" />
              
              <div className="space-y-4 min-h-[100px]">
                {selectedItems.length ? selectedItems.map((row) => (
                  <div key={row.id} className="flex items-start justify-between gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="font-bold text-[#4d3a2c]">{row.item.name}</p>
                      <p className="text-xs text-[#8d735b]">{row.quantity} x N{naira.format(row.item.price)}</p>
                    </div>
                    <p className="font-bold text-[#2c231c]">N{naira.format(row.total)}</p>
                  </div>
                )) : (
                  <div className="h-24 flex flex-col items-center justify-center border border-dashed border-[#eadbc9] rounded-2xl bg-[#fdfdfd] text-[#9b8468]">
                    <Bag className="h-6 w-6 mb-2 opacity-20" />
                    <p className="text-xs">No items added yet</p>
                  </div>
                )}
              </div>

              <div className="h-px bg-[#f3e6d6]" />
              <div className="flex items-center justify-between font-serif text-2xl font-bold text-[#2c231c] pt-2">
                <span>Total</span>
                <span>N{subtotal ? naira.format(subtotal) : '0'}</span>
              </div>
            </div>

            <div className="rounded-[20px] bg-[#fdf8f3] border border-[#f3e6d6] p-4 flex gap-3">
              <div className="size-8 rounded-full bg-white border border-[#eadbc9] flex items-center justify-center shrink-0 shadow-sm">
                <ChevronDown className="h-4 w-4 text-[#9b8468]" />
              </div>
              <p className="text-[11px] leading-relaxed text-[#6e5a46]">
                This receipt will be saved as <span className="font-bold">DRAFT</span>. Customer payment will update it to <span className="font-bold text-emerald-600">PAID</span> automatically.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
