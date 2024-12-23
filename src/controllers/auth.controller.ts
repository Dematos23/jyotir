import AuthService from "@/services/auth.service";

class AuthController {
  static async login(email: string, password: string) {
    try {
      const res = AuthService.login(email, password);

      return res;
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "Error desconocido en authcontroller" };
    }
  }
}

export default AuthController;
