import getCurrentUser from "@/utils/getCurrentUser";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";

export default function Session({ searchParams }: { searchParams: { visible?: string } }) {
  const isVisible = searchParams.visible === "true";
  const user = getCurrentUser();
  const handleLogout = () => {
    cookies().delete("token");
  }

  return (
    <div>
      <div className="mb-4">
        <Link
          href="?visible=true"
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
        >
          Mostrar
        </Link>
        <Link
          href="?visible=false"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition"
        >
          Ocultar
        </Link>
      </div>

      {/* Contenido con transición */}
      <div
        className={`mt-4 p-4 bg-gray-100 rounded transition-all duration-300 ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        Este es el contenido que cambia basado en el clic del botón.
      </div>
    </div>
  );
  // "error" in user ? (
  //   // INICIAR SESION
  //   <Link href="/login">
  //     <button
  //       type="submit"
  //       className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold  text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  //     >
  //       Iniciar sesión
  //     </button>
  //   </Link>
  // ) : (
  //   <div>
  //     {/* MENU DE USUARIO LOGEADO */}
  //     <div className="relative ml-3">
  //       <Link href="?visible=!isVisible">
  //         <button className="relative flex">
  //           <span className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
  //             {user.name} {user.lastname}
  //             <ChevronDownIcon
  //               className="ml-2 h-5 w-5 text-white"
  //               aria-hidden="true"
  //             />
  //           </span>
  //         </button>
  //       </Link >
  //       <div>
  //         <div className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-red-400 ">
  //           <Link
  //             href="/"
  //             className="block px-2 py-1 text-sm text-gray-700 hover:text-white"
  //             onClick={handleLogout}
  //           >
  //             Cerrar sesión
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
