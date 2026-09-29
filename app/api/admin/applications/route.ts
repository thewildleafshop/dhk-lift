import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, country: true } },
        program: { select: { id: true, name: true, slug: true, category: true } },
        documents: true, // Include documents
      },
    });

    const formattedApplications = applications.map((app) => ({
      id: app.id,
      confirmationNo: app.confirmationNo,
      status: app.status,
      amountRequested: app.amountRequested ? Number(app.amountRequested) : null,
      data: app.data, // JSON field as is bhej dein
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
    }));

    return NextResponse.json(formattedApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}