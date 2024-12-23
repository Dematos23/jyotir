import prisma from "@/utils/prisma";
import passVerify from "@/middlewares/passVerify";
import jwToken from "@/utils/jwToken";

class AuthService {
  static async login(email: string, password: string) {
    const foundUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        spiritualName: true,
        password: true,
        role: true,
        state: true,
      },
    });
    if (!foundUser) {
      throw new Error("no se encontró el usuario");
    }

    const match = await passVerify(foundUser.password, password);
    if (!match) {
      throw new Error("Credenciales incorrectas");
    }

    const user = {
      name: foundUser.name,
      lastname: foundUser.lastname,
      spiritualName: foundUser.spiritualName,
      role: foundUser.role,
    };

    let token;
    try {
      token = jwToken(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message); // Lanza un mensaje claro
      }
    }

    return { token, user };
  }
}

export default AuthService;
