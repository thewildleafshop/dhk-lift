import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Admin ke liye pending verifications fetch karein
export async function GET(request: Request) {
  try {
    const session = await auth();

    // 1. Check karein ke user logged in hai aur ADMIN hai
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Database se woh milestones fetch karein jo PENDING hain
    // (Yani Partner ne complete karke evidence upload kar diya, ab Admin verify karega)
    const pendingMilestones = await prisma.milestone.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        project: {
          include: {
            partner: true,
          },
        },
        evidence: true, // Evidence bhi sath layein
      },
      orderBy: {
        createdAt: "asc", // Purane pehle (urgent)
      },
    });

    // 3. Data ko frontend ke format mein convert karein
    const formattedData = pendingMilestones.map((milestone) => ({
      id: milestone.id,
      projectId: milestone.project.id,
      projectTitle: milestone.project.title,
      projectSlug: milestone.project.slug,
      partner: milestone.project.partner.orgName,
      partnerVerified: milestone.project.partner.status === "VERIFIED",
      milestone: milestone.title,
      location: milestone.project.location,
      submittedDate: milestone.createdAt.toISOString(),
      status: "PENDING",
      evidenceCount: milestone.evidence.length,
      evidenceTypes: [...new Set(milestone.evidence.map((e) => e.type))], // Unique types
      amount: Number(milestone.project.goalAmount),
    }));

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error("Error fetching verifications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}