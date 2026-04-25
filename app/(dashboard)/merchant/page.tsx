'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { createDemoQrSvgMarkup, createDemoPaymentLink } from '@/lib/demo';
import { useStore } from '@/lib/store/useStore';
import { cn } from '@/lib/utils';
import { ReceiptTable } from '@/components/dashboard/merchant/ReceiptTable';
import { TransactionTable } from '@/components/shared/TransactionTable';
import { PosterActions } from '@/components/merchant/PosterActions';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Receipt, 
  ArrowUpRight, 
  QrCode, 
  Settings,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const money = new Intl.NumberFormat('en-NG');

export default function MerchantDashboardPage() {
  const { user, merchantProfile, receipts, transactions, paymentLinks } = useStore();
  const [qrSvgMarkup, setQrSvgMarkup] = useState<string>('');
  const [appUrl, setAppUrl] = useState<string>('');

  useEffect(() => {
    setAppUrl(window.location.origin);
  }, []);

  useEffect(() => {
    if (merchantProfile && appUrl) {
      createDemoQrSvgMarkup(`${appUrl}${merchantProfile.fixedCheckoutPath}`).then(setQrSvgMarkup);
    }
  }, [merchantProfile, appUrl]);

  if (!user || !merchantProfile) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fdf8f3]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading dashboard...</h2>
          <p className="text-muted-foreground">Setting up your merchant surface.</p>
        </div>
      </div>
    );
  }

  const paidReceipts = receipts.filter((receipt) => receipt.status === 'paid');
  const totalReceived = paidReceipts.reduce((sum, receipt) => sum + receipt.subtotal, 0);
  
  const posterLink = createDemoPaymentLink(merchantProfile.id, {
    title: merchantProfile.storeName,
    description: `${merchantProfile.storeCategory} checkout`,
    amount: receipts[0]?.subtotal ?? 16000,
    currency: merchantProfile.settlementCurrency,
    settlementCurrency: merchantProfile.settlementCurrency
  });

  return (
    <main className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-20">
      {/* Top Header */}
      <div className="rounded-[9px] border border-[#eadbc9] bg-white p-8 shadow-sm">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-[#2c231c]">Welcome back, {user.name}</h1>
            <p className="text-[#6e5a46] mt-2 flex items-center gap-2">
              Monitoring {merchantProfile.storeName} activity and growth.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="rounded-[9px] border-[#dcc9b2] bg-white hover:bg-[#f8f1e7] h-11 px-6">
              <Link href="/dashboard/merchant/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button asChild className="rounded-[9px] bg-[#facc15] text-black hover:bg-[#eab308] h-11 px-6">
              <Link href="/dashboard/merchant/store">
                <Plus className="mr-2 h-4 w-4" />
                Create Receipt
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Total Received', value: `N${money.format(totalReceived)}`, sub: `From ${paidReceipts.length} paid receipts`, icon: ArrowUpRight },
          { title: 'Draft Receipts', value: receipts.filter(r => r.status === 'draft').length, sub: 'Pending customer checkout', icon: Receipt },
          { title: 'Active Links', value: paymentLinks.length, sub: 'QR and payment links', icon: QrCode },
          { title: 'Settlements', value: transactions.length, sub: 'Total payout activity', icon: LayoutDashboard }
        ].map((stat, i) => (
          <Card key={i} className="rounded-[9px] border-[#eadbc9] bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-bold text-[#9b8468] uppercase tracking-[0.2em]">{stat.title}</CardTitle>
              <div className="rounded-[9px] p-2 bg-[#f8f1e7]">
                <stat.icon className="h-4 w-4 text-[#9b8468]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-[#2c231c]">{stat.value}</div>
              <p className="text-xs text-[#6e5a46] mt-1.5 font-medium">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="bg-[#f3e6d6]/50 p-1 rounded-[9px] border border-[#dcc9b2]">
                <TabsTrigger value="overview" className="rounded-[7px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Overview</TabsTrigger>
                <TabsTrigger value="receipts" className="rounded-[7px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Receipts</TabsTrigger>
                <TabsTrigger value="settlements" className="rounded-[7px] px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Settlements</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              <Card className="rounded-[9px] border-[#eadbc9] bg-white shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-[#f3e6d6] bg-[#fdf8f3] py-5 px-8">
                  <div>
                    <CardTitle className="font-serif text-2xl text-[#2c231c]">Recent Activity</CardTitle>
                    <CardDescription className="text-[#7d6852]">Your latest customer receipts and settlements</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="rounded-[9px] hover:bg-[#f3e6d6]">
                    <Link href="/dashboard/merchant/transactions" className="text-xs font-bold">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <ReceiptTable receipts={receipts.slice(0, 5)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="receipts">
              <Card className="rounded-[9px] border-[#eadbc9] bg-white shadow-sm overflow-hidden">
                <CardHeader className="bg-[#fdf8f3] border-b border-[#f3e6d6] py-5 px-8">
                  <CardTitle className="font-serif text-2xl text-[#2c231c]">Customer Receipts</CardTitle>
                  <CardDescription className="text-[#7d6852]">Manage and track all generated receipts</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ReceiptTable receipts={receipts} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settlements">
              <Card className="rounded-[9px] border-[#eadbc9] bg-white shadow-sm overflow-hidden">
                <CardHeader className="bg-[#fdf8f3] border-b border-[#f3e6d6] py-5 px-8">
                  <CardTitle className="font-serif text-2xl text-[#2c231c]">Settlement History</CardTitle>
                  <CardDescription className="text-[#7d6852]">Payouts to your connected account</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <TransactionTable transactions={transactions} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar/Quick Actions */}
        <div className="space-y-6">
          <Card className="rounded-[9px] border border-[#dcc9b2] bg-[#fffcf8] p-6 shadow-sm overflow-hidden relative">
            <div className="flex items-start justify-between gap-4 mb-6 relative">
              <div>
                <Badge variant="outline" className="rounded-full border-[#d7c3ad] bg-white text-[#9b8468] uppercase tracking-[0.2em] text-[10px] font-bold px-3">Store QR</Badge>
                <h2 className="mt-3 font-serif text-2xl font-bold text-[#2c231c]">Print & Share</h2>
              </div>
              <div className="rounded-[9px] bg-[#facc15]/10 p-2.5">
                <QrCode className="h-5 w-5 text-[#9b8468]" />
              </div>
            </div>

            <div className="space-y-6 relative">
              <div className="rounded-[9px] border border-[#eadbc9] bg-white p-6 shadow-inner flex justify-center group cursor-pointer">
                {qrSvgMarkup ? (
                  <div className="w-full max-w-[200px]" dangerouslySetInnerHTML={{ __html: qrSvgMarkup }} />
                ) : (
                  <div className="h-[200px] w-[200px] animate-pulse bg-zinc-100 rounded-[9px]" />
                )}
              </div>
              
              <div className="rounded-[9px] border border-[#eadbc9] bg-[#fdf8f3] p-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#9b8468] font-bold mb-1.5">Checkout URL</p>
                <p className="text-sm font-mono break-all text-[#2c231c] font-medium select-all">{merchantProfile.fixedCheckoutPath}</p>
              </div>

              <PosterActions paymentLink={posterLink} appUrl={appUrl} className="flex flex-col gap-3" />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
