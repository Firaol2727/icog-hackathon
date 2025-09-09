"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Phone, MapPin, Building, Crown } from "lucide-react"
import { useEffect, useState } from "react"
import { User } from "@/lib/hooks/useUsers"

export function UserProfile() {

  const [user, setUser] = useState<User>()
  useEffect(() => {
    fetch("/api/user/profile").then(res => res.json()).then(data => setUser(data))
    .catch(err => console.log(err))
  },[])
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Profile Overview */}
      <Card className="md:col-span-1">
        <CardHeader className="text-center">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage src="/professional-avatar.png" alt="John Doe" />
            <AvatarFallback className="text-2xl">JD</AvatarFallback>
          </Avatar>
          <CardTitle className="flex items-center justify-center gap-2">
            {user?.name} 
            <Crown className="h-4 w-4 text-yellow-600" />
          </CardTitle>
          <CardDescription>{user?.role}</CardDescription>
          <Badge className="bg-green-100 text-green-800 border-green-200 w-fit mx-auto">Active</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user?.email}</span>
          </div>
          {/* <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>+1 (555) 123-4567</span>
          </div> */}
          <div className="flex items-center gap-2 text-sm">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{user?.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>Addis Ababa, Ethiopia</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined March 2022</span>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Name</Label>
                <Input id="firstName" defaultValue={user?.name} name="name" />
              </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" name="email" defaultValue={user?.email} />
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={user.} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="San Francisco, CA" />
              </div>
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself..."
                defaultValue={user?.bio}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Expertise</Label>
              <Input
                id="skills"
                placeholder="e.g., Project Management, Data Analysis, Team Leadership"
                defaultValue={user?.skills?.map((skill) => skill).join(", ")}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button >Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
