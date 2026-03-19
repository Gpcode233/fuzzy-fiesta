import type { Transaction } from '@/types';

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="text-white/70">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Payer</th>
            <th className="p-2 text-left">Settlement</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-t border-white/10">
              <td className="p-2">{txn.id}</td>
              <td className="p-2">{txn.payerAmount} {txn.payerCurrency}</td>
              <td className="p-2">{txn.settlementAmount} {txn.settlementCurrency}</td>
              <td className="p-2 capitalize">{txn.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
