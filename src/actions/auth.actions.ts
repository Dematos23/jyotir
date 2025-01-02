"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import AuthController from "@/controllers/auth.controller";
import { decrypt } from "@/utils/jwToken";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
//   const { setSession } = useAuth();
  try {
    const result = await AuthController.login(email, password);
    if (!result || 'error' in result) throw new Error("Error al iniciar sesión");
    const { token, user } = result;
    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });
    // const context = {
    //   user,
    //   isLoggedIn: true,
    // };
    // console.log(cookies().get("auth_token"));
    
    
    // setSession(context);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function validateToken(token: string) {
  const authToken = cookies().get("auth_token");
  if (!authToken) return { error: "No autenticado" };
  try {
    const decodedUser = decrypt(authToken.value)

    if (!decodedUser) throw new Error("Datos de usuario faltantes en el token");
    console.log(decodedUser);

    return decodedUser;
  } catch (error) {
    return { error: "Token inválido" };
  }
}
