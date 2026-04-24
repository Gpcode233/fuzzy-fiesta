'use client';

import Link from 'next/link';
import FeaturesSection from '@/components/features-5';
import HeroSection from '@/components/hero-section-one';
import { useStore } from '@/lib/store/useStore';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogIn, ArrowRight } from 'lucide-react';

const businessFeatures = [
  {
    title: 'Fixed Store QR',
    body: 'One checkout code for your entire shop. Generate new receipts and track sales without ever changing the QR on your counter.'
  },
  {
    title: 'Inventory-Linked Receipts',
    body: 'Pull items directly from your stock, keep prices locked, and issue unique transaction IDs for every single sale.'
  },
  {
    title: 'Poster-Ready Checkout',
    body: 'Print or share branded payment posters to keep your in-store checkout experience professional, fast, and beautiful.'
  }
];

const developerFeatures = [
  {
    title: 'Robust APIs & Webhooks',
    body: 'Build on top of Busha-powered payment rails with clean endpoints and reliable settlement notification workflows.'
  },
  {
    title: 'Unified Product Surface',
    body: 'Developers and business teams share a single dashboard, ensuring seamless collaboration without technical silos.'
  },
  {
    title: 'Global Settlement Rails',
    body: 'Accept multiple currencies from anywhere in the world while settling directly into your chosen local currency.'
  }
];

export default function HomePage() {
  const { user } = useStore();

  return (
    <main className="min-h-screen overflow-hidden px-4 py-5 text-zinc-900 md:px-6 md:py-8">
      {/* Dynamic Header/Top Bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8 px-4">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-xl bg-[#facc15] flex items-center justify-center font-black text-xl shadow-lg shadow-yellow-500/20">F</div>
          <span className="text-2xl font-black tracking-tighter">Flux</span>
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <Button asChild className="rounded-full bg-black text-white hover:bg-zinc-800">
              <Link href={user.userType === 'merchant' ? '/dashboard/merchant' : '/dashboard/dev'}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="rounded-full hidden md:flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full bg-[#facc15] text-black hover:bg-[#eab308]">
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <HeroSection />

      <FeaturesSection
        title="Built for Merchants"
        description="Everything you need to run your physical store in a digital-first world. Collect any currency, manage stock, and grow."
        features={businessFeatures}
      />

      <FeaturesSection
        title="Engineered for Teams"
        description="Powerful developer tools to integrate, automate, and scale your payment operations globally."
        features={developerFeatures}
        reverse={true}
      />

      <footer className="mt-20 py-12 border-t border-zinc-100 text-center">
        <p className="text-muted-foreground text-sm">&copy; 2026 Flux Payments. A Busha integration partner.</p>
      </footer>
    </main>
  );
}
