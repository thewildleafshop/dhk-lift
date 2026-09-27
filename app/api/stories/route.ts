import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Stories fetch karein
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    const session = await auth();

    // Build where clause
    let whereClause: any = {};

    // Agar Admin nahi hai, toh sirf PUBLISHED stories dikhayen
    if (!session || session.user?.role !== "ADMIN") {
      whereClause.status = "PUBLISHED";
    } else if (status) {
      whereClause.status = status;
    }

    if (category && category !== "ALL") {
      whereClause.category = category;
    }

    const stories = await prisma.story.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        program: {
          select: { id: true, name: true, slug: true },
        },
        project: {
          select: { id: true, title: true, slug: true },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    const formattedStories = stories.map((s) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      excerpt: s.excerpt,
      content: s.content,
      category: s.category,
      status: s.status,
      authorName: s.authorName,
      isAnonymous: s.isAnonymous,
      imageUrl: s.imageUrl,
      programId: s.programId,
      projectId: s.projectId,
      submittedAt: s.submittedAt?.toISOString() || null,
      approvedAt: s.approvedAt?.toISOString() || null,
      publishedAt: s.publishedAt?.toISOString() || null,
      createdAt: s.createdAt.toISOString(),
      user: s.user,
      program: s.program,
      project: s.project,
    }));

    return NextResponse.json(formattedStories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Nayi story submit karein
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, excerpt, category, authorName, isAnonymous, imageUrl } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Title, content, and category are required" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug already exists, append random number
    let finalSlug = slug;
    let counter = 1;
    while (await prisma.story.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const story = await prisma.story.create({
      data: {
        userId: session.user.id,
        title,
        slug: finalSlug,
        content,
        excerpt: excerpt || content.slice(0, 150),
        category,
        status: "PENDING",
        authorName: isAnonymous ? "Anonymous" : (authorName || session.user.name || "Anonymous"),
        isAnonymous: isAnonymous || false,
        imageUrl: imageUrl || null,
        submittedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: story.id,
        slug: story.slug,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}