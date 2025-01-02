import jwt from "jsonwebtoken";

export function encrypt(json: object) {
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

export function decrypt(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("Falta JWT_SECRET");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
  
}
