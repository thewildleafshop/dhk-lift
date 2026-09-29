import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim();

    // Search across Programs, Projects, Stories
    const [programs, projects, stories] = await Promise.all([
      prisma.program.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, name: true, slug: true, description: true },
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: { id: true, title: true, slug: true, description: true },
      }),
      prisma.story.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { content: { contains: searchTerm, mode: "insensitive" } },
          ],
          status: "PUBLISHED",
        },
        take: 5,
        select: { id: true, title: true, slug: true, excerpt: true },
      }),
    ]);

    return NextResponse.json({
      programs,
      projects,
      stories,
      query: searchTerm,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}