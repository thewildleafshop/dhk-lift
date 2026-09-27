import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Ek specific story fetch karein (by slug)
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const slug = pathParts[pathParts.length - 1];

    if (!slug || slug === "[slug]") {
      return NextResponse.json({ error: "Story slug is required" }, { status: 400 });
    }

    const story = await prisma.story.findUnique({
      where: { slug },
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
    });

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: story.id,
      title: story.title,
      slug: story.slug,
      excerpt: story.excerpt,
      content: story.content,
      category: story.category,
      status: story.status,
      authorName: story.authorName,
      isAnonymous: story.isAnonymous,
      imageUrl: story.imageUrl,
      submittedAt: story.submittedAt?.toISOString() || null,
      approvedAt: story.approvedAt?.toISOString() || null,
      publishedAt: story.publishedAt?.toISOString() || null,
      createdAt: story.createdAt.toISOString(),
      user: story.user,
      program: story.program,
      project: story.project,
    });
  } catch (error) {
    console.error("Error fetching story:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: Story ka status update karein (Approve/Publish/Reject)
export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const slug = pathParts[pathParts.length - 1];

    if (!slug || slug === "[slug]") {
      return NextResponse.json({ error: "Story slug is required" }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!["APPROVED", "PUBLISHED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updateData: any = { status };
    if (status === "APPROVED") updateData.approvedAt = new Date();
    if (status === "PUBLISHED") {
      updateData.approvedAt = new Date();
      updateData.publishedAt = new Date();
    }

    const updatedStory = await prisma.story.update({
      where: { slug },
      data: updateData,
    });

    return NextResponse.json({
      message: "Story updated successfully",
      story: updatedStory,
    });
  } catch (error) {
    console.error("Error updating story:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}