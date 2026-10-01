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
        create: { userId: user.id, tier: "BRONZE", totalDonated: 0 },
      });
      console.log(`   💎 Membership: BRONZE`);
    }

    if (userData.role === "PARTNER") {
      partnerUserId = user.id;
    }
  }

  // ============ PARTNER PROFILES ============
  console.log("\n🤝 Creating Partner Profiles...\n");

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

  const additionalPartnerUsers = [
    { email: "edhi@dhklift.org", name: "Edhi Foundation", orgName: "Edhi Foundation", orgType: "NGO", country: "Pakistan", website: "https://edhi.org", mission: "Providing emergency medical services, shelter, and food to those in need across Pakistan.", status: "TRUSTED" as const },
    { email: "sindh-edu@dhklift.org", name: "Sindh Education Trust", orgName: "Sindh Education Trust", orgType: "NGO", country: "Pakistan", website: "https://sindheducation.org", mission: "Improving access to quality education for underprivileged children in Sindh.", status: "APPLICANT" as const },
    { email: "suspended-partner@dhklift.org", name: "Suspended Org", orgName: "Global Relief Org", orgType: "NGO", country: "Pakistan", website: "https://globalrelief.org", mission: "International relief organization.", status: "SUSPENDED" as const },
  ];

  for (const p of additionalPartnerUsers) {
    const hashedPassword = await bcrypt.hash("Partner@123", 10);

    const pUser = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        name: p.name,
        email: p.email,
        password: hashedPassword,
        role: "PARTNER",
        status: "ACTIVE",
        emailVerified: new Date(),
      },
    });

    await prisma.partner.upsert({
      where: { userId: pUser.id },
      update: {},
      create: {
        userId: pUser.id,
        orgName: p.orgName,
        orgType: p.orgType,
        country: p.country,
        website: p.website,
        mission: p.mission,
        status: p.status,
        verifiedAt: p.status === "TRUSTED" ? new Date() : null,
      },
    });

    console.log(`   ✅ Partner: ${p.orgName} (${p.status})`);
  }

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

  // ============ DONATIONS ============
  console.log("\n💝 Creating Test Donations...\n");

  const donorUser = await prisma.user.findUnique({ where: { email: "member@dhklift.org" } });
  const donorUser2 = await prisma.user.findUnique({ where: { email: "applicant@dhklift.org" } });

  if (donorUser) {
    const liftHealthProgram = await prisma.program.findUnique({ where: { slug: "lift-health" } });
    const foodSecurityProgram = await prisma.program.findUnique({ where: { slug: "food-security" } });
    const cleanWaterProject = await prisma.project.findUnique({ where: { slug: "clean-water-rural-sindh" } });
    const schoolProject2 = await prisma.project.findUnique({ where: { slug: "school-renovation-project" } });

    const donationsData = [
      {
        userId: donorUser.id,
        donorEmail: "member@dhklift.org",
        donorName: "Test Member",
        totalAmount: 150,
        status: "COMPLETED" as const,
        isRecurring: false,
        allocations: [
          { programId: liftHealthProgram?.id, amount: 100 },
          { programId: foodSecurityProgram?.id, amount: 50 },
        ],
      },
      {
        userId: donorUser.id,
        donorEmail: "member@dhklift.org",
        donorName: "Test Member",
        totalAmount: 75,
        status: "COMPLETED" as const,
        isRecurring: true,
        allocations: [
          { projectId: cleanWaterProject?.id, amount: 75 },
        ],
      },
      {
        userId: donorUser2?.id,
        donorEmail: "applicant@dhklift.org",
        donorName: "Test Applicant",
        totalAmount: 200,
        status: "COMPLETED" as const,
        isRecurring: false,
        allocations: [
          { programId: liftHealthProgram?.id, amount: 100 },
          { projectId: schoolProject2?.id, amount: 100 },
        ],
      },
      {
        userId: null,
        donorEmail: "guest@example.com",
        donorName: "Guest Donor",
        totalAmount: 50,
        status: "PENDING" as const,
        isRecurring: false,
        allocations: [
          { programId: foodSecurityProgram?.id, amount: 50 },
        ],
      },
    ];

    await prisma.donationAllocation.deleteMany({});
    await prisma.donation.deleteMany({});
    console.log("   🧹 Cleaned old donations\n");

    for (const donation of donationsData) {
      const createdDonation = await prisma.donation.create({
        data: {
          userId: donation.userId,
          donorEmail: donation.donorEmail,
          donorName: donation.donorName,
          totalAmount: donation.totalAmount,
          currency: "USD",
          status: donation.status,
          isRecurring: donation.isRecurring,
          paymentIntent: `pi_test_${Math.random().toString(36).substring(7)}`,
        },
      });

      for (const alloc of donation.allocations as any[]) {
        await prisma.donationAllocation.create({
          data: {
            donationId: createdDonation.id,
            programId: alloc.programId || null,
            projectId: alloc.projectId || null,
            amount: alloc.amount,
          },
        });
      }

      console.log(`   💰 Donation: $${donation.totalAmount} (${donation.status}) - ${donation.allocations.length} allocation(s)`);
    }

    const totalDonated = donationsData
      .filter((d) => d.userId === donorUser.id && d.status === "COMPLETED")
      .reduce((sum, d) => sum + d.totalAmount, 0);

    await prisma.membership.update({
      where: { userId: donorUser.id },
      data: { totalDonated: totalDonated },
    });

    console.log(`   ✅ ${donationsData.length} donations created`);
    console.log(`   💎 Member total donated: $${totalDonated}`);
  } else {
    console.log(`   ⚠️ Member user not found, skipping donations`);
  }

  // ============ MEMBERSHIP TIERS INFO ============
  console.log("\n💎 Membership Tiers Info...\n");

  if (donorUser) {
    const membership = await prisma.membership.findUnique({
      where: { userId: donorUser.id },
    });

    if (membership) {
      let newTier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" = "BRONZE";
      const total = Number(membership.totalDonated);

      if (total >= 10000) newTier = "PLATINUM";
      else if (total >= 5000) newTier = "GOLD";
      else if (total >= 1000) newTier = "SILVER";

      await prisma.membership.update({
        where: { userId: donorUser.id },
        data: { tier: newTier },
      });

      console.log(`   💎 Member Tier: ${newTier} (Total Donated: $${total})`);
    }
  }

  if (donorUser2) {
    await prisma.membership.upsert({
      where: { userId: donorUser2.id },
      update: {},
      create: {
        userId: donorUser2.id,
        tier: "BRONZE",
        totalDonated: 0,
      },
    });
    console.log(`   💎 Applicant Membership: BRONZE`);
  }

  // ============ DISEASE FUNDS (as Programs with category "Disease Fund") ============
  console.log("\n🏥 Creating Disease Funds...\n");

  const diseaseFundsData = [
    { name: "Cancer Care Fund", slug: "cancer-care-fund", description: "Support for cancer patients covering treatment, medication, and diagnostic expenses.", category: "Disease Fund", maxAmount: 450000, geography: "Global" },
    { name: "Heart Disease Fund", slug: "heart-disease-fund", description: "Assistance for heart surgeries, cardiac care, and cardiovascular treatments.", category: "Disease Fund", maxAmount: 280000, geography: "Global" },
    { name: "Kidney Disease Fund", slug: "kidney-disease-fund", description: "Dialysis support, kidney transplant assistance, and renal care for patients.", category: "Disease Fund", maxAmount: 150000, geography: "Global" },
    { name: "Diabetes Care Fund", slug: "diabetes-care-fund", description: "Insulin support, diabetes management, and complication care for patients.", category: "Disease Fund", maxAmount: 95000, geography: "Global" },
    { name: "Rare Disease Fund", slug: "rare-disease-fund", description: "Support for patients with rare and orphan diseases requiring specialized treatment.", category: "Disease Fund", maxAmount: 25000, geography: "Global" },
    { name: "Children Health Fund", slug: "children-health-fund", description: "Healthcare support for children with critical illnesses and congenital conditions.", category: "Disease Fund", maxAmount: 180000, geography: "Global" },
    { name: "Thalassemia Fund", slug: "thalassemia-fund", description: "Lifelong support for thalassemia patients requiring regular blood transfusions.", category: "Disease Fund", maxAmount: 80000, geography: "Global" },
    { name: "Mental Health Fund", slug: "mental-health-fund", description: "Counseling, therapy, and psychiatric support for mental health conditions.", category: "Disease Fund", maxAmount: 40000, geography: "Global" },
    { name: "Maternal Health Fund", slug: "maternal-health-fund", description: "Prenatal, delivery, and postnatal care for mothers and newborns.", category: "Disease Fund", maxAmount: 60000, geography: "Global" },
  ];

  for (const fund of diseaseFundsData) {
    await prisma.program.upsert({
      where: { slug: fund.slug },
      update: {
        name: fund.name,
        description: fund.description,
        maxAmount: fund.maxAmount,
      },
      create: fund,
    });
    console.log(`   🏥 ${fund.name}`);
  }
  console.log(`   ✅ ${diseaseFundsData.length} disease funds created`);
  // ============ STORIES & TESTIMONIALS ============
  console.log("\n📖 Creating Test Stories...\n");

  const storyUser = await prisma.user.findUnique({ where: { email: "member@dhklift.org" } });
  const storyUser2 = await prisma.user.findUnique({ where: { email: "applicant@dhklift.org" } });
  const liftHealthProgramStory = await prisma.program.findUnique({ where: { slug: "lift-health" } });
  const cleanWaterProjectStory = await prisma.project.findUnique({ where: { slug: "clean-water-rural-sindh" } });

  if (storyUser && storyUser2) {
    const storiesData = [
      {
        userId: storyUser.id,
        title: "Clean Water Changed My Village",
        slug: "clean-water-changed-my-village",
        excerpt: "For the first time in 20 years, my children can drink water without fear of disease.",
        content: "My name is Fatima and I live in a small village in rural Sindh. For the past 20 years, our only source of water was a contaminated well that caused frequent illnesses, especially among children. When DHK LIFT and Al-Khidmat Foundation installed a deep water well in our village, everything changed. My children no longer suffer from waterborne diseases, and I can finally focus on their education instead of worrying about their health. This project has given us a new lease on life.",
        category: "Water & Sanitation",
        status: "PUBLISHED" as const,
        authorName: "Fatima Bibi",
        isAnonymous: false,
        imageUrl: "https://placehold.co/800x600/0B468F/FFFFFF?text=Clean+Water+Story",
        programId: null,
        projectId: cleanWaterProjectStory?.id || null,
        submittedAt: new Date(),
        approvedAt: new Date(),
        publishedAt: new Date(),
      },
      {
        userId: storyUser2.id,
        title: "My Daughter Can Walk Again",
        slug: "my-daughter-can-walk-again",
        excerpt: "The wheelchair from LIFT Ability gave my daughter her independence back.",
        content: "My daughter was diagnosed with a spinal cord injury two years ago, and we could not afford the motorized wheelchair she needed. I am a single mother with limited income, and I felt hopeless. DHK LIFT's LIFT Ability program provided us with a motorized wheelchair within weeks of applying. My daughter can now move around independently, attend school, and even play with her friends. This is not just a wheelchair - it is freedom, dignity, and hope for our family.",
        category: "Disability Support",
        status: "PUBLISHED" as const,
        authorName: "Anonymous",
        isAnonymous: true,
        imageUrl: "https://placehold.co/800x600/7A2C91/FFFFFF?text=Wheelchair+Story",
        programId: null,
        projectId: null,
        submittedAt: new Date(),
        approvedAt: new Date(),
        publishedAt: new Date(),
      },
      {
        userId: storyUser.id,
        title: "Cancer Treatment Saved My Husband",
        slug: "cancer-treatment-saved-my-husband",
        excerpt: "The Cancer Care Fund gave us a second chance when we had lost all hope.",
        content: "When my husband was diagnosed with leukemia, our world fell apart. We had spent all our savings on his initial treatment, and we could not afford the ongoing chemotherapy. The Cancer Care Fund from DHK LIFT stepped in and covered his treatment costs directly. Today, my husband is in remission and back at work. We are forever grateful to the donors and the DHK LIFT team who stood by us during our darkest days.",
        category: "Healthcare",
        status: "APPROVED" as const,
        authorName: "Ayesha Khan",
        isAnonymous: false,
        imageUrl: "https://placehold.co/800x600/12A8C0/FFFFFF?text=Cancer+Story",
        programId: liftHealthProgramStory?.id || null,
        projectId: null,
        submittedAt: new Date(),
        approvedAt: new Date(),
        publishedAt: null,
      },
      {
        userId: storyUser2.id,
        title: "Education Changed My Children's Future",
        slug: "education-changed-my-childrens-future",
        excerpt: "The school renovation project gave my children a safe place to learn.",
        content: "Our local government school was in terrible condition - broken windows, leaking roof, and no proper furniture. Many children, including my own, had stopped attending. When the School Renovation Project renovated the building, everything changed. My children are excited to go to school again, and their grades have improved dramatically. Thank you to all the donors who made this possible.",
        category: "Education",
        status: "PENDING" as const,
        authorName: "Muhammad Ali",
        isAnonymous: false,
        imageUrl: "https://placehold.co/800x600/FFA20D/FFFFFF?text=Education+Story",
        programId: null,
        projectId: null,
        submittedAt: new Date(),
        approvedAt: null,
        publishedAt: null,
      },
      {
        userId: storyUser.id,
        title: "Food Distribution Reached Our Village",
        slug: "food-distribution-reached-our-village",
        excerpt: "After the floods, the emergency food distribution saved our families.",
        content: "The floods destroyed our crops and homes, leaving us with nothing. We were surviving on whatever we could find, and many families were starving. The Emergency Food Distribution program reached our village within days and provided us with food packages that lasted weeks. It gave us time to recover and rebuild. We cannot thank DHK LIFT enough for their quick response.",
        category: "Food Security",
        status: "PUBLISHED" as const,
        authorName: "Bilal Ahmed",
        isAnonymous: false,
        imageUrl: "https://placehold.co/800x600/B7791F/FFFFFF?text=Food+Story",
        programId: null,
        projectId: null,
        submittedAt: new Date(),
        approvedAt: new Date(),
        publishedAt: new Date(),
      },
    ];

    // Clean old stories
    await prisma.story.deleteMany({});
    console.log("   🧹 Cleaned old stories\n");

    for (const story of storiesData) {
      await prisma.story.create({
        data: story,
      });
      console.log(`   📖 Story: ${story.title} (${story.status})`);
    }
    console.log(`   ✅ ${storiesData.length} stories created`);
  } else {
    console.log(`   ⚠️ Story users not found, skipping stories`);
  }
    // ============ DEFAULT SETTINGS ============
  console.log("\n⚙️  Creating Default Settings...\n");

  const defaultSettings = [
    // General
    { key: "siteName", value: "DHK LIFT", category: "general" },
    { key: "siteTagline", value: "A Global Humanitarian Platform", category: "general" },
    { key: "contactEmail", value: "support@dhklift.org", category: "general" },
    { key: "contactPhone", value: "+92 300 1234567", category: "general" },
    { key: "address", value: "Karachi, Pakistan", category: "general" },
    { key: "timezone", value: "Asia/Karachi (PKT)", category: "general" },
    { key: "currency", value: "USD ($)", category: "general" },

    // Payment
    { key: "stripePublicKey", value: "", category: "payment" },
    { key: "stripeSecretKey", value: "", category: "payment" },
    { key: "minDonation", value: "5", category: "payment" },
    { key: "maxDonation", value: "100000", category: "payment" },
    { key: "processingFeePercent", value: "2.9", category: "payment" },
    { key: "processingFeeFixed", value: "0.3", category: "payment" },
    { key: "allowRecurring", value: "true", category: "payment" },
    { key: "allowAnonymous", value: "true", category: "payment" },

    // Email
    { key: "senderName", value: "DHK LIFT", category: "email" },
    { key: "senderEmail", value: "noreply@dhklift.org", category: "email" },
    { key: "replyTo", value: "support@dhklift.org", category: "email" },
    { key: "smtpHost", value: "smtp.sendgrid.net", category: "email" },
    { key: "smtpPort", value: "587", category: "email" },
    { key: "smtpUser", value: "apikey", category: "email" },
    { key: "smtpPassword", value: "", category: "email" },

    // Notifications
    { key: "notify_newApplication", value: "true", category: "notifications" },
    { key: "notify_newDonation", value: "true", category: "notifications" },
    { key: "notify_largeDonation", value: "true", category: "notifications" },
    { key: "notify_newPartner", value: "true", category: "notifications" },
    { key: "notify_verificationRequest", value: "true", category: "notifications" },
    { key: "notify_failedPayment", value: "true", category: "notifications" },
    { key: "notify_dailyDigest", value: "true", category: "notifications" },
    { key: "notify_weeklyReport", value: "false", category: "notifications" },

    // Security
    { key: "enforceMFA", value: "true", category: "security" },
    { key: "sessionTimeout", value: "60", category: "security" },
    { key: "passwordMinLength", value: "8", category: "security" },
    { key: "passwordRequireSpecial", value: "true", category: "security" },
    { key: "maxLoginAttempts", value: "5", category: "security" },
    { key: "ipWhitelist", value: "false", category: "security" },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
// ============ EQUIPMENT ============
console.log("\n♿ Creating Equipment...\n");

const equipmentData = [
  { name: "Standard Wheelchair", category: "wheelchairs", categoryLabel: "Wheelchairs", description: "Durable manual wheelchair suitable for daily use. Adjustable armrests and footrests.", availability: "Available", imageUrl: "/images/programs/disasterRelief.png" },
  { name: "Electric Wheelchair", category: "wheelchairs", categoryLabel: "Wheelchairs", description: "Motorized wheelchair with joystick control. Ideal for users with limited mobility.", availability: "Limited", imageUrl: "/images/programs/healthcare.png" },
  { name: "Walking Frame / Walker", category: "mobility", categoryLabel: "Mobility Aids", description: "Sturdy walking frame for rehabilitation and elderly support. Foldable design.", availability: "Available", imageUrl: "/images/programs/communityVolunteers.png" },
  { name: "Oxygen Concentrator", category: "respiratory", categoryLabel: "Respiratory", description: "Portable oxygen concentrator for patients with respiratory conditions.", availability: "Waitlist", imageUrl: "/images/programs/healthcare.png" },
  { name: "Hospital Bed (Adjustable)", category: "home", categoryLabel: "Home Equipment", description: "Adjustable hospital bed for home care. Includes side rails and remote control.", availability: "Available", imageUrl: "/images/programs/disasterRelief.png" },
  { name: "Prosthetic Leg (Below Knee)", category: "prosthetics", categoryLabel: "Prosthetics", description: "Custom-fitted prosthetic limb for below-knee amputees. Includes rehabilitation support.", availability: "Limited", imageUrl: "/images/programs/education.png" },
];

for (const item of equipmentData) {
  await prisma.equipment.create({ data: item });
}
console.log(`   ✅ ${equipmentData.length} equipment created`);

  console.log(`   ✅ ${defaultSettings.length} default settings created`);
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