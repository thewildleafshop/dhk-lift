import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Partner ke claims
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const partner = await prisma.partner.findFirst({
      where: { userId: session.user.id },
    });

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    const claims = await prisma.claim.findMany({
      where: { partnerId: partner.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(claims);
  } catch (error: any) {
    console.error("GET claims error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Naya claim submit karein
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.patientName || !body.amount || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const partner = await prisma.partner.findFirst({
      where: { userId: session.user.id },
    });

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    const claim = await prisma.claim.create({
      data: {
        partnerId: partner.id,
        patientName: body.patientName,
        patientId: body.patientId || null,
        providerName: body.providerName || "",
        serviceDate: body.serviceDate ? new Date(body.serviceDate) : new Date(),
        serviceType: body.serviceType || "",
        amount: parseFloat(body.amount) || 0,
        description: body.description,
        documents: body.documents || [],
        status: "SUBMITTED",
      },
    });

    return NextResponse.json({ success: true, claim });
  } catch (error: any) {
    console.error("POST claim error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}