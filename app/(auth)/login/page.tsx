'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LockPassword, Letter, Login2 } from '@solar-icons/react';
import { useStore } from '@/lib/store/useStore';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((state) => state.login);
  const [email, setEmail] = useState('merchant@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, we use the name from the email prefix or "Merchant"
    const name = email.split('@')[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    login(email, capitalizedName);
    router.push('/dashboard/merchant');
  };

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10 flex items-center justify-center">
      <section className="w-full max-w-md rounded-[32px] border border-[#ddcdb9] bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.14),_transparent_28%),linear-gradient(180deg,_#fbf4ea,_#f4e8d8)] p-8 shadow-[0_24px_60px_rgba(77,54,31,0.08)]">
        <div className="space-y-3 mb-8 text-center">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#9b8468]">Welcome back</p>
          <h1 className="text-4xl font-semibold leading-tight text-zinc-900">Log in to Flux.</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button type="button" className="text-sm font-medium text-[#9b8468] hover:text-zinc-900 transition-colors">
              Forgot password?
            </button>
          </div>

          <button
            className="btn-primary w-full rounded-full py-4 flex items-center justify-center gap-2 group transition-all"
            type="submit"
          >
            <span className="text-lg">Log in</span>
            <Login2 weight="BoldDuotone" className="size-5 opacity-50 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-[#6e5a46]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-zinc-900 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
