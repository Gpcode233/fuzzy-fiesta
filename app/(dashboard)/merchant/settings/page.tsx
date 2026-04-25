'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useStore } from '@/lib/store/useStore';
import { createDemoQrSvgMarkup } from '@/lib/demo';
import { InventoryManager } from '@/components/dashboard/merchant/InventoryManager';
import { 
  User, 
  Package, 
  CreditCard, 
  Upload, 
  QrCode,
  Save,
  ChevronRight,
  Store as StoreIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';

const sections = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'inventory', label: 'Inventory', icon: Package },
  { key: 'checkout', label: 'Checkout', icon: CreditCard }
] as const;

export default function MerchantSettingsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = use(searchParams);
  const { merchantProfile, inventory, setMerchantProfile } = useStore();
  
  const activeSection = typeof resolvedSearchParams?.section === 'string' && sections.some((section) => section.key === resolvedSearchParams.section)
    ? (resolvedSearchParams.section as typeof sections[number]['key'])
    : 'profile';

  const [qrSvgMarkup, setQrSvgMarkup] = useState('');
  const [appUrl, setAppUrl] = useState('');
  
  // Form states
  const [storeName, setStoreName] = useState(merchantProfile?.storeName || '');
  const [ownerName, setOwnerName] = useState(merchantProfile?.ownerName || '');
  const [storeCategory, setStoreCategory] = useState(merchantProfile?.storeCategory || '');
  const [currency, setCurrency] = useState(merchantProfile?.settlementCurrency || 'NGN');

  useEffect(() => {
    setAppUrl(window.location.origin);
  }, []);

  useEffect(() => {
    if (merchantProfile && appUrl) {
      createDemoQrSvgMarkup(`${appUrl}${merchantProfile.fixedCheckoutPath}`).then(setQrSvgMarkup);
    }
  }, [merchantProfile, appUrl]);

  useEffect(() => {
    if (merchantProfile) {
      setStoreName(merchantProfile.storeName);
      setOwnerName(merchantProfile.ownerName);
      setStoreCategory(merchantProfile.storeCategory);
      setCurrency(merchantProfile.settlementCurrency);
    }
  }, [merchantProfile]);

  const handleSaveProfile = () => {
    if (!merchantProfile) return;
    
    setMerchantProfile({
      ...merchantProfile,
      storeName,
      ownerName,
      storeCategory,
      settlementCurrency: currency
    });
    
    toast.success('Profile updated successfully');
  };

  if (!merchantProfile) return null;

  return (
    <main className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
        <p className="text-muted-foreground">
          Manage your store identity, inventory, and checkout experience.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = section.key === activeSection;

            return (
              <Link
                key={section.key}
                href={`/dashboard/merchant/settings?section=${section.key}` as Route}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#facc15]/10 text-black border border-[#facc15]/20' 
                    : 'text-muted-foreground hover:bg-[#f8f1e7] hover:text-black'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#facc15]' : ''}`} />
                <span>{section.label}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
              </Link>
            );
          })}
        </aside>

        <div className="space-y-6">
          {activeSection === 'profile' && (
            <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
              <Card className="rounded-[30px] border-[#eadbc9] shadow-sm">
                <CardHeader>
                  <CardTitle>Merchant Profile</CardTitle>
                  <CardDescription>Update your store information visible to customers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input 
                        id="storeName" 
                        value={storeName} 
                        onChange={(e) => setStoreName(e.target.value)} 
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner Name</Label>
                      <Input 
                        id="ownerName" 
                        value={ownerName} 
                        onChange={(e) => setOwnerName(e.target.value)} 
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Store Category</Label>
                      <Input 
                        id="category" 
                        value={storeCategory} 
                        onChange={(e) => setStoreCategory(e.target.value)} 
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Settlement Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                          <SelectItem value="KES">Kenyan Shilling (KES)</SelectItem>
                          <SelectItem value="USDT">Tether (USDT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-dashed border-[#eadbc9] bg-[#fdfaf5] p-6 text-center">
                    <div className="size-12 rounded-full bg-white border border-[#eadbc9] flex items-center justify-center mx-auto mb-3">
                      <Upload className="size-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-bold">Store Logo</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto">
                      Recommended: Square JPG or PNG, max 2MB.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 rounded-full">Choose File</Button>
                  </div>

                  <Button onClick={handleSaveProfile} className="w-full rounded-full py-6 bg-[#facc15] text-black hover:bg-[#eab308]">
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="rounded-[30px] border-[#eadbc9] bg-[linear-gradient(180deg,_#fdfaf5,_#f8f1e7)] shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Receipt Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="rounded-[24px] border border-[#eadbc9] bg-white p-5 shadow-inner">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="font-bold text-[#2c231c]">{storeName}</h4>
                          <p className="text-[10px] text-[#8d735b] uppercase tracking-widest">{storeCategory}</p>
                        </div>
                        <div className="size-10 rounded-xl bg-[#fdf8f3] border border-[#f3e6d6] flex items-center justify-center font-bold text-[#9b8468]">
                          {storeName[0] || 'S'}
                        </div>
                      </div>
                      <div className="h-20 border border-dashed border-[#eadbc9] rounded-xl flex items-center justify-center text-[10px] text-muted-foreground uppercase tracking-widest bg-[#fdfdfd]">
                        Receipt Details
                      </div>
                    </div>
                    <p className="text-[11px] text-[#6e5a46] mt-4 leading-relaxed italic">
                      "Your logo and name will appear exactly like this on all customer receipts."
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-[30px] border-[#eadbc9] bg-zinc-900 text-white p-6 shadow-sm overflow-hidden relative">
                  <div className="relative z-10 space-y-2">
                    <h3 className="font-bold">Public Profile</h3>
                    <p className="text-xs text-zinc-400">
                      Your store is currently <span className="text-emerald-400 font-bold uppercase tracking-widest">LIVE</span> and accepting payments.
                    </p>
                    <Button variant="link" className="text-amber-400 p-0 h-auto text-xs" asChild>
                      <Link href={merchantProfile.fixedCheckoutPath as Route} target="_blank">View Live Store <ChevronRight className="ml-1 size-3" /></Link>
                    </Button>
                  </div>
                  <StoreIcon className="absolute -right-4 -bottom-4 size-24 opacity-10" />
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'inventory' && (
            <InventoryManager initialItems={inventory} />
          )}

          {activeSection === 'checkout' && (
            <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
              <div className="space-y-6">
                <Card className="rounded-[30px] border-[#eadbc9] shadow-sm">
                  <CardHeader>
                    <CardTitle>Checkout Experience</CardTitle>
                    <CardDescription>Configuration for your fixed QR and payment links.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Fixed Checkout Path</Label>
                        <div className="flex gap-2">
                          <Input readOnly value={merchantProfile.fixedCheckoutPath} className="rounded-xl bg-[#fdf8f3] border-[#eadbc9] font-mono text-xs" />
                          <Button variant="outline" className="rounded-xl shrink-0">Copy</Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground">This path is permanent and linked to your store QR.</p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-4">
                      <div className="size-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <QrCode className="size-5 text-amber-700" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-amber-900">How Fixed QR Works</p>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          The QR on your counter never changes. When a customer scans it, they enter a Transaction ID that you generate in the Receipt Builder. This makes checkout fast and reliable.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-[30px] border-[#eadbc9] shadow-sm overflow-hidden">
                <CardHeader className="bg-[#fdf8f3] border-b border-[#f3e6d6]">
                  <CardTitle>Store QR Code</CardTitle>
                  <CardDescription>Print this and place it on your counter.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mx-auto rounded-[32px] border-4 border-black p-4 bg-white shadow-xl">
                    {qrSvgMarkup ? (
                      <div className="qr-code-markup w-full aspect-square" dangerouslySetInnerHTML={{ __html: qrSvgMarkup }} />
                    ) : (
                      <div className="w-full aspect-square animate-pulse bg-zinc-100 rounded-2xl" />
                    )}
                  </div>
                  <div className="mt-8 flex gap-3">
                    <Button className="flex-1 rounded-full bg-black text-white">Download PNG</Button>
                    <Button variant="outline" className="flex-1 rounded-full border-[#eadbc9]">Print Poster</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
