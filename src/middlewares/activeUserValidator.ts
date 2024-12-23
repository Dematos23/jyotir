import findUser from "@/utils/findUser";

async function activeUserValidator(body: { id?: string; email?: string }) {
  const targetUser = await findUser(body);
  if (!targetUser) {
    return { message: "No se encontró el usuario" };
  }
  if ("message" in targetUser) {
    return targetUser;
  }
  if (targetUser.state !== "ACTIVO") {
    return { message: "El usuario se encuentra inactivo" };
  }
}

export default activeUserValidator;
