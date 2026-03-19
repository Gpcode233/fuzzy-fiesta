import { NextResponse } from 'next/server';
import { executeTransfer } from '@/lib/busha';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<{ quoteId: string }>;

    if (!body.quoteId) {
      return NextResponse.json({ error: 'quoteId is required' }, { status: 400 });
    }

    const transfer = await executeTransfer(body.quoteId);
    return NextResponse.json(transfer);
  } catch {
    return NextResponse.json({ error: 'Unable to execute transfer' }, { status: 500 });
  }
}
