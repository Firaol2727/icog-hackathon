import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  // Find user by email
  const user = await prisma.user.findFirst({where:{email:email} })

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  // If passwords are hashed, use bcrypt to compare
  const passwordMatch = password === user.password
  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  // Set a cookie or JWT here if needed

  return NextResponse.json({ success: true, user: { id: user.id, email: user.email } }, { status: 200 })
}