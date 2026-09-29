import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Fetch Claims (Applications with a program)
    const applications = await prisma.application.findMany({
      where: {
        programId: { not: null }, // Only applications with a program (fund)
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
        program: { select: { id: true, name: true, slug: true, category: true } },
        _count: { select: { documents: true } },
      },
    });

    const claims = applications.map((app) => {
      const formData = (app.data as any) || {};
      return {
        id: app.id,
        confirmationNo: app.confirmationNo,
        patientName: formData.patientName || formData.fullName || app.user.name || "Unknown",
        provider: formData.providerName || formData.hospital || "N/A",
        fund: app.program?.name || "General Fund",
        amount: app.amountRequested ? Number(app.amountRequested) : null,
        status: app.status,
        submittedAt: app.submittedAt ? app.submittedAt.toISOString() : null,
        documentCount: app._count.documents,
      };
    });

    // 2. Fetch Funds (Programs with category "Healthcare" or similar)
    const programs = await prisma.program.findMany({
      where: {
        category: { in: ["Healthcare", "Disease Fund", "Health"] },
      },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { applications: true, allocations: true } },
      },
    });

    const funds = programs.map((p) => ({
      id: p.id,
      name: p.name,
      disease: p.category,
      status: p.status === "ACTIVE" ? "ACTIVE" : p.status === "WAITLIST" ? "PAUSED" : "CLOSED",
      balance: 0, // TODO: Calculate from allocations
      committed: 0,
      totalRaised: 0,
      applications: p._count.applications,
      color: "text-purple",
      bgColor: "bg-purple/10",
    }));

    // 3. Fetch Providers (Partners with type "Hospital" or "Pharmacy")
    const partners = await prisma.partner.findMany({
      where: {
        orgType: { in: ["Hospital", "Pharmacy", "Clinic"] },
      },
      orderBy: { createdAt: "desc" },
    });

    const providers = partners.map((p) => ({
      id: p.id,
      name: p.orgName,
      type: p.orgType,
      location: p.country,
      verified: p.status === "VERIFIED" || p.status === "TRUSTED",
      totalClaims: 0, // TODO: Calculate from applications
      totalAmount: 0,
      pendingClaims: 0,
    }));

    return NextResponse.json({ claims, funds, providers });
  } catch (error) {
    console.error("Error fetching healthcare data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}