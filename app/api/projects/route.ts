import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        partner: true,
        milestones: true,
      },
    });

    // ✅ Format karein
    const formattedProjects = projects.map((p) => ({
      ...p,
      raised: Number(p.raisedAmount || 0),
      goal: Number(p.goalAmount || 0),
    }));

    return NextResponse.json(formattedProjects);
  } catch (error: any) {
    console.error("GET projects error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
// ================= POST (Submit New Project) =================
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validation
    if (!body.title || !body.description || !body.goal) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, goal" },
        { status: 400 }
      );
    }

    // Slug generate karein (title se)
    const slug =
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") +
      "-" +
      Date.now().toString().slice(-6);

    // Partner dhundein (session user se)
    const partner = await prisma.partner.findFirst({
      where: { userId: session.user.id },
    });

    if (!partner) {
      return NextResponse.json(
        { error: "Partner profile not found. Please complete your profile first." },
        { status: 400 }
      );
    }

    // Project create karein (milestones ke saath)
    const project = await prisma.project.create({
      data: {
        partnerId: partner.id,
        title: body.title,
        slug: slug,
        description: body.description,
        location: body.location || "",
        goalAmount: body.goal,
        status: "SUBMITTED",
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        category: body.category || null,
        beneficiaries: body.beneficiaries || null,
        problem: body.problem || null,
        solution: body.solution || null,
        timeline: body.timeline || null,
        coverImage: body.coverImage || null,
        supportingDocs: body.supportingDocs || [],
        milestones: {
          create: body.milestones.map((m: any) => ({
            title: m.title || "Untitled Milestone",
            description: m.description || null,
            amount: parseFloat(m.amount) || 0,
            status: "PENDING",
          })),
        },
      },
      include: {
        milestones: true,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("POST project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit project" },
      { status: 500 }
    );
  }
}