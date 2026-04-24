'use client';

import type { UserType } from '@/types';

interface Props {
  selected: UserType | null;
  onSelect: (value: UserType) => void;
}

export function OnboardingTypeSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <button
        type="button"
        onClick={() => onSelect('developer')}
        className={`card text-left transition-all hover:border-accent ${selected === 'developer' ? 'ring-2 ring-accent border-accent' : ''}`}
      >
        <h3 className="text-xl font-serif font-medium text-zinc-900">I&apos;m a developer</h3>
        <p className="mt-2 text-sm text-zinc-500">API keys, webhooks, and integration tools.</p>
      </button>
      <button
        type="button"
        onClick={() => onSelect('merchant')}
        className={`card text-left transition-all hover:border-accent ${selected === 'merchant' ? 'ring-2 ring-accent border-accent' : ''}`}
      >
        <h3 className="text-xl font-serif font-medium text-zinc-900">I run a store or business</h3>
        <p className="mt-2 text-sm text-zinc-500">Inventory, receipts, and QR payments without code.</p>
      </button>
    </div>
  );
}
