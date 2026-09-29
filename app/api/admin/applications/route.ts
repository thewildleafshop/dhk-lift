import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET() {
  try {
    // 1. Database se Applications fetch karein (Prisma Schema ke mutabiq)
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
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
        _count: {
          select: {
            documents: true,
          },
        },
      },
    });

    // 2. Data ko frontend ke format mein convert karein
    const formattedApplications = applications.map((app) => ({
      id: app.id,
      confirmationNo: app.confirmationNo,
      status: app.status,
      amountRequested: app.amountRequested ? Number(app.amountRequested) : null,
      data: app.data, // JSON field as is bhej dein
      notes: app.notes,
      submittedAt: app.submittedAt ? app.submittedAt.toISOString() : null,
      createdAt: app.createdAt.toISOString(),
      user: app.user,
      program: app.program,
      documentCount: app._count.documents,
    }));

    return NextResponse.json(formattedApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}