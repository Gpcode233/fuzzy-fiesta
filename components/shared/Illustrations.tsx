'use client';

import { 
  Code, 
  Hashtag, 
  Refresh, 
  Settings, 
  Widget, 
  Shop, 
  BillList, 
  Box, 
  QrCode,
  CheckCircle,
  StickerSquare
} from '@solar-icons/react';

export function MerchantIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#facc15 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      {/* Central QR Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-6 w-64 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-8 rounded-lg bg-[#facc15] flex items-center justify-center">
            <Shop className="size-5 text-black" weight="BoldDuotone" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Merchant Store</div>
            <div className="text-sm font-bold text-zinc-900">Main Counter QR</div>
          </div>
        </div>
        
        <div className="aspect-square bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-center p-4">
          <div className="relative">
             <QrCode className="size-32 text-zinc-900" weight="BoldDuotone" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                   <div className="size-6 bg-[#facc15] rounded-md flex items-center justify-center font-black text-[10px]">F</div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="h-2 w-24 bg-zinc-100 rounded-full" />
          <div className="h-4 w-12 bg-[#facc15]/20 rounded-md border border-[#facc15]/30" />
        </div>
      </div>

      {/* Floating Inventory Card */}
      <div className="absolute top-8 right-8 z-20 bg-white rounded-xl shadow-xl border border-zinc-100 p-4 w-48 transform rotate-3 translate-x-4 animate-bounce-subtle">
        <div className="flex items-center gap-2 mb-3">
          <Box className="size-4 text-[#facc15]" weight="BoldDuotone" />
          <div className="text-[10px] font-bold text-zinc-500 uppercase">Inventory</div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
             <div className="h-1.5 w-16 bg-zinc-100 rounded-full" />
             <div className="text-[10px] font-bold text-green-600">In Stock</div>
          </div>
          <div className="h-1.5 w-full bg-zinc-50 rounded-full overflow-hidden">
            <div className="h-full bg-[#facc15] w-[75%]" />
          </div>
        </div>
      </div>

      {/* Floating Receipt Card */}
      <div className="absolute bottom-10 left-4 z-20 bg-white rounded-xl shadow-xl border border-zinc-100 p-4 w-52 transform -rotate-6 -translate-x-4">
        <div className="flex items-center gap-2 mb-3">
          <BillList className="size-4 text-[#facc15]" weight="BoldDuotone" />
          <div className="text-[10px] font-bold text-zinc-500 uppercase">Live Receipt</div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
             <div className="h-1.5 w-20 bg-zinc-100 rounded-full" />
             <div className="h-1.5 w-8 bg-zinc-100 rounded-full" />
          </div>
          <div className="flex justify-between">
             <div className="h-1.5 w-12 bg-zinc-100 rounded-full" />
             <div className="h-1.5 w-10 bg-zinc-100 rounded-full" />
          </div>
          <div className="pt-2 border-t border-zinc-50 flex justify-between">
             <div className="h-2 w-16 bg-zinc-900 rounded-full" />
             <div className="h-2 w-10 bg-[#facc15] rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Decorative Poster */}
      <div className="absolute top-20 left-12 z-0 opacity-20">
         <StickerSquare className="size-24 text-zinc-300 transform -rotate-12" weight="BoldDuotone" />
      </div>
    </div>
  );
}

export function DeveloperIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Code Window */}
      <div className="relative z-10 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 p-0 w-80 transform rotate-1 overflow-hidden">
        <div className="bg-zinc-800/50 px-4 py-2 flex items-center gap-2 border-b border-zinc-800">
           <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-red-500/50" />
              <div className="size-2 rounded-full bg-amber-500/50" />
              <div className="size-2 rounded-full bg-green-500/50" />
           </div>
           <div className="text-[10px] text-zinc-500 font-mono ml-4">POST /api/payment-link</div>
        </div>
        <div className="p-5 font-mono text-[11px] leading-relaxed">
           <div className="flex gap-4">
              <span className="text-zinc-600">01</span>
              <span className="text-zinc-300">{"{"}</span>
           </div>
           <div className="flex gap-4">
              <span className="text-zinc-600">02</span>
              <span className="ml-4 text-purple-400">"amount"</span>
              <span className="text-zinc-400">: </span>
              <span className="text-amber-300">25000</span>
              <span className="text-zinc-400">,</span>
           </div>
           <div className="flex gap-4">
              <span className="text-zinc-600">03</span>
              <span className="ml-4 text-purple-400">"currency"</span>
              <span className="text-zinc-400">: </span>
              <span className="text-emerald-400">"NGN"</span>
              <span className="text-zinc-400">,</span>
           </div>
           <div className="flex gap-4">
              <span className="text-zinc-600">04</span>
              <span className="ml-4 text-purple-400">"webhook"</span>
              <span className="text-zinc-400">: </span>
              <span className="text-[#facc15]">true</span>
           </div>
           <div className="flex gap-4">
              <span className="text-zinc-600">05</span>
              <span className="text-zinc-300">{"}"}</span>
           </div>
        </div>
      </div>

      {/* Webhook Status Card */}
      <div className="absolute top-4 right-4 z-20 bg-white rounded-xl shadow-xl border border-zinc-100 p-4 w-44 transform -rotate-3 translate-x-2">
        <div className="flex items-center justify-between mb-4">
           <div className="text-[10px] font-bold text-zinc-400 uppercase">Webhook</div>
           <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="space-y-3">
           <div className="flex items-center gap-2">
              <Refresh className="size-3 text-emerald-500" />
              <div className="h-1.5 w-20 bg-zinc-100 rounded-full" />
           </div>
           <div className="flex items-center gap-2">
              <CheckCircle className="size-3 text-emerald-500" />
              <div className="h-1.5 w-16 bg-zinc-100 rounded-full" />
           </div>
        </div>
      </div>

      {/* API Key Card */}
      <div className="absolute bottom-8 left-0 z-20 bg-[#facc15] rounded-xl shadow-xl border border-yellow-400/50 p-4 w-48 transform -rotate-2">
        <div className="flex items-center gap-2 mb-2">
           <Hashtag className="size-3 text-black" weight="Bold" />
           <div className="text-[10px] font-black text-black uppercase tracking-tighter">Live API Key</div>
        </div>
        <div className="bg-black/10 rounded-lg p-2 font-mono text-[9px] text-black/70 overflow-hidden whitespace-nowrap">
           sk_live_942...x920
        </div>
      </div>

      {/* Settings Gear */}
      <div className="absolute top-24 left-10 z-0 opacity-10">
         <Settings className="size-32 text-zinc-400 animate-spin-slow" weight="BoldDuotone" />
      </div>
    </div>
  );
}
