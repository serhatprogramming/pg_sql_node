import { USER } from "../models/index.js";

const userExtractor = async (req, res, next) => {
  if (req.decodedToken) {
    req.user = await USER.findByPk(req.decodedToken.id);
  } else {
    req.user = null;
  }
  next();
};
export default userExtractor;
