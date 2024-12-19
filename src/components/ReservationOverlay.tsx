"use client";

import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Reservation, Office, ReservationState } from "../types/types";
import { evalReservation } from "../services/reservations.service";

export default function ReservationOverlay({
  reservation,
  onClose,
  open,
  updateParent,
}: {
  reservation: Reservation;
  onClose: () => void;
  open: boolean;
  updateParent: () => void;
}) {

  const [currentReservation, setCurrentReservation] =
    useState<Reservation>(reservation);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentReservation({
      ...currentReservation,
      state: event.target.value as ReservationState,
    });
  };

  const handleOfficeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentReservation({
      ...currentReservation,
      office: event.target.value as Office,
    });
    console.log(typeof currentReservation.startTime);
    console.log(typeof currentReservation.endTime);
  };

  const handleObservationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurrentReservation({
      ...currentReservation,
      observation: event.target.value,
    });
  };

  const onCancel = () => {
    updateParent();
    onClose();
  };

  const handleSubmit = async () => {
    const payload: Partial<Reservation> = {
      id: currentReservation?.id,
      office: currentReservation?.office,
      state: currentReservation?.state,
      observation: currentReservation?.observation,
    };

    const updatedReservation = await evalReservation(payload);
    updateParent();
    onClose();
    return updatedReservation;
  };

  useEffect(() => {
    setCurrentReservation(reservation);
  }, [reservation]);

  return (
    <Transition show={open}>
      <Dialog
        onClose={onCancel}
        className="z-50 relative flex flex-col h-screen"
      >
        {/* CAPA OSCURA */}
        <Transition.Child
        // enter="transition-opacity ease-linear duration-300"
        // enterFrom="opacity-0"
        // enterTo="opacity-100"
        // leave="transition-opacity ease-linear duration-300"
        // leaveFrom="opacity-100"
        // leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
              // enter="transform transition ease-in-out duration-500 duration-700"
              // enterFrom="translate-x-full"
              // enterTo="translate-x-0"
              // leave="transform transition ease-in-out duration-500 duration-700"
              // leaveFrom="translate-x-0"
              // leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md flex flex-col h-full">
                  {/* ICONO DE "X" PARA CERRAR OVERLAY */}
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4">
                    <button
                      type="button"
                      onClick={() => onClose()}
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                    >
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                  {/* CONTENIDO DEL OVERLAY */}
                  <div className="flex flex-col h-screen bg-white py-6">
                    {/* INFO NO EDITABLE */}
                    <div className="flex-1 flex flex-col bg-white px-4">
                      <Dialog.Title className="text-lg text-center font-semibold leading-4 text-gray-900">
                        Reserva de Sala
                      </Dialog.Title>
                      <div className="flex justify-center items-center gap-x-3">
                        {/* <CalendarDaysIcon
                          aria-hidden="true"
                          className="h-1/4 w-1/4 text-gray-300"
                        /> */}
                      </div>
                      <h1 className="mt-6">Servicio</h1>
                      <h1 className="text-base font-semibold leading-4 text-gray-900 mb-2">
                        {currentReservation
                          ? `${currentReservation.name}`
                          : null}
                      </h1>
                      <div className="grid gap-x-6 gap-y-8 grid-cols-12 mt-5">
                        <div className="col-span-12 sm:col-span-4">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Fecha
                          </label>
                          <p>{currentReservation.date}</p>
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Hora inicio
                          </label>
                          <p>{currentReservation.startTime}</p>
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Hora fin
                          </label>
                          <p>{currentReservation.endTime}</p>
                        </div>
                      </div>
                      <div className="mt-5">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Clientes:
                        </label>
                        {currentReservation.clients.map((item, index) => (
                          <div key={index}>
                            <p className="text-sm">
                              {item.name} {item.lastname}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Terapeutas:
                        </label>
                        {currentReservation.users.map((item, index) => (
                          <div key={index}>
                            <p className="text-sm">
                              {item.name} {item.lastname}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Implementos
                        </label>
                        <textarea
                          disabled
                          rows={3}
                          value={currentReservation.implementos}
                          className="block w-full scrollbar-hide rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:leading-6"
                        ></textarea>
                      </div>
                    </div>

                    {/* FORMULARIO DE PERFIL */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide mt-6 px-4">
                      <form className="h-full flex flex-col border-b border-gray-900/10 pb-6">
                        {/* Estado y Office */}
                        <div className="grid gap-x-6 gap-y-8 grid-cols-6">
                          {/* Office */}
                          <div className="col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Sala
                            </label>
                            <div className="mt-2">
                              <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 max-w-xs text-sm leading-6"
                                value={currentReservation.office}
                                onChange={handleOfficeChange}
                              >
                                {Object.values(Office).map((value, index) => (
                                  <option key={index} value={value}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {/* Estado */}
                          <div className="col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Estado
                            </label>
                            <div className="mt-2">
                              <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 max-w-xs text-sm leading-6"
                                value={currentReservation.state}
                                onChange={handleStateChange}
                              >
                                {Object.values(ReservationState).map(
                                  (value, index) => (
                                    <option key={index} value={value}>
                                      {value}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="grid gap-x-6 gap-y-8 grid-cols-6">
                          <div className="mt-5 col-span-12">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Observaciones
                            </label>
                            <textarea
                              placeholder="Agregar comentarios..."
                              rows={3}
                              value={currentReservation.observation}
                              className="block w-full scrollbar-hide rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                              onChange={handleObservationChange}
                            ></textarea>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* BOTONES */}
                    <div className="mt-6 px-4 flex justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={onCancel}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        onClick={handleSubmit}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
