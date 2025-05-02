import dotenv from "dotenv";

if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: '.env.production' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.testing' });
} else {
  dotenv.config({ path: '.env.development' });
}

export const ENV: any = {
  PORT: process.env.PORT || "5000",
  MONGO_URI: process.env.MONGO_URI || "",
  NODE_ENV: process.env.NODE_ENV || "dev",
  JWT_SECRET: process.env.JWT_SECRET as string || "secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string
};