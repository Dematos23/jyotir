import findUser from "@/utils/findUser";
import prisma from "@/utils/prisma";
import passVerify from "@/middlewares/passVerify";
import jwToken from "@/utils/jwToken";

export default class AuthService {
  static async login(email: string, password: string) {
    try {
      const foundUser = await findUser(email);
      if (!foundUser) throw new Error("no se encontró el usuario");

      const match = await passVerify(foundUser.password, password);
      if (!match) throw new Error("Credenciales incorrectas");

      const user = {
        name: foundUser.name,
        lastname: foundUser.lastname,
        spiritualName: foundUser.spiritualName,
        role: foundUser.role,
      };

      const token = jwToken(user);
      return { token, user };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
