"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import {  toast } from "react-toastify";
interface CreateKnowledgeModalProps {
  isOpen: boolean
  onClose: () => void
}
interface Source {
  title: string
  url: string
  type: string
}

export function CreateKnowledgeModal({ isOpen,onClose }: CreateKnowledgeModalProps) {
  // const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  // const [sources, setSources] = useState<Array<Source>>([])

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      // setTags([...tags, newTag.trim()])
      const tags=[...formData.tags,newTag.trim()]
      setFormData({...formData,tags:tags})
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const tags=[...formData.tags]
    setFormData({...formData,tags:tags.filter((tag) => tag !== tagToRemove)})
    // setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addSource = () => {
    setFormData({...formData,sources:[...formData.sources,{title:"",url:"",type:"document"}]})
    // setSources([...sources, { title: "", url: "", type: "document" }])
  }

  const updateSource = (index: number, field: string, value: string) => {

    const updatedSources = formData.sources.map((source, i) => (i === index ? { ...source, [field]: value } : source))

    setFormData({...formData,sources:updatedSources})
    // setSources(updatedSources)
  }

  const removeSource = (index: number) => {
    const sources=[...formData.sources]
    setFormData({...formData,sources:sources.filter((_, i) => i !== index)})
    // setSources(sources.filter((_, i) => i !== index))
  }
  const [formData,setFormData] = useState<{
    title: string
    summary: string
    content: string
    category: string
    lessonType: string
    projectName: string
    projectType: string
    eventName: string
    eventDate: string
    tags: string[]
    sources: Source[]
  }>({
    title: "",
    summary: "",
    content: "",
    category: "",
    lessonType:"",
    projectName:"",
    projectType:"",
    eventName:"",
    eventDate:"",
    tags: [],
    sources: [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    // print the form data
    // const formData = new FormData(e.target as HTMLFormElement)
    console.log("Form Data:",formData)
    try {
      const res =await fetch("/api/knowledge/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      toast.success("Knowledge created successfully");
      // return res;
      onClose();
    } catch (error:any) {
      console.error("Error:", error);
      toast.error(error.message);
      
    }
    // console.log
    
    // onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Your Knowledge</DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="What did you learn? Be specific and descriptive..." className="mt-1" />
            </div>

            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief overview of the lesson learned (2-3 sentences)"
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" 
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product Management</SelectItem>
                    <SelectItem value="team">Team Management</SelectItem>
                    <SelectItem value="data">Data & Analytics</SelectItem>
                    <SelectItem value="finance">Finance & Budget</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="lessonType">Lesson Type</Label>
                <Select
                onValueChange={(value) => setFormData({ ...formData, lessonType: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="success">Success Story</SelectItem>
                    <SelectItem value="failure">Failure Analysis</SelectItem>
                    <SelectItem value="insight">Key Insight</SelectItem>
                    <SelectItem value="warning">Warning/Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Project and Event Context */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input id="projectName" value={formData.projectName} onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} placeholder="e.g., Q4 Marketing Campaign" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select
                  onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product-launch">Product Launch</SelectItem>
                      <SelectItem value="marketing">Marketing Campaign</SelectItem>
                      <SelectItem value="process-improvement">Process Improvement</SelectItem>
                      <SelectItem value="organizational-change">Organizational Change</SelectItem>
                      <SelectItem value="technical-implementation">Technical Implementation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventName">Event/Activity Name</Label>
                  <Input id="eventName"  value={formData.eventName} onChange={(e) => setFormData({ ...formData, eventName: e.target.value })} placeholder="e.g., Product Launch Event" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input id="eventDate" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} type="date" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Content */}
          <div>
            <Label htmlFor="content">Detailed Lessons Learned</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Provide detailed information about what happened, what you learned, and how others can benefit from this experience..."
              className="mt-1"
              rows={8}
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="mt-1 space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sources and References */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Sources & References
                <Button type="button" onClick={addSource} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Source
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formData.sources.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Add sources, documents, articles, or links that support your lessons learned.
                </p>
              ) : (
                <div className="space-y-4">
                  {formData.sources.map((source, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="Source title"
                          value={source.title}
                          onChange={(e) => updateSource(index, "title", e.target.value)}
                        />
                        <Input
                          placeholder="URL or reference"
                          value={source.url}
                          onChange={(e) => updateSource(index, "url", e.target.value)}
                        />
                        <Select value={source.type} onValueChange={(value) => updateSource(index, "type", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => removeSource(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" >
              Cancel
            </Button>
            <Button type="submit">Share Knowledge</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
