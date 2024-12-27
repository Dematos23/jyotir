"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import AuthController from "@/controllers/auth.controller";
import { useAuth } from "@/context/AuthContext";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);

    // const { setSession } = useAuth();
    const result = await AuthController.login(email, password);
    return result;
    // if (!result) throw new Error("Error al iniciar sesión");
  }

  export async function validateToken() {
    const authToken = cookies().get("auth_token");
    if (!authToken) return { error: "No autenticado" };
    try {
      const decodedUser = jwt.verify(
        authToken.value,
        process.env.JWT_SECRET || ""
      ) as {
        user: {
          name: string;
          lastname: string;
          spiritualName?: string | null;
          role: string;
        };
      };

      if (!decodedUser)
        throw new Error("Datos de usuario faltantes en el token");
      console.log(decodedUser);

      return decodedUser;
    } catch (error) {
      return { error: "Token inválido" };
    }
  }
