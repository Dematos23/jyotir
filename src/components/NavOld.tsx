"use client";

import Link from "next/link";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { redirect, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { initialSession } from "@/types/initialStates";

export default function NavOld() {
  const pathname = usePathname();

  const { session, setSession } = useAuth();
  const user = session.user;

  const navigation = [
    { name: "Inicio", href: "/", roles: ["ALL"] },
    {
      name: "Reservas",
      href: "/reservations",
      roles: ["ALL"],
    },
    {
      name: "Usuarios",
      href: "/users",
      roles: ["SUPER_ADMIN", "DEV"],
    },
    {
      name: "Clientes",
      href: "/clients",
      roles: ["ALL"],
    },
  ];

  const handleLogout = () => {
    setSession(initialSession);
    redirect("/");
  };

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
                {/* MOBILE BUTTON*/}
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
              {/* LOGO */}
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
                {/* NAV WIDE MENU */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`${
                          pathname === item.href
                            ? "bg-blue-600 text-white"
                            : "text-blue-900 hover:bg-blue-400 hover:text-white"
                        }
                          rounded-md px-3 py-2 text-sm font-medium`}
                        hidden={
                          "error" in user || user.role === ""
                            ? // user.role === ""
                              true
                            : item.roles.includes(user.role) ||
                              item.roles.includes("ALL")
                            ? false
                            : true
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {"error" in user ? (
                  // INICIAR SESION
                  <Link href="/login" passHref className="">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold  text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Iniciar sesión
                    </button>
                  </Link>
                ) : (
                  <div>
                    {/* MENU DE USUARIO LOGEADO */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex">
                          <span className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {user.name} {user.lastname}
                            <ChevronDownIcon
                              className="ml-2 h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </Menu.Button>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-red-400 ">
                          <Menu.Item>
                            <a
                              href="/"
                              className="block px-2 py-1 text-sm text-gray-700 hover:text-white"
                              onClick={handleLogout}
                            >
                              Cerrar sesión
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* MOBILE MENU */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "text-blue-900 hover:bg-blue-400 hover:text-white"
                  }
                    block rounded-md px-3 py-2 text-sm font-medium`}
                  hidden={
                    "error" in user || user.role === ""
                      ? true
                      : item.roles.includes(user.role) ||
                        item.roles.includes("ALL")
                      ? false
                      : true
                  }
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
