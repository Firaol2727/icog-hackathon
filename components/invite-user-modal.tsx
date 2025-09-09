"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { toast } from "react-toastify"

interface InviteUserModalProps {
  onClose: () => void
}

export function InviteUserModal({ onClose }: InviteUserModalProps) {

  const [isLoading, setIsLoading] = useState(false)

  const [formData,setFormData]=useState<{
    name: string;
    email: string;
    password: string;
    role: string;
    department: string;
  }>({
    name:'',
    email:'',
    password:'',
    role:'',
    department:'',

  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log( "Form Data:",formData)
    // Simulate sending invites
    try {
      fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        console.log("Response ",res)
        if (res.status!==200) {
          toast.error(res.statusText);
        }else{
          toast.success("Knowledge created successfully");
        }
        onClose();
        setIsLoading(false)
      }).catch((error) => {
        console.log("Error ",error)
        toast.error(error.message);
        onClose();
      });
      // return res;
      // onClose();
    } catch (error:any) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose} >
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
          <DialogDescription>Send invitations to new team members to join your organization.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="space-y-2">
            <Label htmlFor="email">Name </Label>
            <div className="flex gap-2">
              <Input
                id="name"
                type="name"
                // name=""
                placeholder="Enter name address"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Addresses</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                // name=""
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                // onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEmail())}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Password</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                type="password"
                // name=""
                placeholder="Enter email address"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                // onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEmail())}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Default Role</Label>
            <Select defaultValue="user"
            value={formData.role}
            onValueChange={(e) => setFormData({ ...formData, role: e })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
            defaultValue="product"
            value={formData.department}
            onValueChange={(e) => setFormData({ ...formData, department: e })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="it">IT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : `Add`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
