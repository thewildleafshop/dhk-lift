import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Saare Disease Funds fetch karein (Public - no auth required)
export async function GET(request: Request) {
  try {
    const funds = await prisma.program.findMany({
      where: {
        category: "Disease Fund",
      },
      orderBy: {
        name: "asc",
      },
    });

    const formattedFunds = funds.map((f) => ({
      id: f.id,
      name: f.name,
      slug: f.slug,
      description: f.description,
      category: f.category,
      status: f.status,
      maxAmount: f.maxAmount ? Number(f.maxAmount) : null,
      geography: f.geography,
      createdAt: f.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedFunds);
  } catch (error) {
    console.error("Error fetching disease funds:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}