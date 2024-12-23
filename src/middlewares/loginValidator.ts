import jwt from "jsonwebtoken";
import findUser from "@/utils/findUser";

async function loginValidator(req: any) {
  const key = process.env.JWT_SECRET;
  if (!key) {
    throw new Error("No se encontró secret Key");
  }

  const authHeader = req.body.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Sin datos de inicio de sesión");
  }

  const result = jwt.verify(token, key);
  if (result instanceof jwt.JsonWebTokenError) {
    throw new Error("Credenciales inválidas");
  }

  if (typeof result !== "object" || result === null || !("id" in result)) {
    throw new Error("Credenciales inválidas");
  }

  const user = await findUser(result.id);
  if (!user) {
    throw new Error("no se encontró usuario");
  }
  if (!("id" in user) || !("role" in user)) {
    throw new Error("no se encontró usuario");
  }

  req.body = {
    ...req.body,
    currentUserId: user.id,
    currentUserRole: user.role,
  };
}

export default loginValidator;
