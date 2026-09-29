import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ Next.js 16: params is a Promise
) {
  try {
    // ✅ params ko await karein
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    const app = await prisma.application.findUnique({
      where: { id: id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, country: true } },
        program: { select: { id: true, name: true, slug: true, category: true } },
        documents: true,
      },
    });

    if (!app) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: app.id,
      confirmationNo: app.confirmationNo,
      status: app.status,
      amountRequested: app.amountRequested ? Number(app.amountRequested) : null,
      data: app.data,
      notes: app.notes,
      submittedAt: app.submittedAt ? app.submittedAt.toISOString() : null,
      reviewedAt: app.reviewedAt ? app.reviewedAt.toISOString() : null,
      createdAt: app.createdAt.toISOString(),
      user: app.user,
      program: app.program,
      documents: app.documents.map((doc) => ({
        id: doc.id,
        fileName: doc.fileName,
        fileUrl: doc.fileUrl,
        fileType: doc.fileType,
        fileSize: doc.fileSize,
        createdAt: doc.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ Next.js 16: params is a Promise
) {
  try {
    const { id } = await params; // ✅ params ko await karein
    const body = await request.json();
    const { status, notes } = body;

    const updated = await prisma.application.update({
      where: { id: id },
      data: {
        ...(status && { status, reviewedAt: new Date() }),
        ...(notes !== undefined && { notes }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}