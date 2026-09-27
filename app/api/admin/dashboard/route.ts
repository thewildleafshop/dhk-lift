import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Admin Dashboard stats fetch karein
export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Total Users
    const totalUsers = await prisma.user.count();

    // 2. Total Donations (Completed)
    const donations = await prisma.donation.aggregate({
      where: { status: "COMPLETED" },
      _sum: { totalAmount: true },
      _count: true,
    });

    // 3. Total Projects (Active + Completed)
    const totalProjects = await prisma.project.count();
    const activeProjects = await prisma.project.count({
      where: { status: { in: ["IN_PROGRESS", "FUNDRAISING", "FUNDED"] } },
    });

    // 4. Pending Applications
    const pendingApplications = await prisma.application.count({
      where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "VERIFICATION"] } },
    });

    // 5. Pending Verifications (Milestones)
    const pendingVerifications = await prisma.milestone.count({
      where: { status: "PENDING" },
    });

    // 6. Pending Stories
    const pendingStories = await prisma.story.count({
      where: { status: "PENDING" },
    });

    // 7. Pending Partners (Applicants)
    const pendingPartners = await prisma.partner.count({
      where: { status: "APPLICANT" },
    });

    // 8. Recent Donations (last 5)
    const recentDonations = await prisma.donation.findMany({
      where: { status: "COMPLETED" },
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        donorName: true,
        donorEmail: true,
        totalAmount: true,
        createdAt: true,
      },
    });

    // 9. Recent Applications (last 5)
    const recentApplications = await prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        confirmationNo: true,
        status: true,
        amountRequested: true,
        createdAt: true,
        user: { select: { name: true, email: true } },
        program: { select: { name: true } },
      },
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        totalRaised: Number(donations._sum.totalAmount || 0),
        totalDonations: donations._count,
        totalProjects,
        activeProjects,
        pendingApplications,
        pendingVerifications,
        pendingStories,
        pendingPartners,
      },
      recentDonations: recentDonations.map((d) => ({
        id: d.id,
        donorName: d.donorName,
        donorEmail: d.donorEmail,
        totalAmount: Number(d.totalAmount),
        createdAt: d.createdAt.toISOString(),
      })),
      recentApplications: recentApplications.map((a) => ({
        id: a.id,
        confirmationNo: a.confirmationNo,
        status: a.status,
        amountRequested: a.amountRequested ? Number(a.amountRequested) : null,
        createdAt: a.createdAt.toISOString(),
        user: a.user,
        program: a.program,
      })),
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}