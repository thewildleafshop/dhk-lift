import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Reports data fetch karein
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "summary";

    // ============ SUMMARY REPORT ============
    if (type === "summary") {
      const totalUsers = await prisma.user.count();
      const totalDonations = await prisma.donation.aggregate({
        where: { status: "COMPLETED" },
        _sum: { totalAmount: true },
        _count: true,
      });
      const totalApplications = await prisma.application.count();
      const totalProjects = await prisma.project.count();
      const totalPartners = await prisma.partner.count();

      return NextResponse.json({
        totalUsers,
        totalDonations: totalDonations._count,
        totalRaised: Number(totalDonations._sum.totalAmount || 0),
        totalApplications,
        totalProjects,
        totalPartners,
      });
    }

    // ============ DONATIONS REPORT ============
    if (type === "donations") {
      const donations = await prisma.donation.findMany({
        include: {
          user: { select: { name: true, email: true } },
          allocations: {
            include: {
              program: { select: { name: true } },
              project: { select: { title: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(
        donations.map((d) => ({
          id: d.id,
          donorName: d.donorName || "Guest",
          donorEmail: d.donorEmail,
          totalAmount: Number(d.totalAmount),
          status: d.status,
          isRecurring: d.isRecurring,
          allocations: d.allocations.length,
          date: d.createdAt.toISOString().split("T")[0],
        }))
      );
    }

    // ============ APPLICATIONS REPORT ============
    if (type === "applications") {
      const applications = await prisma.application.findMany({
        include: {
          user: { select: { name: true, email: true } },
          program: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(
        applications.map((a) => ({
          id: a.id,
          confirmationNo: a.confirmationNo,
          applicantName: a.user.name || a.user.email,
          program: a.program?.name || "General",
          amountRequested: a.amountRequested ? Number(a.amountRequested) : 0,
          status: a.status,
          submittedAt: a.submittedAt?.toISOString().split("T")[0] || "N/A",
          date: a.createdAt.toISOString().split("T")[0],
        }))
      );
    }

    // ============ PROJECTS REPORT ============
    if (type === "projects") {
      const projects = await prisma.project.findMany({
        include: {
          partner: { select: { orgName: true } },
          _count: { select: { milestones: true, allocations: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(
        projects.map((p) => ({
          id: p.id,
          title: p.title,
          partner: p.partner.orgName,
          location: p.location,
          goalAmount: Number(p.goalAmount),
          raisedAmount: Number(p.raisedAmount),
          status: p.status,
          milestones: p._count.milestones,
          date: p.createdAt.toISOString().split("T")[0],
        }))
      );
    }

    // ============ USERS REPORT ============
    if (type === "users") {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          _count: { select: { donations: true, applications: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(
        users.map((u) => ({
          id: u.id,
          name: u.name || "N/A",
          email: u.email,
          role: u.role,
          status: u.status,
          donations: u._count.donations,
          applications: u._count.applications,
          joinedAt: u.createdAt.toISOString().split("T")[0],
        }))
      );
    }

    return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}