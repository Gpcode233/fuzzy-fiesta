import type { PaymentReceipt } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const money = new Intl.NumberFormat('en-NG');

export function ReceiptTable({ receipts }: { receipts: PaymentReceipt[] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#eadbc9] bg-[#fffdf9]">
      <Table>
        <TableHeader>
          <TableRow className="border-[#eadbc9] hover:bg-transparent">
            <TableHead className="px-4 py-4 font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Transaction ID</TableHead>
            <TableHead className="px-4 py-4 font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Customer</TableHead>
            <TableHead className="px-4 py-4 text-right font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Items</TableHead>
            <TableHead className="px-4 py-4 text-right font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Total</TableHead>
            <TableHead className="px-4 py-4 text-right font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receipts.map((receipt) => (
            <TableRow key={receipt.id} className="border-[#eadbc9] hover:bg-[#f8f1e7]/70">
              <TableCell className="px-4 py-4 font-medium text-[#2c231c]">{receipt.transactionId}</TableCell>
              <TableCell className="px-4 py-4 text-[#6e5a46]">{receipt.customerLabel}</TableCell>
              <TableCell className="px-4 py-4 text-right text-[#6e5a46]">{receipt.items.length}</TableCell>
              <TableCell className="px-4 py-4 text-right font-medium text-[#2c231c]">N{money.format(receipt.subtotal)}</TableCell>
              <TableCell className="px-4 py-4 text-right">
                <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] ${receipt.status === 'paid' ? 'bg-[#dff3e6] text-[#2f6b46]' : 'bg-[#f5e6cc] text-[#8a6330]'}`}>
                  {receipt.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
