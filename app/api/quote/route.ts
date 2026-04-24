import { NextResponse } from 'next/server';
import { createQuote } from '@/lib/busha';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      source_currency: string;
      target_currency: string;
      target_amount?: string;
      source_amount?: string;
    };

    const quote = await createQuote(body);
    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to get quote' },
      { status: 500 }
    );
  }
}
