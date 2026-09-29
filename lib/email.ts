import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

// ============ VERIFICATION EMAIL ============
export async function sendVerificationEmail(email: string, token: string) {
  const verifyLink = `${APP_URL}/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: `DHK LIFT <${FROM_EMAIL}>`,
      to: email,
      subject: "Verify your DHK LIFT account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0B468F; margin: 0;">DHK LIFT</h1>
          </div>
          
          <div style="background: #F6F8FB; border-radius: 12px; padding: 30px; text-align: center;">
            <h2 style="color: #0B468F; margin-top: 0;">Welcome to DHK LIFT!</h2>
            <p style="color: #1F2D3D; font-size: 16px; line-height: 1.6;">
              Thank you for creating an account. Please verify your email address to get started.
            </p>
            
            <a href="${verifyLink}" 
               style="display: inline-block; background: #FFA20D; color: #1F2D3D; padding: 14px 32px; 
                      border-radius: 10px; text-decoration: none; font-weight: bold; margin: 20px 0;">
              Verify Email Address
            </a>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Or copy this link into your browser:
            </p>
            <p style="color: #0B468F; font-size: 12px; word-break: break-all;">
              ${verifyLink}
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              This link will expire in 24 hours.
            </p>
          </div>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
            © ${new Date().getFullYear()} DHK LIFT. All rights reserved.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    console.log("Verification email sent:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

// ============ WELCOME EMAIL (After verification) ============
export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: `DHK LIFT <${FROM_EMAIL}>`,
      to: email,
      subject: "Welcome to DHK LIFT!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0B468F; margin: 0;">DHK LIFT</h1>
          </div>
          
          <div style="background: #F6F8FB; border-radius: 12px; padding: 30px;">
            <h2 style="color: #0B468F; margin-top: 0;">Welcome, ${name}!</h2>
            <p style="color: #1F2D3D; font-size: 16px; line-height: 1.6;">
              Your account has been verified successfully. You're now part of a global community 
              working together to make a difference.
            </p>
            
            <a href="${APP_URL}/dashboard" 
               style="display: inline-block; background: #0B468F; color: white; padding: 14px 32px; 
                      border-radius: 10px; text-decoration: none; font-weight: bold; margin: 20px 0;">
              Go to Dashboard
            </a>
          </div>
        </div>
      `,
    });

    return { success: !error, data };
  } catch (error) {
    console.error("Welcome email error:", error);
    return { success: false, error };
  }
}