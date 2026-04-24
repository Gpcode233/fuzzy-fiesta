'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { createDemoQrSvgMarkup, createDemoPaymentLink } from '@/lib/demo';
import { useStore } from '@/lib/store/useStore';
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
  Plus,
  Users
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
    <main className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">
            Monitor your {merchantProfile.storeName} activity and growth.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/dashboard/merchant/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button asChild className="rounded-full bg-[#facc15] text-black hover:bg-[#eab308]">
            <Link href="/dashboard/merchant/store">
              <Plus className="mr-2 h-4 w-4" />
              Create Receipt
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Received</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N{money.format(totalReceived)}</div>
            <p className="text-xs text-muted-foreground mt-1">From {paidReceipts.length} paid receipts</p>
          </CardContent>
        </Card>
        <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Draft Receipts</CardTitle>
            <Receipt className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receipts.filter(r => r.status === 'draft').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending customer checkout</p>
          </CardContent>
        </Card>
        <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Links</CardTitle>
            <QrCode className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentLinks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">QR and payment links</p>
          </CardContent>
        </Card>
        <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Settlements</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total payout activity</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-[#f3e6d6] p-1 rounded-full border border-[#dcc9b2]">
              <TabsTrigger value="overview" className="rounded-full px-6 data-[state=active]:bg-white">Overview</TabsTrigger>
              <TabsTrigger value="receipts" className="rounded-full px-6 data-[state=active]:bg-white">Receipts</TabsTrigger>
              <TabsTrigger value="settlements" className="rounded-full px-6 data-[state=active]:bg-white">Settlements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card className="rounded-[28px] border-[#eadbc9] bg-white/50 backdrop-blur-sm shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-[#f3e6d6] bg-[#fdf8f3] py-4">
                  <div>
                    <CardTitle className="text-xl">Recent Activity</CardTitle>
                    <CardDescription>Your latest customer receipts and settlements</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/merchant/transactions">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <ReceiptTable receipts={receipts.slice(0, 5)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="receipts">
              <Card className="rounded-[28px] border-[#eadbc9] shadow-sm overflow-hidden">
                <CardHeader className="bg-[#fdf8f3] border-b border-[#f3e6d6]">
                  <CardTitle>Customer Receipts</CardTitle>
                  <CardDescription>Manage and track all generated receipts</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ReceiptTable receipts={receipts} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settlements">
              <Card className="rounded-[28px] border-[#eadbc9] shadow-sm overflow-hidden">
                <CardHeader className="bg-[#fdf8f3] border-b border-[#f3e6d6]">
                  <CardTitle>Settlement History</CardTitle>
                  <CardDescription>Payouts to your connected account</CardDescription>
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
          <Card className="rounded-[30px] border border-[#dcc9b2] bg-[#fff9f1] p-5 shadow-sm overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge variant="outline" className="rounded-full border-[#d7c3ad] bg-[#f8f1e7] text-[#9b8468] uppercase tracking-wider text-[10px]">Store QR</Badge>
                <h2 className="mt-2 text-xl font-bold">Print & Share</h2>
              </div>
              <div className="rounded-full bg-[#f8f1e7] p-2">
                <QrCode className="h-5 w-5 text-[#9b8468]" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[24px] border border-[#eadbc9] bg-white p-4 shadow-inner flex justify-center">
                {qrSvgMarkup ? (
                  <div className="w-full max-w-[180px]" dangerouslySetInnerHTML={{ __html: qrSvgMarkup }} />
                ) : (
                  <div className="h-[180px] w-[180px] animate-pulse bg-zinc-100 rounded-xl" />
                )}
              </div>
              
              <div className="rounded-[24px] border border-[#eadbc9] bg-[#f8f1e7] p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-[#9b8468] font-semibold mb-1">Checkout URL</p>
                <p className="text-sm font-mono break-all text-[#2c231c]">{merchantProfile.fixedCheckoutPath}</p>
              </div>

              <PosterActions paymentLink={posterLink} appUrl={appUrl} className="flex flex-col gap-2" />
            </div>
          </Card>

          <Card className="rounded-[30px] border border-[#eadbc9] bg-white p-5 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Quick Contacts
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Support Team', status: 'Online' },
                { name: 'Settlement Desk', status: 'Active' }
              ].map((contact, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#f3e6d6] flex items-center justify-center font-bold text-xs">
                      {contact.name[0]}
                    </div>
                    <span className="text-sm font-medium">{contact.name}</span>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px]">{contact.status}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 rounded-full text-xs">View all contacts</Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
