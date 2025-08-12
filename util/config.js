import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV;

let databaseUrl;
if (env === "development") {
  databaseUrl = process.env.DB_DEV;
} else if (env === "test") {
  databaseUrl = process.env.DB_TEST;
} else {
  databaseUrl = process.env.DB_PROD;
}

export const DATABASE_URL = databaseUrl;
export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = env;
