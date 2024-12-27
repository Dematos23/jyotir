import prisma from "@/utils/prisma";
import { Client } from "@/types/types";

export default class ClientsService {
  static async post(client: Client) {
    const newClient = await prisma.clients.create({
      data: {
        name: client.name,
        lastname: client.lastname,
        dni: client.dni,
        email: client.email,
        phone: client.phone,
        emergencyContact: client.emergencyContact,
        district: client.district,
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

    return newClient;
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
        emergencyContact: true,
        district: true,
      },
    });
  }

  static async put(client: Client) {
    const updatedClient = await prisma.clients.update({
      where: { id: client.id },
      data: {
        name: client.name,
        lastname: client.lastname,
        dni: client.dni,
        email: client.email,
        phone: client.phone,
        emergencyContact: client.emergencyContact,
        district: client.district,
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

    return updatedClient;
  }
}