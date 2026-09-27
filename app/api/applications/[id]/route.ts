import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Ek specific application ki detail fetch karein
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, country: true },
        },
        program: true,
        documents: true,
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Security: Agar user ADMIN nahi hai, aur yeh uski application nahi hai, toh access deny karein
    if (session.user.role !== "ADMIN" && application.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
      updatedAt: application.updatedAt.toISOString(),
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