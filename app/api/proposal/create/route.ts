import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { getToken } from "next-auth/jwt";
import {  Files, Fields } from 'formidable';
import { CategoryType, PriorityType, Score } from "@/lib/generated/prisma";
import path from "path";

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Reviews a document using the Gemini AI model and returns a quality score.
 * @param {string} documentContent The text content of the document to be reviewed.
 * @returns {Promise<number | null>} A promise that resolves to the score (1-100) or null if an error occurs.
 */
async function getGeminiScore(documentContent: File): Promise< any| null> {
  try {
    // Define a clear, direct prompt for Gemini
     const prompt = `Provide a comprehensive review of the provided marketing content and return a single JSON object. The review should include a score for each of the following categories: Idea, Design, and Content Quality, along with an overall score. The scores should be integers ranging from 1 to 100. Additionally, provide a "suggestion" string that identifies specific areas for improvement based on the provided checklists.

    The JSON object must have the following structure and keys:
    - "idea": An integer score (1-10) based on the "Idea Checklist".
    - "design": An integer score (1-10) based on the "Design Checklist".
    - "quality": An integer score (1-10) based on the "Content Quality Checklist".
    - "overall": An integer score (1-10) that is a weighted average or final assessment of the three categories.
    - "suggestion": A string providing actionable feedback and suggestions for improvement.

    The analysis should be based on these specific metrics:

    A. Idea Checklist
    - Alignment with brand & content goals.
    - Relevance (external value).
    - Timeliness (trend, event, milestone).
    - Accuracy (fact-checked).
    - Clear message (takeaway in 1-2 sentences).
    - Value for audience (inform, inspire, educate, engage).
    - Value for iCog (brand, partnerships, leadership).
    - Visual/design concept identified.
    - Platform suitability (LinkedIn, IG, etc.).
    - Non-redundancy (not too similar to recent posts).

    B. Content Quality Checklist
    - Caption engagement.
    - Caption specificity (not generic).
    - Curiosity/interest trigger.
    - Caption finalized (proofread, call-to-action if needed).
    - Visual asset ready.
    - Platform-ready (length, format, media type).
    - Hashtags/tags relevant.
    - Media quality check (not pixelated or compressed).
    - Scheduled/uploaded.
    - Documented in content calendar.
    - Accessibility copy (alt-text).
    - Reviewed & approved (basic compliance).
    - Common marketing best practices (e.g., tone consistency, readability score, spammy phrases avoidance).

    C. Design Checklist
    - Brand alignment.
    - Logo placement & font consistency.
    - Color palette compliance.
    - Image quality (resolution, cropping).
    - Visual consistency (style, tone).
    - Spacing & alignment.
    - Platform-specific optimization (e.g., IG ratio, LinkedIn thumbnail).

    `;
    // Document content to review:
    // ${documentContent}

    // Get a generative model and call the API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    // const result = await model.generateContent(prompt);
    const arrayBuffer = await documentContent.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: documentContent.type, // e.g. "application/pdf", "image/png"
          data: base64Data,
        },
      },
    ]);

    // console.log("result",result.response)
    // Extract and parse the response
    const geminiText = result.response.text();
    console.log("geminiText",geminiText)
    const cleanStr = geminiText.trim().replace(/^```json|```$/g, "").trim();
    // const obj:{from:number,to:number} = JSON.parse(cleanStr);
    console.log("cleanStr",cleanStr)
    const scoreObject = JSON.parse(cleanStr);
    console.log("scoreObject",scoreObject)
    // Validate the score and return it
    if (typeof scoreObject.score === 'number') {
      return scoreObject.score;
    } else {
      console.error('Gemini response did not contain a valid score:', scoreObject);
      return scoreObject;
    }
  } catch (error) {
    console.error('Error in getGeminiScore:', error);
    return null;
  }
}

export async function POST(req: any) {
  try {
    const token = await getToken({ req });
    const formData = await req.formData();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId: string = token.id as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category");
    const priority = formData.get("priority") as PriorityType;
    const uploadedFile = formData.get("file") as File;
    const fileContent = await (uploadedFile as Blob).text();
    if (!uploadedFile) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }
    // console.log("fileContent",fileContent)
    const geminiScore:any = await getGeminiScore(uploadedFile);
    console.log("Gemini Score: ", geminiScore);
    // extract fields
    // return NextResponse.json({ geminiScore });
    console.log("Upload file ", uploadedFile);
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure uploads folder exists
    if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    
    // then move or write
    // await fs.promises.rename(oldPath, newPath);
    const buffer = Buffer.from(await uploadedFile.arrayBuffer());

    const filePreSuffix=uploadedFile.name.split(".")[1];
    const randomPrefix = Math.random().toString(36).substring(2, 8)+'.'+filePreSuffix;
    const oldPath=`./public/uploads/${uploadedFile.name}`
    const newPath = path.join(uploadDir, randomPrefix);
    await fs.promises.writeFile(oldPath, buffer);
    console.log("Writing file ", `./public/uploads/${uploadedFile.name}`);
    if (!title || !description || !category || !priority ) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    await fs.promises.rename(oldPath, newPath);

    let scoreData: any | null = null;
    if (geminiScore) {
      scoreData={
        quality:geminiScore.quality,
        design:geminiScore.design,
        idea:geminiScore.idea,
        overall:geminiScore.overall
      }
      
    }
    const proposal = await prisma.proposal.create({
      data: {
        title,
        description,
        suggestions:geminiScore?.suggestion || "",
        category,
        status: "revision_needed",
        priority:priority as PriorityType,
        dueDate: new Date(),
        assigneeId: userId,
        tags: [],
        lastUpdated: new Date(),
        score:
         {
          create:scoreData
          //  {
          //   quality: 2,
          //   design:5,
          //   idea:5,
          //   overall:5
          // },
        }
      },
    });

    await prisma.document.create({
      data: {
        name: uploadedFile.name,
        path:randomPrefix,
        processed: false,
        uploadedAt: new Date(),
        proposalId: proposal.id,
      },
    });

    return NextResponse.json({
      message: "File uploaded successfully!",
      filename: uploadedFile.name,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

