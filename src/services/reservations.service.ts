import { backendApi } from "./api/backend.api";
import { Reservation } from "@/types/types";

const getReservations = async (
  currentUserRole: string
): Promise<Reservation[]> => {
  try {
    console.log(currentUserRole);

    const res = await backendApi.get<Reservation[]>("/reservations");
    const resEval = await backendApi.get<Reservation[]>("/reservationsEval");
    const role = currentUserRole;
    if (role === "DEV" || role === "SUPER_ADMIN" || role === "ADMIN") {
      console.log("resEval");
      console.log(resEval);
      return resEval.data;
    } else {
      console.log("res");
      console.log(res);
      return res.data;
    }
  } catch (error) {
    throw new Error();
  }
};

const postReservation = async (
  payload: Partial<Reservation>
): Promise<Reservation> => {
  try {
    const res = await backendApi.post<Reservation>("/reservations", payload);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

const evalReservation = async (
  payload: Partial<Reservation>
): Promise<Reservation> => {
  try {
    const res = await backendApi.put<Reservation>("/reservationsEval", payload);
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

export { getReservations, postReservation, evalReservation };
