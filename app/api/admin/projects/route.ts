import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Make sure this path is correct!

export async function GET() {
  try {
    // Fetch Projects from Database
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        partner: {
          select: {
            orgName: true,
          },
        },
        _count: {
          select: {
            milestones: true,
            evidence: true,
          },
        },
      },
    });

    // Format Data
    const formattedProjects = projects.map((project) => ({
      id: project.id,
      title: project.title,
      partner: project.partner?.orgName || "Unknown Partner",
      location: project.location,
      status: project.status,
      goalAmount: Number(project.goalAmount),
      raisedAmount: Number(project.raisedAmount),
      milestoneCount: project._count.milestones,
      evidenceCount: project._count.evidence,
      createdAt: project.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}