import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    // Validation
    if (!body.name || !body.email || !body.reason) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const request = await prisma.equipmentRequest.create({
      data: {
        userId: session?.user?.id || null,
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        country: body.country,
        equipmentType: body.equipmentType,
        condition: body.condition || "",
        reason: body.reason,
        documents: body.documents || [],
        status: "SUBMITTED",
      },
    });

    return NextResponse.json({ success: true, request });
  } catch (error: any) {
    console.error("Equipment request error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit" },
      { status: 500 }
    );
  }
}