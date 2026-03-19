export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md p-8 space-y-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <input className="input" type="email" placeholder="Email" />
      <input className="input" type="password" placeholder="Password" />
      <button className="btn-primary" type="button">Sign in</button>
    </main>
  );
}
