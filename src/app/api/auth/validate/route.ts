import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token");

  if (!authToken) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
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

    if (!decoded) {
      throw new Error("Datos de usuario faltantes en el token");
    }

    return NextResponse.json({ token: authToken.value, user: decoded });
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
