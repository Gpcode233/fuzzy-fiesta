'use client';

import { useState } from 'react';

const createDemoApiKey = () => `sk_demo_${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`;

const maskKey = (key: string) => `${key.slice(0, 7)}••••••••${key.slice(-4)}`;

export function ApiKeyCard() {
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_DEMO_API_KEY ?? createDemoApiKey());
  const [message, setMessage] = useState<string | null>(null);

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setMessage('API key copied.');
    } catch {
      setMessage('Could not copy API key.');
    }
  };

  const rotateKey = () => {
    const nextKey = createDemoApiKey();
    setApiKey(nextKey);
    setMessage('API key rotated. Previous key revoked in demo state.');
  };

  const createNewKey = () => {
    const nextKey = createDemoApiKey();
    setApiKey(nextKey);
    setMessage('New API key created for this developer workspace.');
  };

  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-zinc-400">API Access</p>
          <h3 className="mt-3 font-serif text-2xl font-semibold text-zinc-900">Developer keys</h3>
          <p className="mt-2 max-w-md text-sm text-zinc-500">Create, rotate, and copy your current integration key without leaving the dashboard.</p>
        </div>
        <button className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:bg-accent-dark shadow-md shadow-accent/20" onClick={createNewKey} type="button">
          Create New API Key
        </button>
      </div>

      <div className="mt-6 rounded-3xl border border-zinc-100 bg-zinc-50 p-5">
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-zinc-400">Current key</p>
        <p className="mt-3 font-mono text-lg text-zinc-900">{maskKey(apiKey)}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-600 transition hover:bg-white hover:shadow-sm" onClick={copyKey} type="button">
            Copy key
          </button>
          <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-600 transition hover:bg-white hover:shadow-sm" onClick={rotateKey} type="button">
            Rotate key
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Environment</p>
          <p className="mt-2 text-base font-medium text-zinc-900">Sandbox</p>
        </div>
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Permissions</p>
          <p className="mt-2 text-base font-medium text-zinc-900">Quotes, transfers, webhooks</p>
        </div>
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Status</p>
          <p className="mt-2 text-base font-medium text-accent-dark">Active</p>
        </div>
      </div>

      {message ? <p className="mt-4 text-sm text-zinc-500">{message}</p> : null}
    </section>
  );
}
