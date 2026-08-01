import "dotenv/config";
import process from "node:process";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  API_PREFIX: z.string().trim().min(1).default("/api/v1"),
  CLIENT_URL: z.string().trim().url().default("http://localhost:5173"),

  DATABASE_URL: z.string().trim().min(1, "DATABASE_URL is required"),

  JWT_ACCESS_SECRET: z.string().trim().min(10, "JWT_ACCESS_SECRET is required"),
  JWT_REFRESH_SECRET: z
    .string()
    .trim()
    .min(10, "JWT_REFRESH_SECRET is required"),
  JWT_ACCESS_EXPIRES_IN: z.string().trim().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().trim().default("30d"),

  COOKIE_SECRET: z.string().trim().min(10, "COOKIE_SECRET is required"),

  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(4).max(15).default(12),

  CLOUDINARY_CLOUD_NAME: z.string().trim().default(""),
  CLOUDINARY_API_KEY: z.string().trim().default(""),
  CLOUDINARY_API_SECRET: z.string().trim().default(""),

  SMTP_HOST: z.string().trim().default(""),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().trim().default(""),
  SMTP_PASS: z.string().trim().default(""),
  MAIL_FROM: z.string().trim().default("SkillLoop <no-reply@skilloop.dev>"),

  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_WINDOW: z.string().trim().default("1 minute"),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    process.exit(1);
  }

  return parsed.data;
}

export const env = loadEnv();
export const isProd = env.NODE_ENV === "production";
