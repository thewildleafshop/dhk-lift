import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const funds = await prisma.program.findMany({
      where: { category: "Disease Fund" },
    });

    const formattedFunds = funds.map((f) => ({
      id: f.id,
      name: f.name,
      slug: f.slug,
      description: f.description,
      maxAmount: f.maxAmount ? Number(f.maxAmount) : null,
      geography: f.geography,
    }));

    return NextResponse.json(formattedFunds);
  } catch (error) {
    console.error("Error fetching disease funds:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}