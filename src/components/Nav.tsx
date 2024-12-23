"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { initialSession } from "@/types/initialStates";

export default function Nav() {
  const router = useRouter();
  const { session, setSession } = useAuth();

  const [navigation, setNavigation] = useState([
    { name: "Inicio", href: "/", role: ["ALL"], current: false },
    {
      name: "Reservas",
      href: "/reservations",
      role: ["ALL"],
      current: false,
    },
    {
      name: "Usuarios",
      href: "/users",
      role: ["SUPER_ADMIN", "DEV"],
      current: false,
    },
    {
      name: "Clientes",
      href: "/clients",
      role: ["ALL"],
      current: false,
    },
  ]);

  const handleLinkClick = (index: number) => {
    const updatedNavigation = navigation.map((item, idx) => ({
      ...item,
      current: idx === index,
    }));
    setNavigation(updatedNavigation);
  };

  function classNames(
    ...classes: (string | boolean | undefined | null)[]
  ): string {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = () => {
    setSession(initialSession);
    router.push("/");
  };

  // const [localSession, setLocalSession] = useState<string | null>(null);
  // useEffect(() => {
  //   setLocalSession(localStorage.getItem("session"));
  //   if (session.token === "") {
  //     if (localSession) {
  //       setSession(JSON.parse(localSession));
  //     }
  //   }
  // }, [localSession]);

  return (
    <Disclosure
      as="nav"
      className="bg-blue-100 fixed top-0 left-0 w-full z-50 shadow-md"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-blue-900 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Logo */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      className="h-8 w-auto"
                      src="/logoMini.png"
                      width={25}
                      height={25}
                      alt="Jyotir"
                    />
                  </Link>
                </div>
                {/* Nav Menu */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-blue-600 text-white"
                            : "text-blue-900 hover:bg-blue-400 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        hidden={
                          session?.user.role === ""
                            ? true
                            : item.role.includes(session.user.role) ||
                              item.role.includes("ALL")
                            ? false
                            : true
                        }
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => handleLinkClick(index)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {session.user.name ? (
                  <div>
                    {/* Boton de notificaciones */}
                    {/* <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                    {/* MENU DE USUARIO LOGEADO */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex">
                          <span className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold  text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {session.user.name} {session.user.lastname}
                            <ChevronDownIcon
                              className="ml-2 h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </span>

                          {/* <span className="absolute -inset-1.5" /> */}
                          {/* <span className="sr-only">Open user menu</span> */}
                          {/* <UserIcon aria-hidden="true" className="h-6 w-6 text-blue-600" /> */}

                          {/* <img className="h-8 w-8 rounded-full" src="/gita.png" alt="" /> */}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Tu perfil
                              </a>
                            )}
                          </Menu.Item>
                          {/* <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item> */}
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={handleLogout}
                              >
                                Cerrar sesión
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  // INICIAR SESION
                  <Link href="/login" passHref className="">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold  text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Iniciar sesión
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-blue-600 text-white"
                      : "text-blue-900 hover:bg-blue-400 hover:text-white",
                    "block rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
