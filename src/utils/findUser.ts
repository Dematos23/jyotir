import prisma from "@/utils/prisma";
import { User } from "@/types/types";

export default async function findUser(email?: string, id?: string) {
  const where = email ? { email } : id ? { id } : null;

  if (!where) throw new Error("No se proporcionó un email o id");

  return await prisma.users.findUnique({
    where,
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      lastname: true,
      spiritualName: true,
      role: true,
      state: true,
    },
  });
}
