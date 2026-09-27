import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Applications fetch karein
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin saari applications dekh sakta hai, baaki sirf apni
    let whereClause = {};

    if (session.user.role !== "ADMIN") {
      whereClause = { userId: session.user.id };
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        program: {
          select: { id: true, name: true, slug: true, category: true },
        },
        documents: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format data for frontend
    const formattedApplications = applications.map((app) => ({
      id: app.id,
      confirmationNo: app.confirmationNo,
      status: app.status,
      amountRequested: app.amountRequested ? Number(app.amountRequested) : null,
      data: app.data,
      notes: app.notes,
      submittedAt: app.submittedAt?.toISOString() || null,
      reviewedAt: app.reviewedAt?.toISOString() || null,
      createdAt: app.createdAt.toISOString(),
      user: app.user,
      program: app.program,
      documentCount: app.documents.length,
    }));

    return NextResponse.json(formattedApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Nayi application submit karein
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { programId, amountRequested, data } = body;

    if (!data) {
      return NextResponse.json({ error: "Application data is required" }, { status: 400 });
    }

    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        programId: programId || null,
        status: "SUBMITTED",
        amountRequested: amountRequested ? parseFloat(amountRequested) : null,
        data: data,
        submittedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: application.id,
        confirmationNo: application.confirmationNo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}