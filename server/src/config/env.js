import "dotenv/config";

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET", "JWT_EXPIRES_IN"];

export function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(", ")}`);
    console.error("Check your .env file against .env.example");
    process.exit(1);
  }
}