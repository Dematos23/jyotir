import AuthService from "@/services/auth.service";

export default class AuthController {
  static async login(email: string, password: string) {
    try {
      return AuthService.login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "Error desconocido en authcontroller" };
    }
  }
}
