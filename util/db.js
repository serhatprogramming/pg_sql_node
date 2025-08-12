// db.js (or whatever you call it)
import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import { DATABASE_URL } from "./config.js";
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: console.log,
});

// Setup Umzug with your sequelize instance
const umzug = new Umzug({
  migrations: {
    glob: "migrations/*.js",
  },
  context: sequelize.getQueryInterface(), // This provides queryInterface to migrations
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function runMigrations() {
  console.log("Starting migrations...");
  await umzug.up();
  console.log("Migrations complete");
}

// Connect to DB, then run migrations
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");

    await runMigrations();
  } catch (err) {
    console.error("Database connection or migration failed:", err);
    process.exit(1);
  }
};

export { connectToDatabase, sequelize };
