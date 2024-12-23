const findUser = require("../utils/findUser");

async function adminValidator(req, res, next) {
  const currentUser = await findUser({ id: req.body.currentUserId });
  if (
    currentUser.role !== "ADMIN" &&
    currentUser.role !== "SUPER_ADMIN" &&
    currentUser.role !== "DEV"
  ) {
    return res.status(401).json({ message: "No tienes permisos para realizar esta acción" });
  }
  next();
}

module.exports = adminValidator;
