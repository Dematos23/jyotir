import { NextResponse } from "next/server";
import AuthController from "@/controllers/auth.controller";
import { useAuth } from "@/context/AuthContext";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { setSession } = useAuth();

  try {
    const result = await AuthController.login(email, password);
    console.log("aqui");
    
    if (!result) throw new Error("Error al iniciar sesión");
    console.log(result);
    

    const { token, user } = result;
    if (typeof token !== "string" || !token) {
      throw new Error("El token no es válido no no está definido");
    }

    const response = NextResponse.json({ token, user });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });
    const context = {
      user,
      isLoggedIn: true,
    };
    setSession(context);

    return result;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
