'use client';

import { useState } from 'react';

export function StoreBuilder() {
  const [title, setTitle] = useState('Lavender Perfume Store');
  const [amount, setAmount] = useState('50000');
  const [createdUrl, setCreatedUrl] = useState('');

  const submit = async () => {
    const res = await fetch('/api/payment-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, amount: Number(amount), currency: 'NGN' })
    });
    const data = await res.json();
    setCreatedUrl(`${window.location.origin}/pay/${data.id}`);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card space-y-3">
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Store name" />
        <input className="input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
        <button className="btn-primary" onClick={submit} type="button">Generate Link</button>
        {createdUrl && <p className="text-sm text-accent">{createdUrl}</p>}
      </div>
      <div className="card">
        <h4 className="font-semibold">Live Preview</h4>
        <p>{title}</p>
        <p className="text-white/70">{amount} NGN</p>
      </div>
    </div>
  );
}
