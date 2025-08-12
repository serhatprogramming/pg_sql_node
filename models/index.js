import Note from "./note.js";
import User from "./user.js";
import Membership from "./membership.js";
import Team from "./team.js";

User.hasMany(Note);
Note.belongsTo(User);

User.belongsToMany(Team, {
  through: Membership,
  foreignKey: "user_id",
  otherKey: "team_id",
});

Team.belongsToMany(User, {
  through: Membership,
  foreignKey: "team_id",
  otherKey: "user_id",
});

// Note.sync({ alter: true });
// User.sync({ alter: true });

export { Note, User, Team, Membership };
