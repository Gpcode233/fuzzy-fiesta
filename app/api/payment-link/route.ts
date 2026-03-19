import { NextResponse } from 'next/server';
import { mockPaymentLinks } from '@/lib/mockDb';

export async function GET() {
  return NextResponse.json(mockPaymentLinks);
}

export async function POST(req: Request) {
  const body = (await req.json()) as { title: string; amount: number; currency: string };
  const id = body.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
  const link = {
    id,
    userId: 'merchant-1',
    title: body.title,
    description: 'Generated via builder',
    amount: body.amount,
    currency: body.currency,
    acceptedCurrencies: ['BTC', 'ETH', 'USDT', 'NGN'],
    settlementCurrency: 'NGN',
    status: 'active' as const,
    totalReceived: 0,
    transactionCount: 0,
    createdAt: new Date().toISOString()
  };
  mockPaymentLinks.push(link);
  return NextResponse.json(link, { status: 201 });
}
