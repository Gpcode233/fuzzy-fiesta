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
        className={`card text-left ${selected === 'developer' ? 'ring-2 ring-accent' : ''}`}
      >
        <p className="text-2xl">🧑‍💻</p>
        <h3 className="mt-2 text-xl font-bold">I&apos;m a developer</h3>
        <p className="text-sm text-white/70">I want API access, webhooks, and SDK integration.</p>
      </button>
      <button
        type="button"
        onClick={() => onSelect('merchant')}
        className={`card text-left ${selected === 'merchant' ? 'ring-2 ring-accent' : ''}`}
      >
        <p className="text-2xl">🏪</p>
        <h3 className="mt-2 text-xl font-bold">I run a store or business</h3>
        <p className="text-sm text-white/70">I want payment links with no coding required.</p>
      </button>
    </div>
  );
}
