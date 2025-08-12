const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    return next();
  }
  return res.status(403).json({ error: "Not Authorized" });
};

export default isAdmin;
