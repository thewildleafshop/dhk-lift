import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const claim = await prisma.claim.findUnique({
      where: { id: params.id },
      include: { partner: { select: { orgName: true } } },
    });

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    return NextResponse.json(claim);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { status, notes } = body;

    const claim = await prisma.claim.update({
      where: { id: params.id },
      data: {
        status,
        notes,
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, claim });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}