import { NextResponse } from 'next/server';
import { executeTransfer } from '@/lib/busha';

export async function POST(req: Request) {
  const body = (await req.json()) as { quoteId: string };
  const transfer = await executeTransfer(body.quoteId);
  return NextResponse.json(transfer);
}
