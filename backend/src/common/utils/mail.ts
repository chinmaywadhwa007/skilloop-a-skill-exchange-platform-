import nodemailer from "nodemailer";
import { env } from "../../config/env.js";
import { logger } from "../../config/logger.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: env.SMTP_USER
    ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
    : undefined,
});

async function sendMail(to: string, subject: string, html: string) {
  // If SMTP isn't configured (local dev), just log instead of throwing.
  if (!env.SMTP_HOST || !env.SMTP_USER) {
    logger.warn(
      { to, subject },
      "📧 SMTP not configured - email skipped (dev mode)",
    );
    return;
  }

  await transporter.sendMail({ from: env.MAIL_FROM, to, subject, html });
}

export async function sendVerificationEmail(
  to: string,
  name: string,
  rawToken: string,
) {
  const verifyUrl = `${env.CLIENT_URL}/verify-email?token=${rawToken}`;
  await sendMail(
    to,
    "Verify your SkillLoop account",
    `<p>Hi ${name},</p>
     <p>Welcome to SkillLoop! Please verify your email address by clicking the link below:</p>
     <p><a href="${verifyUrl}">${verifyUrl}</a></p>
     <p>This link expires in 24 hours.</p>`,
  );
}

export async function sendPasswordResetEmail(
  to: string,
  name: string,
  rawToken: string,
) {
  const resetUrl = `${env.CLIENT_URL}/reset-password?token=${rawToken}`;
  await sendMail(
    to,
    "Reset your SkillLoop password",
    `<p>Hi ${name},</p>
     <p>We received a request to reset your password. Click the link below to set a new one:</p>
     <p><a href="${resetUrl}">${resetUrl}</a></p>
     <p>This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>`,
  );
}
