import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Ek specific application fetch karein
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, country: true },
        },
        program: {
          select: { id: true, name: true, slug: true, category: true },
        },
        documents: true,
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: application.id,
      confirmationNo: application.confirmationNo,
      status: application.status,
      amountRequested: application.amountRequested ? Number(application.amountRequested) : null,
      data: application.data,
      notes: application.notes,
      submittedAt: application.submittedAt?.toISOString() || null,
      reviewedAt: application.reviewedAt?.toISOString() || null,
      createdAt: application.createdAt.toISOString(),
      user: application.user,
      program: application.program,
      documents: application.documents.map((d) => ({
        id: d.id,
        fileName: d.fileName,
        fileUrl: d.fileUrl,
        fileType: d.fileType,
        fileSize: d.fileSize,
        createdAt: d.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: Application ka status update karein
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!["SUBMITTED", "VERIFICATION", "UNDER_REVIEW", "ADDITIONAL_INFO", "APPROVED", "DENIED", "COMPLETED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const application = await prisma.application.update({
      where: { id },
      data: {
        status,
        reviewedAt: ["APPROVED", "DENIED", "COMPLETED"].includes(status) ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}