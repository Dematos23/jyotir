"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReservations } from "@/services/reservations.service";
import { getClients } from "@/services/clients.service";
import { getExternos } from "@/services/users.service";
import { getPropertyIndex } from "@/utils/getPropertyIndex";
import {
  Reservation,
  ReservationState,
  Office,
  SelectValue,
  User,
} from "@/types/types";
import Table from "@/components/Table";
import NewReservationModal from "@/components/NewReservationModal";
import ReservationOverlay from "@/components/ReservationOverlay";
import Select from "react-tailwindcss-select";
import Calendar from "@/components/CalendarView";
import CardsView from "@/components/CardsView";
import { useLoginContext } from "@/context/loginContext";

export default function Reservations() {
  // CLIENTS
  const [formattedClients, setFormattedClients] = useState<
    { value: string; label: string }[]
  >([]);

  const handleClients = async () => {
    try {
      const data = await getClients();
      const formattedClients = data.map((client) => ({
        value: client.id,
        label: `${client.name} ${client.lastname}`,
      }));
      setFormattedClients(formattedClients);
    } catch (error) {
      throw new Error();
    }
  };

  // USERS
  const [formattedUsers, setFormattedUsers] = useState<
    { value: string; label: string }[]
  >([]);
  const handleUsers = async () => {
    try {
      const data = await getExternos();
      const formattedUsers = data.map((user) => ({
        value: user.id,
        label: `${user.name} ${user.lastname}`,
      }));
      setFormattedUsers(formattedUsers);
    } catch (error) {
      throw new Error();
    }
  };

  // RESERVATIONS
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const handleReservations = async () => {
    try {
      const data = await getReservations(session.user.role);
      const anyReservation = data[0];
      const dynamicHeaders = [
        { head: "Fecha", location: getPropertyIndex(anyReservation, "date") },
        {
          head: "Hora inicio",
          location: getPropertyIndex(anyReservation, "startTime"),
        },
        {
          head: "hora fin",
          location: getPropertyIndex(anyReservation, "endTime"),
        },
        { head: "Sala", location: getPropertyIndex(anyReservation, "office") },
        { head: "Estado", location: getPropertyIndex(anyReservation, "state") },
      ];
      setHeaders(dynamicHeaders);

      const ThInRow = [
        { head: "Reserva", location: getPropertyIndex(anyReservation, "name") },
      ];
      setThInRowHeaders(ThInRow);

      data.sort((a, b) => a.name.localeCompare(b.name));
      setReservations(data);
      
      setLoading(false);
    } catch (error) {
      throw new Error();
    }
  };

  // VISTAS
  const [view, setView] = useState<string>("Tarjetas");
  const viewOptions: string[] = ["Tabla", "Tarjetas"];

  const handleView = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setView(event.target.value as string);
  };

  // VIEW PROPS
  const [headers, setHeaders] = useState<
    { head: string; location: number | undefined }[]
  >([]);
  const [thInRowHeaders, setThInRowHeaders] = useState<
    {
      head: string;
      location: number | undefined;
    }[]
  >([]);

  // HANDLE EDIT
  const handleEdit = (reservation: Reservation) => {
    if (reservation) {
      setShowReservationOverlay(true);
      setSelectedReservation(reservation);
    }
  };

  // NEW RESERVATION MODAL PROPS
  const [showNewReservationModal, setShowNewReservationModal] =
    useState<boolean>(false);

  const openNewReservationModal = () => {
    setShowNewReservationModal(true);
  };
  const closeNewReservationModal = () => {
    setShowNewReservationModal(false);
  };

  // RESERVATION OVERLAY PROPS
  const initialReservationState: Reservation = {
    id: "",
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    office: "",
    implementos: "",
    state: ReservationState.EVALUACION,
    observation: "",
    clients: [],
    users: [],
  };
  const [selectedReservation, setSelectedReservation] = useState<Reservation>(
    initialReservationState
  );
  const closeReservationOverlay = () => {
    setShowReservationOverlay(false);
  };
  const [showReservationOverlay, setShowReservationOverlay] =
    useState<boolean>(false);

  // FILTROS
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("Evaluación");
  const [selectedUsers, setSelectedUsers] = useState<
    { value: string; label: string }[]
  >([]);
  const handleSelectedUsers = (value: SelectValue | SelectValue[] | null) => {
    if (Array.isArray(value)) {
      setSelectedUsers(value);
    } else if (value) {
      setSelectedUsers([value]);
    } else {
      setSelectedUsers([]);
    }
    console.log(selectedUsers);
  };

  const [selectedClients, setSelectedClients] = useState<
    { value: string; label: string }[]
  >([]);

  const handleSelectedClients = (value: SelectValue | SelectValue[] | null) => {
    if (Array.isArray(value)) {
      setSelectedClients(value);
    } else if (value) {
      setSelectedClients([value]);
    } else {
      setSelectedClients([]);
    }
  };

  // FILTERED RESERVATIONS
  const filteredReservations = reservations.filter((reservation) => {
    // Filtro por rango de fechas
    if (selectedStartDate && selectedEndDate) {
      const reservationDate = new Date(
        reservation.date.split("/").reverse().join("-")
      ); // Convierte la fecha a formato ISO
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);
      if (reservationDate < startDate || reservationDate > endDate)
        return false;
    }

    // FILTER OFFICE
    if (
      selectedOffice &&
      reservation.office !== selectedOffice &&
      selectedOffice !== "all"
    ) {
      return false;
    }

    // FILTER STATE
    if (
      selectedState &&
      reservation.state !== selectedState &&
      selectedState !== "all"
    ) {
      return false;
    }

    // Filtro por usuarios (verifica si algún usuario coincide)
    if (selectedUsers.length > 0) {
      const userFullNames = reservation.users.map(
        (user) => `${user.name} ${user.lastname}`
      );
      const hasMatchingUser = selectedUsers.some((selectedUser) =>
        userFullNames.includes(selectedUser.label)
      );
      if (!hasMatchingUser) return false;
    }

    // Filtro por clientes (verifica si algún cliente coincide)
    if (selectedClients.length > 0) {
      const clientFullName = reservation.clients.map(
        (client) => `${client.name} ${client.lastname}`
      );
      const hasMatchingClient = selectedClients.some((selectedClient) =>
        clientFullName.includes(selectedClient.label)
      );
      if (!hasMatchingClient) return false;
    }

    return true; // Si pasa todos los filtros, se incluye la reserva
  });

  const { session } = useLoginContext();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const role = session.user.role;
    if (
      role === "SUPER_ADMIN" ||
      role === "ADMIN" ||
      role === "DEV" ||
      role === "EXTERNO"
    ) {
      handleClients();
      handleUsers();
      handleReservations();
    } else {
      router.push("/");
    }
  }, [router]);

  console.log(session);
  
  if (loading) return <Loading loading={loading} />;

  return (
    <div>
      {/* FILTROS */}
      <div className="m-8 grid grid-cols-8 gap-6">
        <div className="col-span-1">
          <button
            className="mt-6 w-full md:w-5/6 h-10 rounded-md bg-blue-700 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={openNewReservationModal}
          >
            Crear Reserva
          </button>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Desde
          </label>
          <input
            type="date"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            value={selectedStartDate || ""}
            onChange={(e) => setSelectedStartDate(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Hasta
          </label>
          <input
            type="date"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            value={selectedEndDate || ""}
            onChange={(e) => setSelectedEndDate(e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Sala
          </label>
          <select
            className="block w-full w-auto rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
          >
            <option value="all">Todas</option>
            {Object.values(Office).map((office, index) => (
              <option key={index} value={office}>
                {office}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Estado
          </label>
          <select
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="all">Todos</option>
            {Object.values(ReservationState).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Terapeutas
          </label>
          <Select
            isMultiple={true}
            value={selectedUsers}
            options={formattedUsers}
            onChange={handleSelectedUsers}
            primaryColor="blue"
            isSearchable={true}
            classNames={{
              menu: "absolute w-full bg-white rounded-md ring-1 ring-inset border-0 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6",
            }}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Clientes
          </label>
          <Select
            isMultiple={true}
            value={selectedClients}
            options={formattedClients}
            onChange={handleSelectedClients}
            primaryColor="blue"
            isSearchable={true}
            classNames={{
              searchContainer: "block",
              menu: "absolute w-full bg-white overflow-y-auto scrollbar-hide rounded-md ring-1 ring-inset border-0 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6",
            }}
          />
        </div>
        <div className="col-span-1 justify-self-end">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Vista
          </label>
          <select
            value={view}
            onChange={handleView}
            className="block w-auto rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            {viewOptions.map((view) => {
              return (
                <option value={view} key={view}>
                  {view}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* RESERVAS */}
      {(() => {
        switch (view) {
          case "Tabla":
            return (
              <Table
                data={filteredReservations}
                headers={headers}
                isThInRow={true}
                thInRowHeaders={thInRowHeaders}
                isColumnButton={true}
                columnButtonFunction={handleEdit}
              />
            );
          case "Calendario":
            return <></>;
          // return <Calendar/>
          case "Tarjetas":
            return (
              <CardsView
                data={filteredReservations}
                isCardButton={true}
                cardButtonFunction={handleEdit}
              />
            );
          default:
            break;
        }
      })()}

      <NewReservationModal
        onClose={closeNewReservationModal}
        open={showNewReservationModal}
        updateParent={handleReservations}
      />
      <ReservationOverlay
        reservation={selectedReservation}
        onClose={closeReservationOverlay}
        open={showReservationOverlay}
        updateParent={handleReservations}
      />
    </div>
  );
}
