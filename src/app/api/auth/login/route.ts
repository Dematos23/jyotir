import { NextResponse } from "next/server";
import AuthController from "@/controllers/auth.controller";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const result = await AuthController.login(email, password);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
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

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
