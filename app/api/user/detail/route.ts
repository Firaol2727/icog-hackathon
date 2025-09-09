import { User } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const  getPrompt = (user: User) => {
    return `You are an AI assistant that analyzes user knowledge information stored in a KnowledgePost table.  
I will provide you with user details and their associated KnowledgePosts.  

From this data, generate:  
1. A **knowledge description** summarizing the user’s expertise, skills, and contributions.  
2. **Growth opportunities** in the company based on their knowledge, interests, and current contributions.  
3. **User interest areas** extracted or inferred from their KnowledgePosts (tags, categories, projects, events, lessonType).  

### Input (Example)
{
  "user": {
    "id": "user123",
    "name": "John Doe",
    "role": "Software Engineer"
  },
  "posts": [
    {
      "title": "Scaling Microservices",
      "summary": "Explains how to scale microservices using Kubernetes and Docker.",
      "category": "Engineering",
      "tags": ["microservices", "kubernetes", "docker"],
      "lessonType": "Technical",
      "project": "Platform Scalability",
      "event": "DevOps Summit 2025"
    },
    {
      "title": "Improving Team Collaboration",
      "summary": "Techniques to improve cross-team collaboration in agile environments.",
      "category": "Management",
      "tags": ["agile", "collaboration", "teamwork"],
      "lessonType": "SoftSkill",
      "project": "Agile Transformation"
    }
  ]
}

### Expected Output (JSON)
{
  "userId": "user123",
  "knowledgeDescription": "John has expertise in scaling microservices using Kubernetes and Docker, and also contributes knowledge on agile collaboration and teamwork practices.",
  "growthOpportunities": [
    "Lead cross-functional projects combining technical scalability and team collaboration",
    "Mentor junior engineers in cloud-native development and agile practices",
    "Contribute to company-wide DevOps adoption strategy"
  ],
  "interestAreas": [
    "Microservices",
    "Cloud Infrastructure",
    "Agile Collaboration",
    "DevOps"
  ]
}
  The data provided 
  
  ${JSON.stringify(user, null, 2)}
`

}
// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Reviews a document using the Gemini AI model and returns a quality score.
 * @param {string} documentContent The text content of the document to be reviewed.
 * @returns {Promise<number | null>} A promise that resolves to the score (1-100) or null if an error occurs.
 */
async function getGeminiInformation(user: User): Promise< any| null> {
  try {
    // Define a clear, direct prompt for Gemini
    // Get a generative model and call the API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(getPrompt(user));
    // const result = await model.generateContent);

    // console.log("result",result.response)
    // Extract and parse the response
    const geminiText = result.response.text();
    const cleanStr = geminiText.trim().replace(/^```json|```$/g, "").trim();
    // const obj:{from:number,to:number} = JSON.parse(cleanStr);
    const detail = JSON.parse(cleanStr);
    // console.log("Dsetail Object json",detail)
    return detail;
  } catch (error) {
    // console.error('Error in getGeminiScore:', error);
    return null;
  }
}
export  async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const userId: string = searchParams.get("id") || "";
  const user = await prisma.user.findUnique({ where: { id: userId },include:{
    posts: true
  } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const detail= await getGeminiInformation(user);
  return NextResponse.json({user,detail});
}
