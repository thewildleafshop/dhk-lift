import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// ================= GET: Partner ke verification documents =================
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const partner = await prisma.partner.findFirst({
      where: { userId: session.user.id },
      include: { verificationDocs: true },
    });

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json(partner.verificationDocs || []);
  } catch (error: any) {
    console.error("GET verification docs error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ================= POST: Document upload save karein =================
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { docId, fileUrl } = body;

    if (!docId || !fileUrl) {
      return NextResponse.json(
        { error: "Missing fields: docId and fileUrl required" },
        { status: 400 }
      );
    }

    const partner = await prisma.partner.findFirst({
      where: { userId: session.user.id },
    });

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    // Upsert: Agar doc exist karta hai toh update, warna create
    const doc = await prisma.verificationDocument.upsert({
      where: {
        partnerId_docId: {
          partnerId: partner.id,
          docId: docId,
        },
      },
      update: {
        fileUrl: fileUrl,
        status: "PENDING",
        uploadedAt: new Date(),
      },
      create: {
        partnerId: partner.id,
        docId: docId,
        name: docId,
        fileUrl: fileUrl,
        status: "PENDING",
        uploadedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, doc });
  } catch (error: any) {
    console.error("POST verification doc error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}