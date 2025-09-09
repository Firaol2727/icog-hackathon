"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X, TrendingUp, Clock, Heart } from "lucide-react"

export function KnowledgeFilters({
  category,
  setCategory,
  search,
  setSearch,
  lessonType,
  setLessonType,
  setCurrentPage,
}:{
  sortBy: string|null,
  setSortBy: (sortBy: string) => void,
  category: string|null,
  setCategory: (category: string) => void,
  search: string,
  setSearch: (search: string) => void,
  lessonType: string|null,
  setLessonType: (lessonType: string) => void,
  currentPage: number|null,
  setCurrentPage: (currentPage: number) => void,
  

}) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recent")
  // const [category, setCategory] = useState("")
  // const [search,setSearch]=useState("")
  // const [lessonType, setLessonType] = useState("")
  //  const [currentPage, setCurrentPage] = useState(1)
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
  }

  const sortOptions = [
    { value: "recent", label: "Most Recent", icon: Clock },
    { value: "popular", label: "Most Popular", icon: TrendingUp },
    { value: "liked", label: "Most Liked", icon: Heart },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search knowledge posts, lessons, projects..." className="pl-10" />
        </div>

        <div className="flex gap-2">
          <Select
          onValueChange={
            (value) => {
              setCategory(value)
              setCurrentPage(1)
            }
          }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="product">Product Management</SelectItem>
              <SelectItem value="team">Team Management</SelectItem>
              <SelectItem value="data">Data & Analytics</SelectItem>
              <SelectItem value="finance">Finance & Budget</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>

          <Select
          onValueChange={
            (value) => {
              setLessonType(value)
              setCurrentPage(1)
            }
          }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Lesson Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failure">Failure</SelectItem>
              <SelectItem value="insight">Insight</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => {
                const Icon = option.icon
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Filter Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Quick filters:</span>
        {["Recent Failures", "Success Stories", "Budget Lessons", "Team Insights", "Product Launches"].map((filter) => (
          <Button
            key={filter}
            variant="outline"
            size="sm"
            className="h-7 text-xs bg-transparent"
            onClick={() => setActiveFilters([...activeFilters, filter])}
          >
            {filter}
          </Button>
        ))}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
