import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // ✅ NextAuth v5 ka tareeqa

// GET: Saare projects fetch karein (Filter by Partner)
export async function GET(request: Request) {
  try {
    // 1. Check karein ke user logged in hai ya nahi (NextAuth v5)
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Agar user PARTNER hai, toh sirf uske projects layein
    // Agar ADMIN hai, toh saare projects layein
    let whereClause = {};

    if (session.user.role === "PARTNER") {
      // Partner ka record dhoondein
      const partner = await prisma.partner.findUnique({
        where: { userId: session.user.id },
      });

      if (!partner) {
        return NextResponse.json({ error: "Partner profile not found" }, { status: 404 });
      }

      whereClause = { partnerId: partner.id };
    }

    // 3. Database se projects fetch karein
    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        milestones: true, // Milestones bhi sath layein
        _count: {
          select: { milestones: true }, // Total milestones count
        },
      },
      orderBy: {
        createdAt: "desc", // Naye projects pehle
      },
    });

    // 4. Data ko frontend ke format mein convert karein
    const formattedProjects = projects.map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      location: project.location,
      status: project.status,
      goal: Number(project.goalAmount),
      raised: Number(project.raisedAmount),
      milestones: {
        completed: project.milestones.filter((m) => m.status === "COMPLETED").length,
        total: project._count.milestones,
      },
      createdAt: project.createdAt,
    }));

    return NextResponse.json(formattedProjects);

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}