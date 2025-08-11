import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config.js";

import { Umzug, SequelizeStorage } from "umzug";
import path from "path";
import url from "url";

const sequelize = new Sequelize(DATABASE_URL);

// Resolve the directory of the current file (e.g., /.../util)
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Go two directories up (to the project root) and then into the 'migrations' folder
const migrationsPath = path.resolve(__dirname, "..", "migrations");

console.log("Checking for migrations in:", path.join(migrationsPath, "*.cjs"));

const umzug = new Umzug({
  migrations: {
    // The glob pattern now correctly targets the 'migrations' folder
    glob: path.join(migrationsPath, "*.cjs").replace(/\\/g, "/"),
    resolve: async ({ path: migrationPath }) => {
      const migrationModule = await import(
        url.pathToFileURL(migrationPath).href
      );
      console.log(
        "Loaded migration module keys:",
        Object.keys(migrationModule)
      );
      return migrationModule.default;
    },
  },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

const runMigrations = async () => {
  const migrations = await umzug.up();
  console.log(
    "Migrations executed:",
    migrations.map((m) => m.name)
  );
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");
    await runMigrations();
    console.log("Migration process complete.");
  } catch (err) {
    console.error("Database connection or migration failed:", err);
    process.exit(1);
  }
};

export { connectToDatabase, sequelize };
