const prisma = require("../utils/prisma");
const findUser = require("../utils/findUser");

class ClientsService {
  static async post(body) {
    const client = await prisma.clients.create({
      data: {
        name: body.name,
        lastname: body.lastname,
        dni: body.dni,
        email: body.email,
        phone: body.phone,
        emergencyContact: body.emergencyContact,
        district: body.district,
      },
      select: {
        id: true,

        name: true,
        lastname: true,
        dni: true,
        email: true,
        phone: true,
        emergencyContact: true,
        district: true,
      },
    });

    return client;
  }

  static async get() {
    return await prisma.clients.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        dni: true,
        email: true,
        phone: true,
        // emergencyContact: true,
        district: true,
      },
    });

    return await prisma.users.findMany({
      where: {
        OR: [{ role: "ADMIN" }, { role: "EXTERNO" }, { role: "SUPER_ADMIN" }],
      },
      select: {
        email: true,
        name: true,
        lastname: true,
        spiritualName: true,
        role: true,
        state: true,
      },
    });
  }

  static async put(body) {
    const client = await prisma.clients.update({
      where: { id: body.clientId },
      data: {
        name: body.name,
        lastname: body.lastname,
        dni: body.dni,
        email: body.email,
        phone: body.phone,
        emergencyContact: body.emergencyContact,
        district: body.district,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        dni: true,
        email: true,
        phone: true,
        emergencyContact: true,
        district: true,
      },
    });

    return client;
  }
}

module.exports = ClientsService;
