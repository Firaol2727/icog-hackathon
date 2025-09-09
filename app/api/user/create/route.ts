import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest,NextResponse } from "next/server"
export  async function POST(req: NextRequest) {
  const data :any =await req.json()
  const { name, email, password, role,department,location }=data;
  console.log("data",data)
  if (!name || !email || !password || !role) {
    return NextResponse.json({error:"Required fields "},{status:400})
  }
  try {
    const user = await prisma.user.create({ data: { name, email, password, role,department,location } })
    return NextResponse.json(user)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create user" })
  }
}
