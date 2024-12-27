"use client";

import Image from "../../node_modules/next/image";

export default function Home() {
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
