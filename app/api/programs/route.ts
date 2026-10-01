import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "asc" },
    });

    const formattedPrograms = programs.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      category: p.category,
      maxAmount: p.maxAmount ? Number(p.maxAmount) : null,
      geography: p.geography,
    }));

    return NextResponse.json(formattedPrograms);
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}