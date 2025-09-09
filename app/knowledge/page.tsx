'use client'
import { DashboardLayout } from "@/components/dashboard-layout"
import { KnowledgeGrid } from "@/components/knowledge-grid"
import { KnowledgeFilters } from "@/components/knowledge-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateKnowledgeModal } from "@/components/create-knowledge-modal"
import { useState } from "react"
export default  function KnowledgePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState("recent")
  const [category, setCategory] = useState("")
  const [search,setSearch]=useState("")
  const [lessonType, setLessonType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Knowledge Hub</h1>
            <p className="text-muted-foreground">Share and discover lessons learned from projects and experiences</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90"
           onClick={() => setIsCreateModalOpen(true)}
           >
            <Plus className="mr-2 h-4 w-4" />
            Share Knowledge
          </Button>
        </div>

        <KnowledgeFilters  
        sortBy={sortBy}
        setSortBy={setSortBy}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        lessonType={lessonType}
        setLessonType={setLessonType}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
  //       category,
  // setCategory,
  // search,
  // setSearch,
  // lessonType,
  // setLessonType,
  // currentPage,
  // setCurrentPage,
        />
        <KnowledgeGrid 
        lessonType={lessonType}
        setLessonType={setLessonType}
        category={category}
        setCategory={setCategory}
        currentPage={currentPage}
        refresh={isCreateModalOpen}
        setCurrentPage={setCurrentPage}
        search={search}
        setSearch={setSearch}
        />
        <CreateKnowledgeModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      </div>
    </DashboardLayout>
  )
}
