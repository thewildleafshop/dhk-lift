import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: { status: "ACTIVE" },
    });

    const projects = await prisma.project.findMany({
      where: { status: { in: ["FUNDRAISING", "FUNDED", "IN_PROGRESS"] } },
      include: { partner: true },
    });

    const causes = [
      ...programs.map((p) => ({
        id: p.id,
        type: "program",
        name: p.name,
        slug: p.slug,
        description: p.description,
        raised: 0,
        goal: p.maxAmount ? Number(p.maxAmount) : null,
      })),
      ...projects.map((p) => ({
        id: p.id,
        type: "project",
        name: p.title,
        slug: p.slug,
        description: p.description,
        raised: Number(p.raisedAmount),
        goal: Number(p.goalAmount),
        location: p.location,
        partner: p.partner.orgName,
      })),
    ];

    return NextResponse.json(causes);
  } catch (error) {
    console.error("Error fetching causes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}