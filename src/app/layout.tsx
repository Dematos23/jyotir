import type { Metadata } from "next";
import "./globals.css";
import "../styles/loading.css";
import "../styles/homeLogo.css";
import "../styles/classes.css";
import { AuthProvider } from "@/context/AuthContext";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Veddy",
  description: "Gestor de citas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Nav />
          <div className="mt-20">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
