import Link from 'next/link';
import FeaturesSection  from 'components/features-5';
import HeroSection from 'components/hero-section-one';
 
const businessFeatures = [
  {
    title: 'Fixed store QR',
    body: 'One checkout code for the whole shop. Generate a new receipt without changing the QR on the counter.'
  },
  {
    title: 'Inventory-backed receipts',
    body: 'Pull items from stock, keep prices locked, and issue a clean transaction ID for each sale.'
  },
  {
    title: 'Poster-ready checkout',
    body: 'Print or share a branded payment poster so in-store checkout stays fast.'
  }
];

const developerFeatures = [
  {
    title: 'Keys and webhooks',
    body: 'Give teams a clean path into Busha-powered payment and settlement workflows.'
  },
  {
    title: 'Shared product surface',
    body: 'Developers and business teams work inside the same product without stepping on each other.'
  },
  {
    title: 'Cross-border rails',
    body: 'Accept multiple currencies while the merchant still settles in the one they chose.'
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden px-4 py-5 text-zinc-900 md:px-6 md:py-8">
      <section className="mx-auto max-w-7xl rounded-[34px] border border-[#dcc9b2] bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(193,126,63,0.12),_transparent_28%),linear-gradient(180deg,_#fcf6ed,_#f0e2d0)] px-6 py-6 shadow-[0_28px_60px_rgba(77,54,31,0.08)] md:px-10 md:py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eadbc9] pb-6">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-lg font-bold text-black shadow-sm">F</div>
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.45em] text-[#8d735b]">Flux</p>
              <p className="text-sm text-[#7d6852]">Cross-border checkout for merchants and their product teams</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="btn-primary rounded-full px-6 py-3">Get started</Link>
            <Link href="/dashboard/merchant" className="rounded-full border border-[#cfbba6] px-6 py-3 text-sm font-semibold text-[#4d3a2c] transition hover:bg-[#f7efe4]">
              View merchant flow
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="font-serif text-xs uppercase tracking-[0.45em] text-accent-dark">Store checkout</p>
              <h1 className="max-w-4xl text-[clamp(3rem,7vw,6rem)] font-medium leading-[0.92]">
                Receipts, QR checkout, and settlement in one flow.
              </h1>
              <p className="max-w-xl text-base leading-7 text-[#6e5a46] md:text-lg">
                Flux gives merchants a fixed QR for the store and gives developers the rails behind it.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/signup" className="rounded-full bg-[#2d241c] px-7 py-4 text-sm font-semibold text-[#f8f1e7] transition hover:bg-[#1f1914]">
                Create account
              </Link>
              <Link href="/dashboard/dev" className="rounded-full border border-[#cfbba6] px-7 py-4 text-sm font-semibold text-[#4d3a2c] transition hover:bg-[#f7efe4]">
                Open developer console
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 hidden h-32 w-32 rounded-full bg-accent/20 blur-3xl lg:block" />
            <div className="grid gap-4">
              <div className="rounded-[30px] border border-[#e3d2bf] bg-[#fffaf3] p-5 shadow-[0_18px_36px_rgba(77,54,31,0.06)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Business side</p>
                    <h2 className="mt-3 text-2xl font-semibold">One QR on the counter.</h2>
                  </div>
                  <div className="rounded-full border border-[#d8c7b2] bg-[#f7efe4] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#8d735b]">
                    Merchant
                  </div>
                </div>
                <div className="mt-5 rounded-[24px] border border-[#eadbc9] bg-[#f5ecdf] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#9b8468]">Store</p>
                      <p className="mt-2 font-serif text-xl font-medium text-zinc-900">Little Sprout</p>
                    </div>
                    <p className="rounded-full border border-[#ddcdb9] bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#8d735b]">482917</p>
                  </div>
                  <div className="mt-5 rounded-[22px] border border-[#eadbc9] bg-white p-4">
                    <p className="text-sm text-[#8d735b]">Receipt total</p>
                    <p className="mt-2 font-serif text-3xl font-medium text-zinc-900">16,000 NGN</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] border border-[#e3d2bf] bg-[#fffaf3] p-5 shadow-[0_18px_36px_rgba(77,54,31,0.05)]">
                  <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">Business</p>
                  <p className="mt-4 text-2xl font-semibold leading-tight text-[#2d241c]">Run in-store checkout without creating a new link each time.</p>
                </div>
                <div className="rounded-[28px] border border-[#d4bc9a] bg-accent p-5 shadow-[0_18px_36px_rgba(250,204,21,0.16)]">
                  <p className="font-serif text-xs uppercase tracking-[0.35em] text-black/50">Developer</p>
                  <p className="mt-4 text-2xl font-semibold leading-tight text-black">Handle the rails, webhooks, and settlement logic behind the merchant flow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="border-t border-[#eadbc9] pt-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] border border-[#eadbc9] bg-[#fffaf4] p-6 shadow-[0_16px_32px_rgba(77,54,31,0.04)]">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">For businesses</p>
                  <h2 className="mt-3 text-3xl font-semibold">Sell faster at the counter.</h2>
                </div>
                <div className="rounded-full border border-[#d7c3ad] bg-[#f7efe4] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9b8468]">
                  Merchant tools
                </div>
              </div>
              <div className="space-y-4">
                {businessFeatures.map((feature) => (
                  <div key={feature.title} className="rounded-[22px] border border-[#eadbc9] bg-[#f8f1e7] p-4">
                    <p className="text-xl font-semibold text-[#2c231c]">{feature.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[#6e5a46]">{feature.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#eadbc9] bg-[#fffaf4] p-6 shadow-[0_16px_32px_rgba(77,54,31,0.04)]">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#9b8468]">For developers</p>
                  <h2 className="mt-3 text-3xl font-semibold">Power the flow behind the screen.</h2>
                </div>
                <div className="rounded-full border border-[#d7c3ad] bg-[#f7efe4] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9b8468]">
                  Product rails
                </div>
              </div>
              <div className="space-y-4">
                {developerFeatures.map((feature) => (
                  <div key={feature.title} className="rounded-[22px] border border-[#eadbc9] bg-[#f8f1e7] p-4">
                    <p className="text-xl font-semibold text-[#2c231c]">{feature.title}</p>
                    <p className="mt-2 text-sm leading-7 text-[#6e5a46]">{feature.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      <HeroSection />
      <FeaturesSection />
      <FeaturesSection />
    </main>
  );
}
