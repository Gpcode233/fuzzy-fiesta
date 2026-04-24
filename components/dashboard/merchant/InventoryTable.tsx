import type { InventoryItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const money = new Intl.NumberFormat('en-NG');

export function InventoryTable({ items }: { items: InventoryItem[] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#eadbc9] bg-[#fffdf9]">
      <Table>
        <TableHeader>
          <TableRow className="border-[#eadbc9] hover:bg-transparent">
            <TableHead className="px-4 py-4 font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Item</TableHead>
            <TableHead className="px-4 py-4 font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Category</TableHead>
            <TableHead className="px-4 py-4 text-right font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Price</TableHead>
            <TableHead className="px-4 py-4 text-right font-serif text-[11px] uppercase tracking-[0.28em] text-[#9b8468]">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="border-[#eadbc9] hover:bg-[#f8f1e7]/70">
              <TableCell className="px-4 py-4 align-top">
                <div>
                  <p className="font-medium text-[#2c231c]">{item.name}</p>
                  <p className="mt-1 text-sm text-[#8d735b]">{item.sku}</p>
                </div>
              </TableCell>
              <TableCell className="px-4 py-4 text-[#6e5a46]">{item.category}</TableCell>
              <TableCell className="px-4 py-4 text-right font-medium text-[#2c231c]">N{money.format(item.price)}</TableCell>
              <TableCell className={`px-4 py-4 text-right font-medium ${item.stock < 12 ? 'text-[#9a5a2d]' : 'text-[#2c231c]'}`}>
                {item.stock}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
