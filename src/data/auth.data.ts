import AuthController from "@/controllers/auth.controller";

export default class AuthData{
    static async login(email: string, password: string){
        try {
            const result = await AuthController.login(email, password);
            if ("error" in result) {
              return ({ error: result.error });
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
}