exports.userAuth = (req, res, next) => {
  const userRole = req.session.user.id_role_user;
  if (userRole == 1) {
    if (err) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      if (decodedToken.role !== "Basic") {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        next();
      }
    }
  } else {
    return res.status(401).json({ message: "Not authorized, token not available" });
  }
};
