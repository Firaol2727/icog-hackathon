import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { ProposalAnalytics } from "@/components/proposal-analytics"
import { KnowledgeAnalytics } from "@/components/knowledge-analytics"
import { TeamPerformance } from "@/components/team-performance"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Analytics & Insights</h1>
            <p className="text-muted-foreground">Comprehensive metrics and performance analysis</p>
          </div>
        </div>

        <AnalyticsOverview />

        <Tabs defaultValue="proposals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="proposals">Content Analytics</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Hub</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            <ProposalAnalytics />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <KnowledgeAnalytics />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamPerformance />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
