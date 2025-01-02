import Link from "next/link";
import Image from "next/image";
import getCurrentUser from "@/utils/getCurrentUser";

export default function Nav() {
  const pathname = "/";

  const user = getCurrentUser();

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

  return (
    <div className="bg-blue-100">
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="logo" />
        </Link>
      </div>
    </div>
  );
}
