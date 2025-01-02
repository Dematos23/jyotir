import { cookies } from "next/headers";
import { decrypt } from "@/utils/jwToken";

export default function getCurrentUser() {
  const authToken = cookies().get("auth_token");
  if (!authToken) return { error: "Falta token" };
  try {
    const decodedUser = decrypt(authToken.value) as {
      name: string;
      lastname: string;
      spiritualName: string | null;
      role: string;
    };

    if (!decodedUser)
      throw new Error("Error al recuperar el usuario del token");
    if (!decodedUser.role || !decodedUser.name || !decodedUser.lastname) {
      throw new Error("Datos de usuario faltantes en el token");
    }

    return decodedUser;
  } catch (error) {
    return { error: "Token inválido" };
  }
}
