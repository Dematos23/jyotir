import { useState } from "react";
import { Reservation, Office, ReservationState } from "../types/types";

interface Data {
  id: String | undefined;
  [key: string]: any;
}

interface CardsProps<C> {
  data: C[];
  isCardButton?: boolean;
  cardButtonFunction?: (item: C) => void;
}

export default function CardsViews<C extends Data>({
  data,
  isCardButton,
  cardButtonFunction,
}: CardsProps<C>) {
  return (
    <div className="fixed max-h-[calc(100vh-250px)] scrollbar-hide overflow-y-auto w-full">
      <div className="w-600px flex flex-row flex-wrap m-8 gap-4 justify-between text-sm ">
        {data.map((item, index) => (
          <div
            key={index}
            className="shadow-lg card grid grid-cols-4 gap-3 rounded-md ring-1 ring-inset ring-gray-100"
          >
            <div className="col-span-4 grid grid-cols-4 border-b-2 border-slate-200 pb-2">

            <p className="text-xl col-span-3">{item.name}</p>
            {isCardButton && cardButtonFunction ? (
              <button
                className="col-span-1 w-3/4 justify-self-end rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => cardButtonFunction(item)}
              >
                Editar
              </button>
            ) : (
              <></>
            )}

              
            </div>

            {/* Fecha y hora */}
            <div className="col-span-full grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <p className=" font-semibold font-bold">Fecha</p>
                <p className="rounded-md p-1.5">{item.date}</p>
              </div>
              <div className="col-span-1">
                <p className=" font-semibold">Inicio</p>
                <p className="rounded-md p-1.5">{item.startTime}</p>
              </div>
              <div className="col-span-1">
                <p className=" font-semibold">Fin</p>
                <p className="rounded-md p-1.5">{item.endTime}</p>
              </div>
            </div>

            {/* Sala y estado */}
            <div className="col-span-2">
              <p className=" font-semibold">Sala</p>
              <p className="rounded-md p-1.5">{item.office}</p>
            </div>
            <div className="col-span-2">
              <p className=" font-semibold">Estado</p>
              <p className="rounded-md p-1.5">{item.state}</p>
            </div>

            {/* Externos y Clientes */}
            <div className="col-span-2">
              <p className=" font-semibold">Terapeutas</p>
              <div>
                <p className="rounded-md p-1.5">
                  {item.users.map(
                    (item: C, index: any) => `${item.name} ${item.lastname} `
                  )}
                </p>
              </div>
            </div>
            <div className="col-span-2">
              <p className=" font-semibold">Clientes</p>
              <div>
                <p className="rounded-md p-1.5">
                  {item.clients.map(
                    (item: C, index: any) => `${item.name} ${item.lastname} `
                  )}
                </p>
              </div>
            </div>

            {/* Implementos y Observaciones */}
            <div className="col-span-2">
              <p className=" font-semibold">Implementos</p>
              <p className="rounded-md p-1.5">{item.implementos}</p>
            </div>
            <div className="col-span-2">
              <p className=" font-semibold">Observaciones</p>
              <p className="rounded-md p-1.5">{item.observation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
