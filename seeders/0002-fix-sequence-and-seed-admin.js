export async function up({ context: queryInterface }) {
  // Fix sequence to avoid duplicate key conflicts
  await queryInterface.sequelize.query(
    `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
  );

  // Insert admin user without id (auto increment)
  await queryInterface.bulkInsert("users", [
    {
      name: "Admin User",
      username: "admin",
      admin: true,
    },
  ]);
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete("users", { username: "admin" });
}
