'use client';

import { useStore } from '@/lib/store/useStore';
import { ApiKeyCard } from '@/components/dashboard/dev/ApiKeyCard';
import { WebhookConfig } from '@/components/dashboard/dev/WebhookConfig';
import { CodeSnippet } from '@/components/dashboard/dev/CodeSnippet';
import { TransactionTable } from '@/components/shared/TransactionTable';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Code2, 
  Key, 
  Globe, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DeveloperDashboardPage() {
  const { user, transactions } = useStore();

  if (!user) return null;

  return (
    <main className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Developer Console</h1>
          <p className="text-muted-foreground">
            Manage your API keys and webhook configurations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full" asChild>
            <a href="https://docs.busha.co" target="_blank" rel="noreferrer">
              <Globe className="mr-2 h-4 w-4" />
              API Docs
            </a>
          </Button>
          <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
            <Zap className="mr-2 h-4 w-4" />
            Go Live
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">API Keys</CardTitle>
            <Key className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 Active</div>
            <p className="text-xs text-muted-foreground mt-1">Production key ready</p>
          </CardContent>
        </Card>
        <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Webhooks</CardTitle>
            <Globe className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sandbox</div>
            <p className="text-xs text-muted-foreground mt-1">Listening on local tunnel</p>
          </CardContent>
        </Card>
        <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Requests</CardTitle>
            <Zap className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total API calls</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <ApiKeyCard />
          <CodeSnippet />
        </div>
        <div className="space-y-6">
          <WebhookConfig />
          <Card className="rounded-[30px] border border-[#eadbc9] bg-zinc-900 text-white p-6 shadow-lg overflow-hidden relative">
            <div className="relative z-10 space-y-4">
              <Badge className="bg-amber-400 text-black hover:bg-amber-400 border-none">Coming Soon</Badge>
              <h3 className="text-2xl font-bold tracking-tight">Advanced SDKs</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We&apos;re building native SDKs for React Native, Flutter, and Swift to make mobile payments even easier.
              </p>
              <Button variant="link" className="text-amber-400 p-0 h-auto font-bold group">
                Join the waitlist <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <Code2 className="size-48" />
            </div>
          </Card>
        </div>
      </div>

      <Card className="rounded-[28px] border-[#eadbc9] bg-white shadow-sm overflow-hidden">
        <CardHeader className="bg-[#fdf8f3] border-b border-[#f3e6d6]">
          <CardTitle>Recent API Activity</CardTitle>
          <CardDescription>Monitor incoming webhook events and transaction status.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <TransactionTable transactions={transactions} />
        </CardContent>
      </Card>
    </main>
  );
}
