export interface User {
  id: string;
  name: string;
  lastname: string;
  spiritualName: string | undefined;
  email: string;
  role: string;
  state: string;
  password?: string;
}

export interface NewUser {
  id: string;
  name: string;
  lastname: string;
  spiritualName: string | undefined;
  email: string;
  role: string;
  state: string;
  password: string;
}

export interface SessionUser {
  name: string;
  lastname: string;
  spiritualName: string | undefined;
  role: string;
}

export interface OverlayProps {
  onClose: () => void;
  open: boolean;
}

export interface Client {
  id: string;
  name: string;
  lastname: string;
  dni?: string | null;
  email?: string | null;
  phone?: string | null;
  emergencyContact?: string | null;
  district?: string | null;
  reservations?: Reservation[];
}

export enum Office {
  SALON_PRINCIPAL = "Salón principal",
  SALON_ESPEJO = "Salón espejo",
  SALA_1 = "Sala 1",
  CONSULTORIO_1 = "Consultorio 1",
  CONSULTORIO_2 = "Consultorio 2",
}

export enum ReservationState {
  APROBADO = "Aprobado",
  EVALUACION = "Evaluación",
  OBSERVACION = "Observación",
  RECHAZADO = "Rechazado",
}

export interface Reservation {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  office: Office | string;
  state: ReservationState;
  implementos?: string;
  observation?: string;
  clients: Partial<Client>[];
  users: Partial<User>[];
}

export interface SelectValue {
  value: string;
  label: string;
}

export interface Session {
  // token: string;
  user: SessionUser;
  isLoggedIn: boolean;
}

export type LoginContextProviderProps = {
  children: React.ReactNode;
};
