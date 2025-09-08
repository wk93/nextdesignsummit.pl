import Header from "@/components/header/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative bg-nds-red">
        <div className="bg-red-cover absolute left-0 right-0 top-0 h-screen -z-[1]" />
        <Header className="py-10 text-nds-black" />
        <div className="container">
          <div className="flex w-full items-center justify-center">
            <img src="/theme/logo.svg" className="w-full" />
          </div>
        </div>
        <div className="container">
          <div className="flex w-full items-center justify-between mt-32 mb-50 text-small">
            <span>Warszawa, 7 listopada 2025</span>
            <span>Muzeum Historii Polski</span>
          </div>
        </div>
        <div className="container">
          <div className="pb-50">
            <h1 className="text-h1 text-nds-black">
              Nowa era projektowania zaczyna się tutaj
            </h1>
            <h2 className="text-h2 text-nds-black">
              Pierwsze w Polsce całodzienne wydarzenie w całości poświęcone
              projektantom wnętrz i architektom. Bez pośredników, bez
              przypadkowych gości – tylko najlepsi twórcy, decydenci i liderzy
              opinii w branży.
            </h2>
          </div>
        </div>
      </div>
      <div
        className="fixed left-0 right-0 bottom-10 bg-nds-red"
        style={{
          background:
            "linear-gradient(180deg, rgba(239, 0, 28, 0.00) 0%, #F71100 15%, #FB081C 84.62%, rgba(255, 0, 55, 0.00) 100%);",
        }}
      >
        <div className="container flex items-center justify-center gap-5 py-5">
          <Link
            href="/order"
            className="py-2 px-4 rounded-md bg-black text-white font-semibold text-base/6"
          >
            Kup bilet teraz
          </Link>
          <span>Tylko 499 biletów – pula limitowana!</span>
        </div>
      </div>
      <div className="font-medium flex items-center justify-center gap-4 py-4 text-sm bg-nds-red">
        <Link href="/polityka-prywatnosci">Polityka prywatności </Link>
        <Link href="/regulamin">Regulamin</Link>
      </div>
      {/*
      <div
        className="-mt-28"
        style={{
          background:
            "linear-gradient(180deg, var(--Red, #E90609) 0%, var(--Warm-grey, #6A615C) 40.21%)",
        }}
      >
        <Header className="py-10 text-white" />
        <div>
          <div className="container h-screen">
            <div className="font-brockmann text-2xl text-center">
              Next design summitxs
            </div>
          </div>
          <div className="container h-screen">
            <div className="font-brockmann text-2xl text-center">
              Next design summitxs
            </div>
          </div>
        </div>
      </div>
      */}
    </>
  );
}
