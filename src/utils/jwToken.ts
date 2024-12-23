import jwt from "jsonwebtoken";

function jwToken(json: object) {
  if (!process.env.JWT_SECRET) {
    throw new Error("Falta JWT_SECRET");
  }
  let token: string;
  try {
    token = jwt.sign(json, process.env.JWT_SECRET, { expiresIn: "1d" });
  } catch (error) {
    throw new Error("No se pudo generar el token JWT");
  }
  return token;
}

export default jwToken;
