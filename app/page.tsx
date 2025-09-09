import { DashboardLayout } from "@/components/dashboard-layout"
import { ProposalOverview } from "@/components/proposal-overview"
import { MetricsDashboard } from "@/components/metrics-dashboard"
import { KnowledgeHubPreview } from "@/components/knowledge-hub-preview"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Content Insight Hub Dashboard</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProposalOverview />
          <KnowledgeHubPreview />
          <MetricsDashboard />
        </div>
      </div>
    </DashboardLayout>
  )
}
