import Header from "@/components/header/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative bg-nds-red">
        <div
          className="fixed left-0 right-0 bottom-10 z-20 hidden"
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
        <div className="bg-red-cover absolute left-0 right-0 top-0 h-screen -z-[1]" />
        <Header className="py-10 text-nds-black" />

        <div className="container">
          <div className="flex w-full items-center justify-center">
            <img
              src="/theme/logo.svg"
              className="w-full"
              alt="Next Design Summit logo"
            />
          </div>
        </div>

        <div className="container">
          <div className="flex w-full items-center justify-between mt-32 mb-[50px] text-small">
            <span>Warszawa, 7 listopada 2025</span>
            <span>Muzeum Historii Polski</span>
          </div>
        </div>

        <div className="container">
          <div className="pb-[50px]">
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

        <div className="container font-semibold pb-40">
          <div className="mb-10 text-xl/7">
            Dlaczego powstał Next Design Summit?
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              Przez lata uczestniczyliśmy w wydarzeniach, które nie dorastały do
              poziomu branży projektowej – były zbyt ogólne, mało praktyczne i
              pozbawione jakości, jaką oferują konferencje biznesowe czy
              fashion. Dlatego połączyliśmy siły – Katarzyna Kraszewska i spółka
              Deccore – aby stworzyć coś, czego jeszcze nie było: największe,
              prestiżowe i w pełni profesjonalne spotkanie architektów i
              projektantów wnętrz w Polsce.
            </div>
            <div>
              “Od lat marzyłam o wydarzeniu, które dorówna światowym
              konferencjom i stworzy nową jakość w Polsce. Wspólnie z Deccore
              powołaliśmy do życia NEXT DESIGN SUMMIT – spotkanie, które łączy
              pasję, wiedzę i relacje. To początek nowej ery i nowych standardów
              w branży projektowania wnętrz i architektury w Polsce.”
            </div>
          </div>
          <div className="mb-10 text-xl/7 text-right">Katarzyna Kraszewska</div>
        </div>
      </div>

      <div
        style={{
          background: "linear-gradient(180deg, #E90609 0%, #6A615C 40.21%)",
        }}
      >
        <Header className="py-10 text-white" />

        <div className="container relative">
          <div className="flex gap-6">
            <div className="flex-1 pt-40">
              <div className="sticky top-40">
                <svg
                  width="101"
                  height="45"
                  viewBox="0 0 101 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M77.8457 1L78.1387 1.29199L98.7061 21.792L99.417 22.5L98.7061 23.208L78.1387 43.708L77.8457 44H67.4307L69.1445 42.292L85.2578 26.2305L1 26.2305L1 18.7803L85.2686 18.7803L69.1445 2.70801L67.4307 1L77.8457 1Z"
                    fill="#C6EAFF"
                    stroke="#C6EAFF"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div className="w-full max-w-[988px] pt-30 text-nds-baby-blue">
              {(
                [
                  {
                    sectionTitle: "Dlaczego warto być?",
                    items: [
                      {
                        icon: "/theme/why-01.svg",
                        title:
                          "Największe i najbardziej prestiżowe spotkanie branży",
                        content:
                          "499 projektantów wnętrz i architektów premium i mid-premium w jednym miejscu",
                      },
                      {
                        icon: "/theme/why-02.svg",
                        title: "Ekspercka wiedza i praktyczne narzędzia",
                        content:
                          "inspirujące wystąpienia, case studies, wzory umów, arkusze i premierowa prezentacja innowacyjnej aplikacji do zarządzania projektami",
                      },
                      {
                        icon: "/theme/why-03.svg",
                        title: "Elitarny networking",
                        content: "zamknięte spotkanie liderów rynku",
                      },
                      {
                        icon: "/theme/why-04.svg",
                        title: "Prestiżowa lokalizacja",
                        content: "nowe Muzeum Historii Polski w Warszawie",
                      },
                    ],
                  },
                  {
                    sectionTitle: "Dla kogo?",
                    items: [
                      {
                        title:
                          "Projektanci wnętrz i architekci premium i mid-premium",
                      },
                      { title: "Właściciele pracowni architektonicznych" },
                      { title: "Architekci" },
                      {
                        title:
                          "Architekci współpracujący z deweloperami i inwestorami prywatnymi",
                      },
                      { title: "Liderzy opinii w branży kreatywnej" },
                      { title: "Architekci krajobrazu" },
                      { title: "Projektanci/designerzy" },
                    ],
                  },
                ] as {
                  sectionTitle: string;
                  items: { title?: string; icon?: string; content?: string }[];
                }[]
              ).map(({ sectionTitle, items }, index) => (
                <div
                  key={sectionTitle}
                  className={index === 0 ? "py-10 mb-5" : ""}
                >
                  <div className="mb-10 text-xl/7">{sectionTitle}</div>
                  <div className="grid md:grid-cols-2 gap-10">
                    {items.map((item) => (
                      <div
                        key={item.title}
                        className="flex gap-5 justify-start pb-5"
                      >
                        <div className="w-9">
                          <img
                            src={item.icon || "/theme/for-01.svg"}
                            className="w-9"
                            alt=""
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-lg/7">{item.title}</div>
                          {item.content && (
                            <div className="text-sm/6">{item.content}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container pt-40">
          <div className="text-[90px] leading-[98px] font-brockmann font-semibold tracking-tight text-nds-baby-blue text-center">
            To nie jest konferencja.
            <br />
            To przełom.
          </div>
        </div>
        <div
          style={{
            background: `url("/theme/bg/gray.png") center top no-repeat, #6A615C`,
            backgroundBlendMode: "overlay, normal",
          }}
        >
          <div className="container text-nds-baby-blue">
            <div className="pb-30 text-center text-2xl/8">
              499 miejsc. Zero przypadkowych gości.
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "krótkie, dynamiczne prezentacje – żadnych długich, nudnych prelekcji",
                "wystąpienia doświadczonych ekspertów i praktyków",
                "profesjonalna wiedza biznesowa, prawna, technologiczna i komunikacyjna",
                "darmowe materiały do wykorzystania w pracy od razu",
                "niespodzianki od prelegentów i prezenty od sponsorów",
                "networking w elitarnym gronie",
              ].map((item, index) => (
                <div key={index} className="flex gap-5 justify-start pb-5">
                  <div className="w-9">
                    <img src={"/theme/for-01.svg"} className="w-9" alt="" />
                  </div>
                  <div className="text-lg/7 font-semibold">{item}</div>
                </div>
              ))}
            </div>
            <div className="py-16">
              <div className="text-2xl/7 font-semibold">Plan wydarzenia</div>
            </div>
          </div>
        </div>
        <div className="font-medium flex items-center justify-center gap-4 py-4 text-sm bg-nds-red">
          <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
          <Link href="/regulamin">Regulamin</Link>
        </div>
      </div>
    </>
  );
}
