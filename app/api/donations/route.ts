import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Donations fetch karein
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admin saari donations dekh sakta hai, baaki sirf apni
    let whereClause = {};

    if (session.user.role !== "ADMIN") {
      whereClause = { userId: session.user.id };
    }

    const donations = await prisma.donation.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        allocations: {
          include: {
            program: {
              select: { id: true, name: true, slug: true, category: true },
            },
            project: {
              select: { id: true, title: true, slug: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format data for frontend
    const formattedDonations = donations.map((donation) => ({
      id: donation.id,
      donorEmail: donation.donorEmail,
      donorName: donation.donorName,
      totalAmount: Number(donation.totalAmount),
      currency: donation.currency,
      status: donation.status,
      isRecurring: donation.isRecurring,
      receiptUrl: donation.receiptUrl,
      createdAt: donation.createdAt.toISOString(),
      user: donation.user,
      allocations: donation.allocations.map((alloc) => ({
        id: alloc.id,
        amount: Number(alloc.amount),
        program: alloc.program,
        project: alloc.project,
      })),
    }));

    return NextResponse.json(formattedDonations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}