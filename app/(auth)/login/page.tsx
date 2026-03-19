'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setError(null);
    router.push('/dashboard/merchant');
  };

  return (
    <main className="mx-auto max-w-md space-y-4 p-8">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button className="btn-primary" type="submit">Sign in</button>
      </form>
    </main>
  );
}
