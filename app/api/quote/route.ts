import { NextResponse } from 'next/server';
import { createQuote } from '@/lib/busha';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<{
      source_currency: string;
      target_currency: string;
      target_amount: string;
      source_amount: string;
    }>;

    if (!body.source_currency || !body.target_currency) {
      return NextResponse.json({ error: 'source_currency and target_currency are required' }, { status: 400 });
    }

    const quote = await createQuote(body);
    return NextResponse.json(quote);
  } catch {
    return NextResponse.json({ error: 'Unable to create quote' }, { status: 500 });
  }
}
