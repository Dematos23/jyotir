import Session from "@/components/Session";
import Image from "next/image";

export default function Home({
  searchParams,
}: {
  searchParams: { visible?: string };
}) {
  return (
    <main className="flex flex-col items-center justify-between">
      <div>
        <Session searchParams={searchParams} />
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
