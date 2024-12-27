import { getPropertyIndex } from "@/utils/getPropertyIndex";
import { Client } from "@/types/types";
import NewClientModal from "@/components/NewClientModal";
import Table from "@/components/Table";
import { Headers } from "@/types/table.types";
import ClientController from "@/controllers/client.controller";

export default async function Clients() {
  const clients: Client[]= ClientController.get()
  // const [headers, setHeaders] = useState<Headers[]>([]);
  // const [thInRowHeaders, setTnInRowHeaders] = useState<Headers[]>([]);

  // const [showNewClientModal, setShowNewClientModal] = useState<boolean>(false);
  // const openNewClientModal = () => setShowNewClientModal(true);
  // const closeNewClientModal = () => setShowNewClientModal(false);

  let headers: Headers[] = [];
  let thInRowHeaders: Headers[] = [];
  let showNewClientModal: boolean = false;
  const openNewClientModal = () => (showNewClientModal = true);
  const closeNewClientModal = () => (showNewClientModal = false);

  async function getClients(): Promise<Client[]> {
    const res = await fetch("/api/clients", { method: "GET" });
    if (!res.ok) throw new Error("Error al obtener clientes");
    return await res.json();
  }

  const handleClients = async () => {
    try {
      const data = await getClients();

      const clientHeaders = [
        { head: "Dni", location: getPropertyIndex(data[0], "dni") },
        { head: "Email", location: getPropertyIndex(data[0], "email") },
        { head: "Teléfono", location: getPropertyIndex(data[0], "phone") },
      ];
      // setHeaders(clientHeaders);
      headers = clientHeaders;

      const ThInRow = [
        { head: "Nombre", location: getPropertyIndex(data[0], "name") },
        { head: "Apellido", location: getPropertyIndex(data[0], "lastname") },
      ];
      // setTnInRowHeaders(ThInRow);
      thInRowHeaders = ThInRow;
      return data
        .map((client) => ({
          ...client,
          dni: client.dni || "",
          email: client.email || "",
          phone: client.phone || "",
          district: client.district || "",
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      throw new Error("Error al cargar los clientes");
    }
  };


  return (
    <div>
      <button
        className="mx-8 rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={openNewClientModal}
      >
        Nuevo Cliente
      </button>
      <Table
        // handleData={handleClients}
        data={clients}
        headers={headers}
        thInRowHeaders={thInRowHeaders}
      />
      <NewClientModal
        onClose={closeNewClientModal}
        open={showNewClientModal}
        updateParent={handleClients}
      />
    </div>
  );
}
