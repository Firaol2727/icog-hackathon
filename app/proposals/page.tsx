'use client'
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProposalList } from "@/components/proposal-list"
import { ProposalFilters } from "@/components/proposal-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function ProposalsPage() {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search,setSearch]=useState("")
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Market Proposals</h1>
            <p className="text-muted-foreground">Manage and review market proposals with detailed checklists</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Proposal
          </Button>
        </div>

        <ProposalFilters
        status={status} setStatus={setStatus}
         priority={priority} setPriority={setPriority} search={search} setSearch={setSearch}
        />
        <ProposalList isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} 
         status={status} 
         priority={priority} search={search} />
      </div>
    </DashboardLayout>
  )
}
