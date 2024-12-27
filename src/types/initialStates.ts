import { User, Session, Client } from "@/types/types";

export const initialUser: User = {
  id: "",
  name: "",
  lastname: "",
  spiritualName: undefined,
  email: "",
  role: "",
  state: "",
};

export const initialSession: Session = {
  // token: "",
  user: {
    name: "",
    lastname: "",
    spiritualName: undefined,
    role: "",
  },
  isLoggedIn: false,
};

export const initialClientState: Partial<Client> = {
  name: "",
  lastname: "",
  dni: "",
  email: "",
  phone: "",
};
