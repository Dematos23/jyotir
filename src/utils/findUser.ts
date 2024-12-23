import prisma from "@/utils/prisma";
import { User } from "@/types/types";

async function findUser(user: Partial<User>) {
  const where = user.email
    ? { email: user.email }
    : user.id
    ? { id: user.id }
    : null;

  if (!where) {
    return { message: "No se ha enviado id ni email" };
  }

  return await prisma.users.findUnique({
    where,
    select: {
      id: true,
      email: true,
      name: true,
      lastname: true,
      spiritualName: true,
      role: true,
      state: true,
    },
  });
}

export default findUser;
