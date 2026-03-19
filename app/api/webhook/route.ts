import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

function isValidSignature(rawBody: string, signature: string | null) {
  const secret = process.env.BUSHA_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  const expectedBuf = Buffer.from(expected, 'utf8');
  const sigBuf = Buffer.from(signature, 'utf8');
  if (expectedBuf.length !== sigBuf.length) return false;
  return timingSafeEqual(expectedBuf, sigBuf);
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-bu-signature');

  if (!isValidSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as { type?: string };
  return NextResponse.json({ received: true, type: event.type ?? 'unknown' });
}
