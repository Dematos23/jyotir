import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/jwToken";
import getCurrentUser from "@/utils/getCurrentUser";

export async function GET(req: Request) {
  const authToken = cookies().get("auth_token");

  if (!authToken) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    
    const user = getCurrentUser();
    if (!user) {
      throw new Error("Datos de usuario faltantes en el token");
    }

    return NextResponse.json({ user, isLoggedIn: true });
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
