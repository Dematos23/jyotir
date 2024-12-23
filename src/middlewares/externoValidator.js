const findUser = require("../utils/findUser");

async function externoValidator(req, res, next) {
  const currentUser = await findUser({ id: req.body.currentUserId });
  if (currentUser.role !== "EXTERNO" && currentUser.role !== "DEV") {
    return res.status(401).json({ message: "No tienes permisos para realizar esta acción" });
  }
  next();
}

module.exports = externoValidator;