const findUser = require("../utils/findUser");

async function actualUserValidator(req, res, next) {
  const currentUser = await findUser({ id: req.body.currentUserId });
  const profileUser = await findUser({ email: req.body.currentEmail });
  if (currentUser.id !== profileUser.id) {
    return res.status(401).json({ message: "No puedes modificar un usuario distinto al tuyo" });
  }
  next();
}

module.exports = actualUserValidator;
