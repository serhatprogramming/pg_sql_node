import { User } from "../models/index.js";

const userExtractor = async (req, res, next) => {
  if (req.decodedToken) {
    req.user = await User.findByPk(req.decodedToken.id);
  } else {
    req.user = null;
  }
  next();
};
export default userExtractor;
