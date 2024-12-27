import ClientsService from "@/services/client.service";
import { Client } from "@/types/types";

export default class ClientController {
  static async post(newClient: Client) {
    try {
      return ClientsService.post(newClient);
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "Error desconocido en clientcontroller" };
    }
  }

  static async get() {
    try {
      return ClientsService.get();
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "Error desconocido en clientcontroller" };
    }
  }

  static async put(client: Client) {
    try {
      return ClientsService.put(client);
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: "Error desconocido en clientcontroller" };
    }
  }
}
