import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const claims = await prisma.claim.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        partner: {
          select: { orgName: true },
        },
      },
    });

    return NextResponse.json(claims);
  } catch (error: any) {
    console.error("Admin claims error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}