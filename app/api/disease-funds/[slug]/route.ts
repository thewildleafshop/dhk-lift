import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Ek specific Disease Fund ki detail fetch karein (by slug)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Fund slug is required" }, { status: 400 });
    }

    const fund = await prisma.program.findUnique({
      where: { slug },
    });

    if (!fund || fund.category !== "Disease Fund") {
      return NextResponse.json({ error: "Fund not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: fund.id,
      name: fund.name,
      slug: fund.slug,
      description: fund.description,
      category: fund.category,
      status: fund.status,
      maxAmount: fund.maxAmount ? Number(fund.maxAmount) : null,
      geography: fund.geography,
      createdAt: fund.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching fund:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}