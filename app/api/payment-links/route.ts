import { NextResponse } from 'next/server';
import { createPaymentLink, listPaymentLinks } from '@/lib/busha';
import type { PaymentLinkPayload } from '@/types';

export async function GET() {
  try {
    const data = await listPaymentLinks();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PaymentLinkPayload;
    const data = await createPaymentLink(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
