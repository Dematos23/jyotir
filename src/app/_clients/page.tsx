"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClients } from "@/services/clients.service";
import { getPropertyIndex } from "@/utils/getPropertyIndex";
import { Client } from "@/types/types";
import NewClientModal from "@/components/NewClientModal";
import Table from "@/components/Table";
import { useLoginContext } from "@/context/AuthContext";

export default function Clients() {
  const router = useRouter();
  const { session } = useLoginContext();
  const [loading, setLoading] = useState<boolean>(true);

  const [clients, setClients] = useState<Client[]>([]);
  const [headers, setHeaders] = useState<
    { head: string; location: number | undefined }[]
  >([]);
  const [thInRowHeaders, setTnInRowHeaders] = useState<
    {
      head: string;
      location: number | undefined;
    }[]
  >([]);

  const [showNewClientModal, setShowNewClientModal] = useState<boolean>(false);
  const initialClientState: Client = {
    id: "",
    name: "",
    lastname: "",
  };
  const [newClient, setNewClient] = useState<Client>(initialClientState);

  const openNewClientModal = () => {
    setShowNewClientModal(true);
  };

  const closeNewClientModal = () => {
    setShowNewClientModal(false);
  };

  const storeNewClient = (client: Client) => {
    setNewClient(client);
  };

  const handleClients = async () => {
    try {
      const data = await getClients();
      const Headers = [
        { head: "Dni", location: getPropertyIndex(data[0], "dni") },
        { head: "Email", location: getPropertyIndex(data[0], "email") },
        { head: "Teléfono", location: getPropertyIndex(data[0], "phone") },
        // { head: "Distrito", location: getPropertyIndex(data[0], "district") },
      ];
      setHeaders(Headers);
      const ThInRow = [
        { head: "Nombre", location: getPropertyIndex(data[0], "name") },
        { head: "Apellido", location: getPropertyIndex(data[0], "lastname") },
      ];
      setTnInRowHeaders(ThInRow);

      data.map((client) => {
        if (client.dni === null) {
          client.dni = "";
        }
        if (client.email === null) {
          client.email = "";
        }
        if (client.phone === null) {
          client.phone = "";
        }
        if (client.district === null) {
          client.district = "";
        }
      });

      data.sort((a, b) => a.name.localeCompare(b.name));
      setClients(data);
      setLoading(false);
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    const role = session.user.role;
    role === "SUPER_ADMIN" ||
    role === "ADMIN" ||
    role === "DEV" ||
    role === "EXTERNO"
      ? handleClients()
      : router.push("/");
  }, [router]);

  if (loading) return <Loading loading={loading} />;

  return (
    <div>
      <button
        className="mx-8 rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={openNewClientModal}
      >
        Nuevo Cliente
      </button>
      <Table
        data={clients}
        headers={headers}
        isThInRow={true}
        thInRowHeaders={thInRowHeaders}
        isColumnButton={false}
        // columButtonFunction={handleEdit}
      />
      <NewClientModal
        onClose={closeNewClientModal}
        open={showNewClientModal}
        updateParent={handleClients}
        // onSuccess={}
        storeNewClient={storeNewClient}
      />
    </div>
  );
}
