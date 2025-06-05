const checkRole = (req, res, next) => {
  const { role } = req.user;

  if (!role) {
    return res.status(400).json({ message: "you are not admin" });
  }
  next();
};

module.exports = checkRole;
