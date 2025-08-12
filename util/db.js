import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import { DATABASE_URL, NODE_ENV } from "./config.js"; // Make sure NODE_ENV is in your config

const isProduction = NODE_ENV === "production";
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: console.log,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {}, // no SSL for dev/test
});

// Umzug for migrations
const umzugMigrations = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
    tableName: "migrations",
    modelName: "Migration",
  }),
  logger: console,
});

// Umzug for seeders
const umzugSeeders = new Umzug({
  migrations: { glob: "seeders/*.js" }, // separate folder for seeders
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
    tableName: "seeders",
    modelName: "Seeder",
  }), // different table to track seeders
  logger: console,
});

async function runMigrations() {
  console.log("Starting migrations...");
  await umzugMigrations.up();
  console.log("Migrations complete");
}

async function runSeeders() {
  console.log("Starting seeders...");
  await umzugSeeders.up();
  console.log("Seeders complete");
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");

    await runMigrations();

    if (NODE_ENV === "development") {
      await runSeeders();
    }
  } catch (err) {
    console.error("Database connection or migration failed:", err);
    process.exit(1);
  }
};

export { connectToDatabase, sequelize };
