import type { Metadata } from "next";
import "./globals.css";
import "../styles/loading.css";
import "../styles/homeLogo.css";
import "../styles/classes.css";
import Nav from "@/components/Nav";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Jyotir",
  description: "Gestor de citas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          {/* <NavOld /> */}
          <Nav />
          <div className="mt-20"></div>
        </body>
      </AuthProvider>
    </html>
  );
}
