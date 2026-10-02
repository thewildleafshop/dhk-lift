import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: { status: { in: ["VERIFIED", "TRUSTED"] } },
      include: {
        _count: {
          select: { projects: true },
        },
      },
      orderBy: { verifiedAt: "desc" },
    });

    const formattedPartners = partners.map((p) => ({
      id: p.id,
      orgName: p.orgName,
      orgType: p.orgType,
      country: p.country,
      website: p.website,
      mission: p.mission,
      status: p.status,
      verifiedAt: p.verifiedAt,
      projectCount: p._count.projects,
    }));

    return NextResponse.json(formattedPartners);
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}