'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LockPassword, ArrowRight, Login2, Letter, User } from '@solar-icons/react';
import { useStore } from '@/lib/store/useStore';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const signup = useStore((state) => state.signup);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(email, name, 'merchant');
    router.push('/onboarding');
  };

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10 flex items-center justify-center">
      <section className="w-full max-w-md rounded-[32px] border border-[#ddcdb9] bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.14),_transparent_28%),linear-gradient(180deg,_#fbf4ea,_#f4e8d8)] p-8 shadow-[0_24px_60px_rgba(77,54,31,0.08)]">
        <div className="space-y-3 mb-8 text-center">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#9b8468]">Start your journey</p>
          <h1 className="text-4xl font-semibold leading-tight text-zinc-900">Join Flux today.</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <User weight="BoldDuotone" className="size-5 text-[#9b8468] opacity-70" />
              </div>
              <input
                className="input pl-12 h-14"
                placeholder="Full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Letter weight="BoldDuotone" className="size-5 text-[#9b8468] opacity-70" />
              </div>
              <input
                className="input pl-12 h-14"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <LockPassword weight="BoldDuotone" className="size-5 text-[#9b8468] opacity-70" />
              </div>
              <input
                className="input pl-12 h-14"
                placeholder="Create password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <p className="text-xs text-[#6e5a46] leading-relaxed">
            By signing up, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
          </p>

          <button
            className="btn-primary w-full rounded-full py-4 flex items-center justify-center gap-2 group transition-all"
            type="submit"
          >
            <span className="text-lg">Create account</span>
            <Login2 weight="BoldDuotone" className="size-5 opacity-50 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-[#6e5a46]">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-zinc-900 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
