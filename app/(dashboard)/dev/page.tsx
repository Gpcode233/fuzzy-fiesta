"use client";

import { useStore } from "@/lib/store/useStore";
import { ApiKeyCard } from "@/components/dashboard/dev/ApiKeyCard";
import { WebhookConfig } from "@/components/dashboard/dev/WebhookConfig";
import { CodeSnippet } from "@/components/dashboard/dev/CodeSnippet";
import { TransactionTable } from "@/components/shared/TransactionTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Key, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DeveloperDashboardPage() {
  const { user, transactions } = useStore();

  if (!user) return null;

  return (
    <main className="min-h-fit p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#eadbc9] rounded-[24px] p-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="size-2 rounded-full bg-green-500 inline-block" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
              Sandbox Mode
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Developer Console
          </h1>
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
          <Button className="rounded-full bg-amber-400 text-black hover:bg-amber-500 font-semibold">
            <Zap className="mr-2 h-4 w-4" />
            Go Live
          </Button>
        </div>
      </div>

      <ApiKeyCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <WebhookConfig />
        <CodeSnippet />
      </div>
     {/* Stats Grid */}
<div className="grid gap-4 md:grid-cols-3">
  <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm overflow-hidden">
    <div className="h-1 bg-amber-400 w-full" />
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        API Keys
      </CardTitle>
      <div className="size-8 rounded-full bg-amber-50 flex items-center justify-center">
        <Key className="h-4 w-4 text-amber-500" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">1 Active</div>
      <p className="text-xs text-muted-foreground mt-1">Production key ready</p>
    </CardContent>
  </Card>

  <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm overflow-hidden">
    <div className="h-1 bg-blue-400 w-full" />
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Webhooks
      </CardTitle>
      <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center">
        <Globe className="h-4 w-4 text-blue-500" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">Sandbox</div>
      <p className="text-xs text-muted-foreground mt-1">Listening on local tunnel</p>
    </CardContent>
  </Card>

  <Card className="rounded-[24px] border-[#eadbc9] bg-white shadow-sm overflow-hidden">
    <div className="h-1 bg-purple-400 w-full" />
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Requests
      </CardTitle>
      <div className="size-8 rounded-full bg-purple-50 flex items-center justify-center">
        <Zap className="h-4 w-4 text-purple-500" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{transactions.length}</div>
      <p className="text-xs text-muted-foreground mt-1">Total API calls</p>
    </CardContent>
  </Card>
</div>
      <Card className="rounded-[28px] border-[#eadbc9] bg-white shadow-sm overflow-hidden">
        <CardHeader className="bg-[#fdf8f3] border-b border-[#f3e6d6]">
          <CardTitle>Recent API Activity</CardTitle>
          <CardDescription>
            Monitor incoming webhook events and transaction status.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <TransactionTable transactions={transactions} />
        </CardContent>
      </Card>
    </main>
  );
}
