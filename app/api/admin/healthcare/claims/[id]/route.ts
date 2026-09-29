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
      return NextResponse.json({ error: "Claim ID is required" }, { status: 400 });
    }

    const claim = await prisma.application.findUnique({
      where: { id: id }, // ✅ Ab id defined hai
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            country: true,
          },
        },
        program: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: true,
          },
        },
        documents: true,
      },
    });

    if (!claim) {
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: claim.id,
      confirmationNo: claim.confirmationNo,
      status: claim.status,
      amountRequested: claim.amountRequested ? Number(claim.amountRequested) : null,
      data: claim.data,
      notes: claim.notes,
      submittedAt: claim.submittedAt ? claim.submittedAt.toISOString() : null,
      reviewedAt: claim.reviewedAt ? claim.reviewedAt.toISOString() : null,
      createdAt: claim.createdAt.toISOString(),
      patient: claim.user,
      fund: claim.program,
      documents: claim.documents.map((doc) => ({
        id: doc.id,
        fileName: doc.fileName,
        fileUrl: doc.fileUrl,
        fileType: doc.fileType,
        fileSize: doc.fileSize,
        createdAt: doc.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching claim:", error);
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
    console.error("Error updating claim:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}