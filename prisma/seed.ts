import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  // ============ TEST USERS ============
  const users = [
    { name: "Admin User", email: "admin@dhklift.org", password: "Admin@123", role: "ADMIN" },
    { name: "Test Member", email: "member@dhklift.org", password: "Member@123", role: "MEMBER" },
    { name: "Test Applicant", email: "applicant@dhklift.org", password: "Applicant@123", role: "APPLICANT" },
    { name: "Al-Khidmat Partner", email: "partner@dhklift.org", password: "Partner@123", role: "PARTNER" },
    { name: "Aga Khan Hospital", email: "provider@dhklift.org", password: "Provider@123", role: "PROVIDER" },
    { name: "MedPlus Pharmacy", email: "pharmacy@dhklift.org", password: "Pharmacy@123", role: "PHARMACY" },
    { name: "Test Volunteer", email: "volunteer@dhklift.org", password: "Volunteer@123", role: "VOLUNTEER" },
  ];

  let partnerUserId = "";

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        password: hashedPassword,
        role: userData.role as any,
        status: "ACTIVE",
      },
      create: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role as any,
        status: "ACTIVE",
        emailVerified: new Date(),
      },
    });

    console.log(`✅ Created: ${user.name} (${user.role}) - ${user.email}`);

    if (userData.role === "MEMBER") {
      await prisma.membership.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id, tier: "BRONZE", totalDonated: 150 },
      });
      console.log(`   💎 Membership: BRONZE`);
    }

    if (userData.role === "PARTNER") {
      partnerUserId = user.id;
    }
  }

  // ============ PARTNER PROFILE ============
  console.log("\n🤝 Creating Partner Profile...\n");

  const partner = await prisma.partner.upsert({
    where: { userId: partnerUserId },
    update: {},
    create: {
      userId: partnerUserId,
      orgName: "Al-Khidmat Foundation",
      orgType: "NGO",
      country: "Pakistan",
      website: "https://alkhidmat.org",
      mission: "Serving humanity across Pakistan through healthcare, education, and disaster relief.",
      status: "VERIFIED",
      verifiedAt: new Date(),
    },
  });

  console.log(`✅ Partner: ${partner.orgName} (${partner.status})`);

  // ============ PROGRAMS ============
  console.log("\n🎯 Creating Programs...\n");

  const programsData = [
    { name: "LIFT Health", slug: "lift-health", description: "Access to quality healthcare and medical support for underserved communities.", category: "Healthcare", maxAmount: 10000, geography: "Global" },
    { name: "LIFT Protect", slug: "lift-protect", description: "Confidential support for women and children affected by abuse and exploitation.", category: "Protection", maxAmount: 5000, geography: "Global" },
    { name: "LIFT Ability", slug: "lift-ability", description: "Medical equipment, mobility aids, and support for people with disabilities.", category: "Disability Support", maxAmount: 8000, geography: "Global" },
    { name: "LIFT Community", slug: "lift-community", description: "Building stronger communities through local projects and education support.", category: "Community Development", maxAmount: 15000, geography: "Global" },
    { name: "Children & Families", slug: "children-families", description: "Supporting children and families with food, shelter, education, and healthcare.", category: "Family Support", maxAmount: 12000, geography: "Global" },
    { name: "Food Security", slug: "food-security", description: "Providing nutritious meals to families facing hunger.", category: "Food Security", maxAmount: 10000, geography: "Global" },
    { name: "Disaster Relief", slug: "disaster-relief", description: "Rapid response to natural disasters and emergencies.", category: "Emergency Relief", maxAmount: 20000, geography: "Global" },
  ];

  for (const program of programsData) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: {},
      create: program,
    });
    console.log(`   🎯 ${program.name}`);
  }
  console.log(`   ✅ ${programsData.length} programs created`);

  // ============ PROJECTS ============
  console.log("\n📁 Creating Projects...\n");

  const projectsData = [
    { title: "Clean Water for Rural Sindh", slug: "clean-water-rural-sindh", description: "Providing clean drinking water to 2,500 beneficiaries in rural Sindh through tube wells and filtration plants.", location: "Sindh, Pakistan", goalAmount: 60000, raisedAmount: 45000, status: "IN_PROGRESS" as const },
    { title: "Mobile Medical Clinics", slug: "mobile-medical-clinics", description: "Deploying mobile medical units to provide free healthcare to 5,000 patients in remote areas of Punjab.", location: "Punjab, Pakistan", goalAmount: 80000, raisedAmount: 80000, status: "VERIFIED" as const },
    { title: "School Renovation Project", slug: "school-renovation-project", description: "Renovating 3 government schools in Karachi to provide safe learning environments for 800 children.", location: "Karachi, Pakistan", goalAmount: 50000, raisedAmount: 25000, status: "FUNDRAISING" as const },
    { title: "Emergency Food Distribution", slug: "emergency-food-distribution", description: "Distributing food packages to 1,200 families affected by floods in Balochistan.", location: "Balochistan, Pakistan", goalAmount: 35000, raisedAmount: 35000, status: "COMPLETED" as const },
    { title: "Wheelchair Distribution Drive", slug: "wheelchair-distribution-drive", description: "Providing 150 wheelchairs to disabled individuals in Lahore who cannot afford them.", location: "Lahore, Pakistan", goalAmount: 30000, raisedAmount: 0, status: "SUBMITTED" as const },
    { title: "Orphan Support Program", slug: "orphan-support-program", description: "Supporting 300 orphaned children in Islamabad with education, food, and healthcare.", location: "Islamabad, Pakistan", goalAmount: 60000, raisedAmount: 0, status: "APPROVED" as const },
  ];

  for (const project of projectsData) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: { ...project, partnerId: partner.id, startDate: new Date() },
    });
    console.log(`   📌 ${project.title} (${project.status})`);
  }

  // ============ MILESTONES & EVIDENCE ============
  console.log("\n📋 Creating Milestones & Evidence...\n");

  await prisma.evidence.deleteMany({});
  await prisma.milestone.deleteMany({});
  console.log("   🧹 Cleaned old milestones & evidence\n");

  // Project 1: Clean Water
  const waterProject = await prisma.project.findUnique({ where: { slug: "clean-water-rural-sindh" } });
  if (waterProject) {
    const milestonesData = [
      { title: "Milestone 1: Site Survey Complete", status: "COMPLETED" },
      { title: "Milestone 2: Equipment Procured", status: "COMPLETED" },
      { title: "Milestone 3: Well Installation Complete", status: "COMPLETED" },
      { title: "Milestone 4: Water Testing", status: "PENDING" },
      { title: "Milestone 5: Community Handover", status: "PENDING" },
    ];

    for (const m of milestonesData) {
      const milestone = await prisma.milestone.create({
        data: {
          projectId: waterProject.id,
          title: m.title,
          status: m.status,
          completedAt: m.status === "COMPLETED" ? new Date() : null,
        },
      });

      if (m.title === "Milestone 3: Well Installation Complete") {
        const evidenceData = [
          { type: "PHOTO", fileUrl: "https://placehold.co/600x400/0B468F/FFFFFF?text=Well+1", description: "Well installation photo 1" },
          { type: "PHOTO", fileUrl: "https://placehold.co/600x400/12A8C0/FFFFFF?text=Well+2", description: "Well installation photo 2" },
          { type: "PHOTO", fileUrl: "https://placehold.co/600x400/FFA20D/FFFFFF?text=Community", description: "Community using well" },
          { type: "RECEIPT", fileUrl: "https://placehold.co/600x400/7A2C91/FFFFFF?text=Receipt", description: "Equipment receipt" },
          { type: "INVOICE", fileUrl: "https://placehold.co/600x400/16845B/FFFFFF?text=Invoice", description: "Contractor invoice" },
          { type: "DELIVERY", fileUrl: "https://placehold.co/600x400/B7791F/FFFFFF?text=Delivery", description: "Delivery confirmation" },
          { type: "REPORT", fileUrl: "https://placehold.co/600x400/1769AA/FFFFFF?text=Report", description: "Installation report" },
          { type: "INSPECTION", fileUrl: "https://placehold.co/600x400/B42318/FFFFFF?text=Inspection", description: "Inspection certificate" },
        ];

        for (const ev of evidenceData) {
          await prisma.evidence.create({
            data: {
              projectId: waterProject.id,
              milestoneId: milestone.id,
              type: ev.type,
              fileUrl: ev.fileUrl,
              description: ev.description,
              visibility: "PUBLIC",
            },
          });
        }
        console.log(`      📎 Milestone 3: 8 evidence files added`);
      } else if (m.status === "COMPLETED") {
        await prisma.evidence.create({
          data: {
            projectId: waterProject.id,
            milestoneId: milestone.id,
            type: "PHOTO",
            fileUrl: "https://placehold.co/600x400/0B468F/FFFFFF?text=Progress",
            description: `Evidence for ${m.title}`,
            visibility: "PUBLIC",
          },
        });
      }
    }
    console.log(`   ✅ Clean Water: 5 milestones created`);
  }

  // Project 2: Mobile Medical
  const medicalProject = await prisma.project.findUnique({ where: { slug: "mobile-medical-clinics" } });
  if (medicalProject) {
    const milestonesData = [
      { title: "Milestone 1: Clinics Procured", status: "COMPLETED" },
      { title: "Milestone 2: First Clinic Operational", status: "COMPLETED" },
      { title: "Milestone 3: 1000 Patients Served", status: "COMPLETED" },
      { title: "Milestone 4: Final Report Submitted", status: "COMPLETED" },
    ];
    for (const m of milestonesData) {
      await prisma.milestone.create({
        data: { projectId: medicalProject.id, title: m.title, status: m.status, completedAt: new Date() },
      });
    }
    console.log(`   ✅ Mobile Medical: 4 milestones created`);
  }

  // Project 3: School Renovation
  const schoolProject = await prisma.project.findUnique({ where: { slug: "school-renovation-project" } });
  if (schoolProject) {
    const milestonesData = [
      { title: "Milestone 1: Construction Started", status: "COMPLETED" },
      { title: "Milestone 2: Roof Completed", status: "PENDING" },
      { title: "Milestone 3: Painting & Finishing", status: "PENDING" },
      { title: "Milestone 4: Handover to School", status: "PENDING" },
    ];
    for (const m of milestonesData) {
      await prisma.milestone.create({
        data: {
          projectId: schoolProject.id,
          title: m.title,
          status: m.status,
          completedAt: m.status === "COMPLETED" ? new Date() : null,
        },
      });
    }
    console.log(`   ✅ School Renovation: 4 milestones created`);
  }

  // Project 4: Emergency Food
  const foodProject = await prisma.project.findUnique({ where: { slug: "emergency-food-distribution" } });
  if (foodProject) {
    const milestonesData = [
      { title: "Milestone 1: Food Procured", status: "COMPLETED" },
      { title: "Milestone 2: 500 Families Served", status: "COMPLETED" },
      { title: "Milestone 3: 1000 Families Served", status: "COMPLETED" },
      { title: "Milestone 4: Final Report", status: "COMPLETED" },
    ];
    for (const m of milestonesData) {
      await prisma.milestone.create({
        data: { projectId: foodProject.id, title: m.title, status: m.status, completedAt: new Date() },
      });
    }
    console.log(`   ✅ Emergency Food: 4 milestones created`);
  }

  console.log(`   ⏳ Wheelchair & Orphan: No milestones yet (pending approval)`);

  // ============ APPLICATIONS ============
  console.log("\n📝 Creating Test Applications...\n");

  const applicantUser = await prisma.user.findUnique({ where: { email: "applicant@dhklift.org" } });
  const memberUser = await prisma.user.findUnique({ where: { email: "member@dhklift.org" } });

  if (applicantUser && memberUser) {
    const applicationsData = [
      {
        userId: applicantUser.id,
        status: "SUBMITTED" as const,
        amountRequested: 5000,
        data: {
          programName: "LIFT Health",
          assistanceType: "Medical Treatment",
          patientName: "Ahmed Khan",
          condition: "Chronic Kidney Disease",
          hospital: "Aga Khan Hospital, Karachi",
          monthlyIncome: 25000,
          householdSize: 6,
          requestedAmount: 5000,
          contactPhone: "+92-300-1234567",
        },
        notes: "Patient requires dialysis 3 times a week.",
      },
      {
        userId: applicantUser.id,
        status: "UNDER_REVIEW" as const,
        amountRequested: 3000,
        data: {
          programName: "LIFT Ability",
          assistanceType: "Wheelchair",
          patientName: "Fatima Bibi",
          condition: "Spinal Cord Injury",
          hospital: "Lahore General Hospital",
          monthlyIncome: 15000,
          householdSize: 4,
          requestedAmount: 3000,
          contactPhone: "+92-321-9876543",
        },
        notes: "Patient needs a motorized wheelchair.",
      },
      {
        userId: memberUser.id,
        status: "APPROVED" as const,
        amountRequested: 2500,
        data: {
          programName: "LIFT Community",
          assistanceType: "Educational Support",
          studentName: "Ali Hassan",
          school: "Government School, Islamabad",
          grade: "Grade 8",
          monthlyIncome: 20000,
          householdSize: 5,
          requestedAmount: 2500,
          contactPhone: "+92-333-5556667",
        },
        notes: "Approved for annual school fees and supplies.",
      },
      {
        userId: applicantUser.id,
        status: "DRAFT" as const,
        amountRequested: null,
        data: {
          programName: "LIFT Health",
          assistanceType: "Disease Fund",
          patientName: "Not completed",
        },
        notes: null,
      },
    ];

    for (const app of applicationsData) {
      const program = await prisma.program.findFirst({
        where: { name: app.data.programName },
      });

      await prisma.application.create({
        data: {
          userId: app.userId,
          programId: program?.id || null,
          status: app.status,
          amountRequested: app.amountRequested,
          data: app.data,
          notes: app.notes,
          submittedAt: app.status !== "DRAFT" ? new Date() : null,
          reviewedAt: ["APPROVED", "DENIED", "COMPLETED"].includes(app.status) ? new Date() : null,
        },
      });
      console.log(`   📄 Application: ${app.data.programName} (${app.status})`);
    }
    console.log(`   ✅ ${applicationsData.length} applications created`);
  } else {
    console.log(`   ⚠️ Applicant or Member user not found, skipping applications`);
  }

  console.log("\n🎉 Seed complete!\n");
  console.log("========================================");
  console.log("LOGIN CREDENTIALS:");
  console.log("========================================");
  users.forEach((u) => {
    console.log(`${u.role.padEnd(12)} | ${u.email.padEnd(28)} | ${u.password}`);
  });
  console.log("========================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });