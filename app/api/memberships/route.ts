import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Memberships fetch karein
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin saari memberships dekh sakta hai, baaki sirf apni
    let whereClause = {};

    if (session.user.role !== "ADMIN") {
      whereClause = { userId: session.user.id };
    }

    const memberships = await prisma.membership.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
      orderBy: {
        totalDonated: "desc",
      },
    });

    const formattedMemberships = memberships.map((m) => ({
      id: m.id,
      userId: m.userId,
      tier: m.tier,
      totalDonated: Number(m.totalDonated),
      joinedAt: m.joinedAt.toISOString(),
      expiresAt: m.expiresAt?.toISOString() || null,
      user: m.user,
    }));

    return NextResponse.json(formattedMemberships);
  } catch (error) {
    console.error("Error fetching memberships:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}