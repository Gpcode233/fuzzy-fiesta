'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Receipt, 
  Database, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Store,
  Code2,
  ChevronRight,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStore } from '@/lib/store/useStore';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, merchantProfile } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMerchant = pathname.includes('/merchant');
  const isDev = pathname.includes('/dev');

  const navigation = isMerchant ? [
    { name: 'Dashboard', href: '/dashboard/merchant', icon: LayoutDashboard },
    { name: 'Inventory', href: '/dashboard/merchant/store', icon: Store },
    { name: 'Receipts', href: '/dashboard/merchant/transactions', icon: Receipt },
    { name: 'Settings', href: '/dashboard/merchant/settings', icon: Settings },
  ] : [
    { name: 'API Overview', href: '/dashboard/dev', icon: Code2 },
    { name: 'Webhooks', href: '/dashboard/dev/transactions', icon: Database },
    { name: 'Documentation', href: '/dashboard/dev/docs', icon: ChevronRight },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    // We should ideally redirect in an effect, but for simplicity:
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#eadbc9] transition-transform duration-300 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-[#facc15] flex items-center justify-center font-bold text-black">F</div>
              <span className="text-xl font-bold tracking-tight">Flux</span>
            </Link>
          </div>

          <div className="px-4 mb-6">
            <div className="p-2 rounded-2xl bg-[#f8f1e7] flex items-center gap-2">
              <Button 
                variant={isMerchant ? "secondary" : "ghost"} 
                size="sm" 
                className={cn("flex-1 rounded-xl text-xs", isMerchant && "bg-white shadow-sm")}
                asChild
              >
                <Link href="/dashboard/merchant">Merchant</Link>
              </Button>
              <Button 
                variant={isDev ? "secondary" : "ghost"} 
                size="sm" 
                className={cn("flex-1 rounded-xl text-xs", isDev && "bg-white shadow-sm")}
                asChild
              >
                <Link href="/dashboard/dev">Developer</Link>
              </Button>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href as Route}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-colors",
                    active 
                      ? "bg-[#facc15]/10 text-black" 
                      : "text-muted-foreground hover:bg-[#f8f1e7] hover:text-black"
                  )}
                >
                  <Icon className={cn("size-5", active ? "text-[#facc15]" : "text-muted-foreground")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#eadbc9]">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut className="size-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white/80 backdrop-blur-md border-b border-[#eadbc9] md:px-8">
          <button 
            className="p-2 -ml-2 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="size-6" />
          </button>

          <div className="flex-1 px-4 lg:hidden">
            <span className="font-bold">Flux</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="pl-2 pr-4 py-1.5 h-auto rounded-full hover:bg-[#f8f1e7]">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 border-2 border-white shadow-sm">
                      <AvatarImage src={merchantProfile?.logoUrl} />
                      <AvatarFallback className="bg-[#facc15] text-black font-bold">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-xs font-bold leading-none">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">{user.userType}</p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl border-[#eadbc9]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#f3e6d6]" />
                <DropdownMenuItem className="rounded-xl">Profile Settings</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl">Security</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#f3e6d6]" />
                <DropdownMenuItem className="rounded-xl text-red-600 focus:text-red-600" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
