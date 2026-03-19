'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { UserType } from '@/types';
import { OnboardingTypeSelector } from '@/components/shared/OnboardingTypeSelector';

export default function SignupPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType | null>(null);

  return (
    <main className="mx-auto max-w-3xl p-8 space-y-6">
      <h1 className="text-3xl font-bold">Create your AnyPay account</h1>
      <div className="card grid gap-3">
        <input className="input" placeholder="Name" />
        <input className="input" placeholder="Email" type="email" />
        <input className="input" placeholder="Password" type="password" />
      </div>
      <h2 className="text-xl">How will you use AnyPay?</h2>
      <OnboardingTypeSelector selected={userType} onSelect={setUserType} />
      <button
        className="btn-primary"
        type="button"
        disabled={!userType}
        onClick={() => router.push(userType === 'developer' ? '/dashboard/dev' : '/dashboard/merchant')}
      >
        Continue
      </button>
    </main>
  );
}
