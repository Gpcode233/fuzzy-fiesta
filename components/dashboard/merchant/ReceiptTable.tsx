import type { PaymentReceipt } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Receipt } from 'lucide-react';

const money = new Intl.NumberFormat('en-NG');

export function ReceiptTable({ receipts }: { receipts: PaymentReceipt[] }) {
  if (receipts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="size-12 rounded-full bg-[#f8f1e7] flex items-center justify-center mb-4">
          <Receipt className="size-6 text-[#9b8468] opacity-50" />
        </div>
        <h3 className="text-sm font-bold">No receipts found</h3>
        <p className="text-xs text-muted-foreground mt-1">Generate a receipt from the inventory to see it here.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-[#f3e6d6] hover:bg-transparent">
            <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-[#9b8468]">Transaction ID</TableHead>
            <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-[#9b8468]">Customer</TableHead>
            <TableHead className="px-6 py-4 text-center font-bold text-[10px] uppercase tracking-widest text-[#9b8468]">Items</TableHead>
            <TableHead className="px-6 py-4 text-right font-bold text-[10px] uppercase tracking-widest text-[#9b8468]">Total</TableHead>
            <TableHead className="px-6 py-4 text-right font-bold text-[10px] uppercase tracking-widest text-[#9b8468]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receipts.map((receipt) => (
            <TableRow key={receipt.id} className="border-[#f3e6d6] transition-colors hover:bg-[#fdfaf5]">
              <TableCell className="px-6 py-4 font-mono text-xs font-bold text-[#2c231c]">{receipt.transactionId}</TableCell>
              <TableCell className="px-6 py-4 text-sm text-[#4d3a2c] font-medium">{receipt.customerLabel}</TableCell>
              <TableCell className="px-6 py-4 text-center text-sm text-muted-foreground">{receipt.items.length}</TableCell>
              <TableCell className="px-6 py-4 text-right font-bold text-[#2c231c]">N{money.format(receipt.subtotal)}</TableCell>
              <TableCell className="px-6 py-4 text-right">
                <Badge className={receipt.status === 'paid' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none' : 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-none'}>
                  {receipt.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
