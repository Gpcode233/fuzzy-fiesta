import type { Transaction } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#eadbc9] bg-[#fffdf9]">
      <Table>
        <TableHeader>
          <TableRow className="border-[#eadbc9] hover:bg-transparent">
            <TableHead className="px-4 py-4 font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Transaction ID</TableHead>
            <TableHead className="px-4 py-4 font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Payer</TableHead>
            <TableHead className="px-4 py-4 font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Settlement</TableHead>
            <TableHead className="px-4 py-4 text-right font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id} className="border-[#eadbc9] hover:bg-[#f8f1e7]/70">
              <TableCell className="px-4 py-4 font-medium text-[#2c231c]">{txn.transactionId ?? txn.id}</TableCell>
              <TableCell className="px-4 py-4 text-[#6e5a46]">{txn.payerAmount} {txn.payerCurrency}</TableCell>
              <TableCell className="px-4 py-4 text-[#6e5a46]">{txn.settlementAmount} {txn.settlementCurrency}</TableCell>
              <TableCell className={`px-4 py-4 text-right font-medium capitalize ${txn.status === 'completed' ? 'text-[#2f6b46]' : 'text-[#8a6330]'}`}>
                {txn.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
