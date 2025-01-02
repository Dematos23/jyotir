"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Session } from "@/types/types";
import { initialSession } from "@/types/initialStates";

interface AuthContextProps {
  session: Session;
  setSession: (session: Session) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session>(initialSession);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/validate", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setSession(data);
        } else {
          setSession(initialSession);
        }
      } catch (error) {
        console.error("Error al validar la sesión actual:", error);
        setSession(initialSession);
      }
    };
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
