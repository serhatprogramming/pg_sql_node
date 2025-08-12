export async function up({ context: queryInterface }) {
  // Insert some teams
  await queryInterface.bulkInsert("teams", [
    { name: "Team Alpha" },
    { name: "Team Beta" },
    { name: "Team Gamma" },
  ]);

  // Insert memberships: link users to teams by user_id and team_id
  // Assuming users with ids 1-5 exist and teams have ids 1-3 (auto incremented)
  await queryInterface.bulkInsert("memberships", [
    { user_id: 1, team_id: 1 }, // Alice in Team Alpha
    { user_id: 2, team_id: 1 }, // Bob in Team Alpha
    { user_id: 3, team_id: 2 }, // Carol in Team Beta
    { user_id: 4, team_id: 2 }, // Dave in Team Beta
    { user_id: 5, team_id: 3 }, // Eve in Team Gamma
    { user_id: 1, team_id: 3 }, // Alice also in Team Gamma
  ]);
}

export async function down({ context: queryInterface }) {
  // Delete memberships first due to FK constraints
  await queryInterface.bulkDelete("memberships", null, {});
  await queryInterface.bulkDelete("teams", null, {});
}
