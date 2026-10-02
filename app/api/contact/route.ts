import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Contact form submit karein
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, category } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to database using Setting model (as a simple key-value store)
    // OR create a new ContactMessage model if you want proper structure
    // Filhal hum Setting model use kar rahe hain temporary
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    await prisma.setting.create({
      data: {
        key: contactId,
        value: JSON.stringify({
          name,
          email,
          subject: subject || "General Inquiry",
          message,
          category: category || "general",
          submittedAt: new Date().toISOString(),
        }),
        category: "contact_messages",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us. We'll get back to you within 24 hours.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}