const findUser = require("../utils/findUser");

async function clientCreationValidator(req, res, next) {
  const currentUser = await findUser({ id: req.body.currentUserId });

  if (currentUser.state === "INACTIVO") {
    return res.status(401).json({ message: "Tu usuario se encuentra inactivo!" });
  }

  if (
    currentUser.role !== "EXTERNO" &&
    currentUser.role !== "ADMIN" &&
    currentUser.role !== "SUPER_ADMIN" &&
    currentUser.role !== "DEV"
  ) {
    return res.status(401).json({ message: "No tienes permisos para realizar esta acción" });
  }
  next();
}

module.exports = clientCreationValidator;
