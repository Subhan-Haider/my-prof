import nodemailer from "nodemailer";

const host = process.env.EMAIL_HOST || "smtp.gmail.com";
const port = Number(process.env.EMAIL_PORT) || 587;
const user = process.env.EMAIL_USER || "ssuuu3031@gmail.com";
const pass = process.env.EMAIL_PASS || "ehtzwcwblwhpcflo";
const from = process.env.EMAIL_FROM || `LootOps Command <${user}>`;

export function getEmailTransporter() {
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendAdminVerificationEmail(
  toEmail: string,
  verificationCode: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getEmailTransporter();

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Portfolio Studio Admin Verification Code</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #07090e;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #f1f5f9;
        }
        .container {
          max-width: 520px;
          margin: 40px auto;
          background-color: #0f141f;
          border: 1px solid #1e293b;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }
        .header {
          background: linear-gradient(135deg, #0f172a, #131c2e);
          padding: 32px 32px 24px;
          text-align: center;
          border-bottom: 1px solid #1e293b;
        }
        .badge {
          display: inline-block;
          background: rgba(52, 211, 153, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.3);
          color: #34d399;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }
        .title {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 6px;
        }
        .subtitle {
          font-size: 13px;
          color: #94a3b8;
          margin: 0;
        }
        .content {
          padding: 32px;
        }
        .message {
          font-size: 14px;
          line-height: 1.6;
          color: #cbd5e1;
          margin-bottom: 24px;
        }
        .code-box {
          background: #090d16;
          border: 1px solid #34d399;
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          margin: 24px 0;
          box-shadow: 0 0 25px rgba(52, 211, 153, 0.15);
        }
        .code-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #94a3b8;
          margin-bottom: 8px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .code-value {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: 8px;
          color: #34d399;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .expiry-note {
          font-size: 12px;
          color: #64748b;
          text-align: center;
          margin-top: 8px;
        }
        .security-notice {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 12px;
          color: #fca5a5;
          margin-top: 24px;
          line-height: 1.5;
        }
        .footer {
          background-color: #090d16;
          padding: 20px 32px;
          text-align: center;
          font-size: 11px;
          color: #64748b;
          border-top: 1px solid #1e293b;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="badge">Security Verification</div>
          <h1 class="title">PORTFOLIO STUDIO</h1>
          <p class="subtitle">Admin Authentication Request</p>
        </div>
        <div class="content">
          <p class="message">
            Hello, a login attempt was made for the <strong>Portfolio CMS Studio</strong> for account <strong>${toEmail}</strong>. Use the 6-digit one-time passcode below to authenticate:
          </p>
          
          <div class="code-box">
            <div class="code-label">Verification Passcode</div>
            <div class="code-value">${verificationCode}</div>
          </div>
          
          <p class="expiry-note">⏱️ This code will expire in <strong>10 minutes</strong>.</p>
          
          <div class="security-notice">
            🔒 <strong>Security Warning:</strong> If you did not request this login, please disregard this email. Your dashboard remains fully protected.
          </div>
        </div>
        <div class="footer">
          Subhan Haider Portfolio CMS · Automated Security Service
        </div>
      </div>
    </body>
    </html>
    `;

    const info = await transporter.sendMail({
      from,
      to: toEmail,
      subject: `${verificationCode} is your Portfolio Studio Admin Verification Code`,
      text: `Your Portfolio Studio admin verification code is: ${verificationCode}. This code will expire in 10 minutes.`,
      html: htmlContent,
    });

    console.log("Admin verification email sent:", info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return { success: false, error: error.message || "Failed to send email" };
  }
}
