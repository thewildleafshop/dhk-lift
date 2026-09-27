import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Partners fetch karein
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin saare partners dekh sakta hai, Partner sirf apni profile
    let whereClause = {};

    if (session.user.role === "PARTNER") {
      whereClause = { userId: session.user.id };
    } else if (session.user.role !== "ADMIN") {
      // Baaki roles ko access nahi
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const partners = await prisma.partner.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
        _count: {
          select: { projects: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPartners = partners.map((p) => ({
      id: p.id,
      userId: p.userId,
      orgName: p.orgName,
      orgType: p.orgType,
      country: p.country,
      website: p.website,
      mission: p.mission,
      status: p.status,
      verifiedAt: p.verifiedAt?.toISOString() || null,
      createdAt: p.createdAt.toISOString(),
      user: p.user,
      projectCount: p._count.projects,
    }));

    return NextResponse.json(formattedPartners);
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}