"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { Session, LoginContextProviderProps } from "@/types/types";
import {initialSession} from "@/types/initialStates"
import { setTokenInterceptor } from "@/services/api/backend.api";

interface LoginContext {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}

export const LoginContext = createContext<LoginContext | null>(null);

export default function LoginContextProvider({children}: LoginContextProviderProps) {
  const [session, setSession] = useState<Session>(initialSession);

  useEffect(()=>{
    setTokenInterceptor(()=>session.token)
  },[session])

  return (
    <LoginContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error(
      "Se está intentando usar LoginContext fuera de de LoginContectProvider"
    );
  }
  return context;
}
