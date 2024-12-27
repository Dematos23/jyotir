"use client";

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Client } from "@/types/types";
import { initialClientState } from "@/types/initialStates";
export default function NewClientModal({
  onClose,
  open,
  updateParent,
}: {
  onClose: () => void;
  open: boolean;
  updateParent: () => void;
}) {
  const onSuccess = () => {
    updateParent();
    onClose();
  };

  const [newClient, setNewClient] =
    useState<Partial<Client>>(initialClientState);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    if (newClient) {
      setNewClient({ ...newClient, name: newName });
    }
  };
  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLastname = event.target.value;
    if (newClient) {
      setNewClient({ ...newClient, lastname: newLastname });
    }
  };
  const handleDniChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dni = event.target.value;
    if (newClient) {
      setNewClient({ ...newClient, dni: dni });
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    if (newClient) {
      setNewClient({ ...newClient, email: newEmail });
    }
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;
    if (newClient) {
      setNewClient({ ...newClient, phone: newPhone });
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!(newClient?.name?.trim() && newClient?.lastname?.trim())) {
      e.preventDefault();
      return;
    }
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error || "Error desconocido al crear cliente");
      }
      onSuccess();
    } catch (error) {
      throw new Error("Error al crear cliente. Intenta nuevamente.");
    }
  };

  return (
    <Transition show={open}>
      {/* <Dialog.Overlay className="fixed inset-0 z-40 bg-black bg-opacity-75" /> */}
      <Dialog open={open} onClose={onClose} className="relative z-10">
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
        </Transition.Child>
        {/* <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        /> */}

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Crear nuevo cliente
                      </Dialog.Title>
                      {/* formulario */}
                      <div className="mt-2">
                        <form className="h-full flex flex-col pb-6">
                          {/* NOMBRE */}
                          <div className="mt-5 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre
                              </label>
                              <div className="mt-2">
                                <input
                                  placeholder="Nombre"
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  onChange={handleNameChange}
                                />
                              </div>
                            </div>
                            {/* APELLIDO  */}
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Apellido
                              </label>
                              <div className="mt-2">
                                <input
                                  placeholder="Apellido"
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  onChange={handleLastnameChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* DNI */}
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Dni
                              </label>
                              <div className="mt-2">
                                <input
                                  placeholder="Dni"
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  onChange={handleDniChange}
                                />
                              </div>
                            </div>
                            {/* EMAIL */}
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  placeholder="Email"
                                  type="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  onChange={handleEmailChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* PHONE */}
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Teléfono
                              </label>
                              <div className="mt-2">
                                <input
                                  placeholder="Teléfono"
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  onChange={handlePhoneChange}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* BOTONES */}
                <div className="bg-gray-50 px-6 py-3 flex justify-end gap-x-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    Guardar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
