import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const funds = await prisma.program.findMany({
      where: { category: "Disease Fund" },
      orderBy: { name: "asc" },
    });

    // Get stats for each fund
    const fundsWithStats = await Promise.all(
      funds.map(async (fund) => {
        const applications = await prisma.application.count({
          where: { programId: fund.id },
        });

        const approved = await prisma.application.count({
          where: { programId: fund.id, status: "APPROVED" },
        });

        return {
          id: fund.id,
          slug: fund.slug,
          name: fund.name,
          description: fund.description,
          maxAmount: fund.maxAmount ? Number(fund.maxAmount) : 0,
          geography: fund.geography,
          applications,
          funded: approved,
          status: fund.status === "ACTIVE" ? "Active" : "Paused",
        };
      })
    );

    return NextResponse.json(fundsWithStats);
  } catch (error) {
    console.error("Error fetching disease funds:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}