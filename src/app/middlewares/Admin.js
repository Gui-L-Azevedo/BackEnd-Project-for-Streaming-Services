export default (req, res, next) => {
  if (!req.user.administrador) {
    return res
      .status(403)
      .send({ message: "Only admins can perform this action" });
  }
  next();
};
