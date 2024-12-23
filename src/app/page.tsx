"use client";

import Image from "../../node_modules/next/image";
// import Link from "../../node_modules/next/link";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useLoginContext } from "@/context/AuthContext";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) return <Loading loading={loading} />;

  return (
    <main className="flex flex-col items-center justify-between">
      <div>
        <Image
          className="homeLogo mt-8"
          src="/logoH.png"
          alt="Jyotir"
          width={500}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
