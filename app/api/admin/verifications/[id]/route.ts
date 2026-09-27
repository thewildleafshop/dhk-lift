import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Ek specific milestone ki detail fetch karein
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ Promise type
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ params ko await karein (Next.js 15+ requirement)
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Milestone ID is required" }, { status: 400 });
    }

    const milestone = await prisma.milestone.findUnique({
      where: { id },
      include: {
        project: {
          include: { partner: true },
        },
        evidence: true,
      },
    });

    if (!milestone) {
      return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: milestone.id,
      projectId: milestone.project.id,
      projectTitle: milestone.project.title,
      projectSlug: milestone.project.slug,
      partner: milestone.project.partner.orgName,
      partnerVerified: milestone.project.partner.status === "VERIFIED",
      milestone: milestone.title,
      location: milestone.project.location,
      submittedDate: milestone.createdAt.toISOString(),
      status: milestone.status,
      evidenceCount: milestone.evidence.length,
      evidenceTypes: [...new Set(milestone.evidence.map((e) => e.type))],
      amount: Number(milestone.project.goalAmount),
      evidence: milestone.evidence.map((e) => ({
        id: e.id,
        type: e.type,
        fileUrl: e.fileUrl,
        description: e.description,
        visibility: e.visibility,
      })),
    });
  } catch (error) {
    console.error("Error fetching milestone:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: Milestone ka status update karein (Approve/Reject)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ Promise type
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ params ko await karein
    const { id } = await params;

    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!["COMPLETED", "NEEDS_INFO", "PENDING"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedMilestone = await prisma.milestone.update({
      where: { id },
      data: {
        status,
        completedAt: status === "COMPLETED" ? new Date() : null,
      },
    });

    return NextResponse.json({
      message: "Milestone updated successfully",
      milestone: updatedMilestone,
    });
  } catch (error) {
    console.error("Error updating milestone:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}