'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { UserType } from '@/types';
import { OnboardingTypeSelector } from '@/components/shared/OnboardingTypeSelector';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'type'>('form');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const proceed = () => {
    if (!name || !email) return;
    setStep('type');
  };

  const finish = () => {
    if (!userType) return;
    localStorage.setItem('anypay.userType', userType);
    router.push(userType === 'developer' ? '/dashboard/dev' : '/dashboard/merchant');
  };

  if (step === 'type') {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">How will you use AnyPay?</h1>
          <p className="mt-2 text-white/70">Pick the workspace that fits your flow. You can switch later.</p>
        </div>
        <OnboardingTypeSelector selected={userType} onSelect={setUserType} />
        <div className="mt-8">
          <button className="btn-primary" type="button" disabled={!userType} onClick={finish}>Continue</button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl space-y-6 p-8">
      <h1 className="text-3xl font-bold">Create your AnyPay account</h1>
      <div className="card grid gap-3">
        <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" />
        <button className="btn-primary mt-2" type="button" onClick={proceed}>Continue</button>
      </div>
    </main>
  );
}
