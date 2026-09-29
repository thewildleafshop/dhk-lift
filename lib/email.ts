import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || "onboarding@resend.dev";

// ============ WELCOME EMAIL ============
export async function sendWelcomeEmail(to: string, name: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Welcome to DHK LIFT",
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0B468F;">Welcome to DHK LIFT, ${name}!</h1>
          <p>Thank you for joining our global humanitarian platform. Together, we can create lasting change.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #FFA20D; color: #1F2D3D; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 16px; font-weight: bold;">
            Go to Dashboard
          </a>
          <p style="margin-top: 32px; color: #666; font-size: 14px;">
            — The DHK LIFT Team
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Welcome email error:", error);
    return { success: false, error };
  }
}

// ============ DONATION RECEIPT ============
export async function sendDonationReceipt(
  to: string,
  data: { donorName: string; amount: number; cause: string; transactionId: string }
) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Donation Receipt - $${data.amount}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0B468F;">Thank You for Your Donation!</h1>
          <p>Dear ${data.donorName},</p>
          <p>Your generous donation of <strong>$${data.amount}</strong> to <strong>${data.cause}</strong> has been received.</p>
          <div style="background: #F6F8FB; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 4px 0;"><strong>Transaction ID:</strong> ${data.transactionId}</p>
            <p style="margin: 4px 0;"><strong>Amount:</strong> $${data.amount}</p>
            <p style="margin: 4px 0;"><strong>Cause:</strong> ${data.cause}</p>
          </div>
          <p>Your donation will directly support our mission. You'll receive updates on the impact of your gift.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/donations" style="background: #FFA20D; color: #1F2D3D; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 16px; font-weight: bold;">
            View Your Donations
          </a>
          <p style="margin-top: 32px; color: #666; font-size: 14px;">
            — The DHK LIFT Team
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Receipt email error:", error);
    return { success: false, error };
  }
}

// ============ APPLICATION STATUS ============
export async function sendApplicationStatusEmail(
  to: string,
  data: { name: string; confirmationNo: string; status: string; programName: string }
) {
  try {
    const statusMessages: Record<string, string> = {
      SUBMITTED: "Your application has been submitted successfully.",
      UNDER_REVIEW: "Your application is being reviewed by our team.",
      ADDITIONAL_INFO: "We need additional information to process your application.",
      APPROVED: "Congratulations! Your application has been approved.",
      DENIED: "We regret to inform you that your application has been denied.",
      COMPLETED: "Your application has been completed.",
    };

    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Application Update - ${data.confirmationNo}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0B468F;">Application Update</h1>
          <p>Dear ${data.name},</p>
          <p>${statusMessages[data.status] || "Your application status has been updated."}</p>
          <div style="background: #F6F8FB; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 4px 0;"><strong>Confirmation No:</strong> ${data.confirmationNo}</p>
            <p style="margin: 4px 0;"><strong>Program:</strong> ${data.programName}</p>
            <p style="margin: 4px 0;"><strong>Status:</strong> ${data.status}</p>
          </div>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications" style="background: #FFA20D; color: #1F2D3D; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 16px; font-weight: bold;">
            View Application
          </a>
          <p style="margin-top: 32px; color: #666; font-size: 14px;">
            — The DHK LIFT Team
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Application status email error:", error);
    return { success: false, error };
  }
}