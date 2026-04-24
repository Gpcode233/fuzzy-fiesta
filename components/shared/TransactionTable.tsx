import type { Transaction } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftRight } from 'lucide-react';

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="size-12 rounded-full bg-[#f8f1e7] flex items-center justify-center mb-4">
          <ArrowLeftRight className="size-6 text-[#9b8468] opacity-50" />
        </div>
        <h3 className="text-sm font-bold">No transactions yet</h3>
        <p className="text-xs text-muted-foreground mt-1">Settlements will appear here once customers pay.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-[#f3e6d6] hover:bg-transparent">
            <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-[#9b8468]">Transaction ID</TableHead>
            <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-[#9b8468]">Payer Paid</TableHead>
            <TableHead className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-[#9b8468]">Settlement</TableHead>
            <TableHead className="px-6 py-4 text-right font-bold text-[10px] uppercase tracking-widest text-[#9b8468]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id} className="border-[#f3e6d6] transition-colors hover:bg-[#fdfaf5]">
              <TableCell className="px-6 py-4 font-mono text-xs font-bold text-[#2c231c]">{txn.transactionId ?? txn.id}</TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#4d3a2c]">{txn.payerAmount} {txn.payerCurrency}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">Rate: {txn.exchangeRate}</span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-sm font-bold text-[#2c231c]">
                {txn.settlementAmount} {txn.settlementCurrency}
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <Badge className={
                  txn.status === 'completed' 
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none' 
                    : txn.status === 'pending'
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-none'
                    : 'bg-red-100 text-red-700 hover:bg-red-100 border-none'
                }>
                  {txn.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
