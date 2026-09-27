import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Impact stats calculate karein (Public)
export async function GET() {
  try {
    // 1. Total Raised (Completed donations)
    const donations = await prisma.donation.aggregate({
      where: { status: "COMPLETED" },
      _sum: { totalAmount: true },
      _count: true,
    });

    // 2. Lives Impacted (rough estimate from donations)
    const totalRaised = Number(donations._sum.totalAmount || 0);
    const livesImpacted = Math.round(totalRaised * 20); // $1 = ~20 lives (rough)

    // 3. Countries (unique from partners)
    const partners = await prisma.partner.findMany({
      select: { country: true },
    });
    const uniqueCountries = new Set(partners.map((p) => p.country));
    const countriesCount = uniqueCountries.size + 20; // Add base countries

    // 4. Projects Completed
    const projectsCompleted = await prisma.project.count({
      where: { status: { in: ["COMPLETED", "VERIFIED"] } },
    });

    // 5. Program Impact (per program stats)
    const programs = await prisma.program.findMany({
      where: { category: { not: "Disease Fund" } },
    });

    const programImpact = await Promise.all(
      programs.map(async (program) => {
        const applicationsCount = await prisma.application.count({
          where: { programId: program.id },
        });
        const allocations = await prisma.donationAllocation.aggregate({
          where: { programId: program.id },
          _sum: { amount: true },
        });
        const projectCount = await prisma.project.count({
          where: { allocations: { some: { programId: program.id } } },
        });

        return {
          name: program.name,
          slug: program.slug,
          category: program.category,
          applicationsCount,
          totalRaised: Number(allocations._sum.amount || 0),
          projectCount,
        };
      })
    );

    return NextResponse.json({
      overall: {
        totalRaised,
        livesImpacted,
        countriesCount,
        projectsCompleted,
        totalDonations: donations._count,
      },
      programImpact,
    });
  } catch (error) {
    console.error("Error fetching impact stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}