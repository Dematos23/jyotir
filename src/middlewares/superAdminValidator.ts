import findUser from "@/utils/findUser";

async function superAdminValidator(currentUserId: string) {
  if (!currentUserId) {
    return { message: "no se ha enviado el id del usuario" };
  }

  const currentUser = await findUser({ id: currentUserId });

  if (!currentUser) {
    return { message: "No se encontró el usuario" };
  }

  if ("message" in currentUser) {
    return currentUser;
  }

  if (currentUser.state === "INACTIVO") {
    return { message: "Tu usuario se encuentra inactivo!" };
  }

  if (currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "DEV") {
    return { message: "No tienes permisos para realizar esta acción" };
  }
}

export default superAdminValidator;
