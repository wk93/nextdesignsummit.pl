import Date from "@/components/header/Date";
import Header from "@/components/header/Header";
import Sygnet from "@/components/header/Sygnet";
import { CheckIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative bg-nds-red">
        <div
          className="fixed left-0 right-0 bottom-8 md:bottom-10 z-20"
          style={{
            background:
              "linear-gradient(180deg, rgba(239, 0, 28, 0.00) 0%, #F71100 15%, #FB081C 84.62%, rgba(255, 0, 55, 0.00) 100%)",
          }}
        >
          <div className="container md:flex items-center justify-center gap-5 py-5">
            <Link
              href="/order"
              className="py-2 px-4 rounded-md bg-black text-white font-semibold text-base/6 block text-center"
            >
              Kup bilet teraz
            </Link>
            <span className="pt-1 md:pt-0 block text-sm text-center">
              Tylko 499 biletów – pula limitowana!
            </span>
          </div>
        </div>
        <div className="bg-red-cover absolute left-0 right-0 top-0 h-screen -z-[1]" />
        <Header className="py-10 text-nds-black" />

        <div className="container">
          <div className="flex w-full items-center justify-center pt-32 md:pt-0">
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
            <h1 className="text-h1 text-nds-black mb-8">
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

      <div className="-mt-[102px]">
        <Header className="py-10 text-nds-baby-blue" />
        <div
          style={{
            background: "linear-gradient(180deg, #E90609 0%, #6A615C 40.21%)",
          }}
        >
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
                    className="max-w-10 md:max-w-none"
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
                    items: {
                      title?: string;
                      icon?: string;
                      content?: string;
                    }[];
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
        </div>
        <div className="bg-[#6A615C]">
          <div className="container pt-40">
            <div className="text-h1 font-brockmann font-semibold tracking-tight text-nds-baby-blue text-center">
              To nie jest konferencja.
              <br />
              To przełom.
            </div>
          </div>
          <div
            className=""
            style={{
              background: `url("/theme/bg/gray.png") center top no-repeat, #6A615C`,
              backgroundSize: "contain",
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
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    time: "11:00",
                    name: "Otwarcie + stand-up branżowy",
                    description:
                      "Powitanie uczestników, kawa, anegdoty z branży.",
                  },
                  {
                    time: "11:20",
                    name: "Panel 1: Człowiek w centrum projektu",
                    description:
                      "Organizacja czasu, neuroarchitektura, wellbeing i wypalenie zawodowe.",
                  },
                  {
                    time: "12:20",
                    name: "Panel 2: Finanse & AI",
                    description:
                      "Planowanie budżetów + sztuczna inteligencja w projektowaniu.",
                  },
                  {
                    time: "13:00",
                    name: "Prezentacja aplikacji Deccore",
                    description:
                      "Przełomowe narzędzie do zarządzania projektami.",
                  },
                  {
                    time: "13:30",
                    name: "Lunch & networking",
                    description: "",
                  },
                  {
                    time: "14:20",
                    name: "Panel 3: Prawo i zarządzanie projektami",
                    description:
                      "Prawo autorskie, zarządzanie zespołem, case studies.",
                  },
                  {
                    time: "14:50",
                    name: "Panel 4: Technologia i współpraca",
                    description:
                      "Modele współpracy z wykonawcami, księgowymi i prawnikami.",
                  },
                  {
                    time: "15:30",
                    name: "Goście specjalni",
                    description: "Inspiracje i trendy.",
                  },
                  {
                    time: "16:10",
                    name: "Panel 5: Przyszłość branży",
                    description:
                      "Przewidywania, zmiany, kompetencje przyszłości.",
                  },
                  {
                    time: "16:50",
                    name: "Finałowy stand-up branżowy",
                    description: "",
                  },
                  {
                    time: "17:20–21:00",
                    name: "Networking zamknięty",
                    description:
                      "Kameralne rozmowy w elitarnym gronie projektantów.",
                  },
                ].map((item) => (
                  <div key={item.time}>
                    <div className="flex gap-5 justify-start pb-5">
                      <div className="w-9">{item.time}</div>
                      <div className="flex-1">
                        <div className="text-lg/7 font-semibold">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-sm/6">{item.description}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs  text-right py-16">
                * Program wydarzenia może ulec modyfikacjom – zawsze z myślą o
                tym, by dostarczyć uczestnikom jeszcze więcej inspiracji, wiedzy
                i wartości.
              </p>
            </div>
            <div className="container text-nds-baby-blue pb-16">
              <div className="py-16 text-h4">
                Spotkajmy się 7 listopada 2025,
                <br />w Muzeum Historii Polski.
              </div>
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <img src="/p1.png" className="w-full" />
                  <div className="text-xs pt-10">
                    Muzeum Historii Polski, Cytadela Warszawska, ul. Gwardii 1,
                    01-538 Warszawa
                  </div>
                </div>
                <div>
                  <img src="/p2.png" className="w-full" />
                  <div className="text-xs pt-10 text-right">
                    Centrum konferencyjne Muzeum Historii Polski
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-24">
              <div className="container text-nds-baby-blue pb-16">
                <div className="py-16 text-h4">Obszary tematyczne</div>
                <div className="grid lg:grid-cols-3 gap-8">
                  {[
                    "Komunikacja",
                    "Prawo & Finanse",
                    "AI & Technologia",
                    "Przyszłość branży",
                    "Człowiek  w centrum",
                  ].map((item, index) => (
                    <div key={item} className="text-h2 text-nds-baby-blue">
                      <div>
                        <img
                          src={`/theme/th-0${index + 1}.svg`}
                          className="mx-auto"
                        />
                      </div>
                      <div className="text-center pt-4 md:pt-0">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-nds-red">
            <div className="container">
              <div className="text-xl py-10 font-semibold">
                Kto za tym stoi?
              </div>
              <div className="text-h2 py-10 font-semibold text-right">
                Największe nazwiska branży. Odsłaniamy stopniowo na social media
                <br />
                &gt; obserwuj nas
              </div>
              <a
                href="https://www.instagram.com/next_design_summit/"
                target="_blank"
              >
                <img src="/theme/instagram.png" className="h-6 ml-auto my-5" />
              </a>
            </div>

            <div className="container grid gap-8 md:grid-cols-3 py-16 pb-32">
              {[
                {
                  img: "pre-01.png",
                  title: "Magdalena Miernik-Grzesiowska",
                  subtitle: "Rzeczniczka patentowa i adwokatka IP",
                  description:
                    "Prawo własności intelektualnej  w projektowaniu wnętrz - prawo jako wsparcie i narzędzie w ręku projektanta",
                },
                {
                  img: "pre-02.png",
                  title: "Wojciech Plona",
                  subtitle: "Doradca biznesowy i strateg finansowy",
                  description:
                    "Jak nie zjadać własnego zysku – finanse i strategie rozwoju pracowni projektowej",
                },
                {
                  img: "pre-03.png",
                  title: "Jarosław Gibas",
                  subtitle:
                    "Socjolog, autor książek o komunikacji  i rozwoju świadomości",
                  description: "Trudny klient, czy trudna komunikacja?",
                },
              ].map((item, index) => (
                <div key={item.title} className="gap-4 flex">
                  <div className="h-36 w-36">
                    <img src={`/theme/${item.img}`} className="size-36" />
                  </div>
                  <div className="flex-1 flex items-center h-full">
                    <div>
                      <div className="font-semibold text-sm mb-2">
                        {item.title}
                      </div>
                      <div className="text-xs mb-2">{item.subtitle}</div>
                      <div className="font-semibold text-sm mb-2">
                        &quot;{item.description}&quot;
                      </div>
                      <div className="font-semibold text-sm flex gap-2">
                        <CalendarDaysIcon className="size-4" />
                        <span className="">07.11.2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="container text-nds-black py-16 pt-32">
              <div className="text-h2 text-center pb-10">Co zyskasz?</div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  "Konkretna wiedza → od razu do wdrożenia.",
                  "Nauczysz się lepiej komunikować.",
                  "Unikniesz kosztownych błędów.",
                  "Wyniesiesz projekty na wyższy poziom.",
                  "Poznasz narzędzia zwiększające efektywność i zarobki.",
                  "Będziesz częścią wydarzenia, które zapisze się w historii polskiego designu.",
                ].map((item, index) => (
                  <div key={index} className="flex gap-5 justify-start pb-5">
                    <div className="w-9">
                      <img
                        src={`/theme/pr-0${index + 1}.svg`}
                        className="w-9"
                        alt=""
                      />
                    </div>
                    <div className="text-lg/7 font-semibold">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div>
                <img
                  src="/theme/arrow.svg"
                  className="w-16 md:w-32 lg:w-44 mx-auto"
                />
              </div>
              <div className="py-10">
                <div
                  className="max-w-xl mx-auto"
                  style={{
                    background:
                      "linear-gradient(180deg, #E90609 0%, #EF3F15 28.85%)",
                    boxShadow: "0 4px 20px 0 #CB1619;",
                  }}
                >
                  <div className="flex justify-between items-center p-8">
                    <div className="font-semibold">Cena</div>
                    <Sygnet className="w-11" />
                    <Date className="h-2.5" />
                  </div>
                  <div className="grid grid-cols-1 gap-5 px-8">
                    <div className="text-h2">690 zł</div>
                    <div>
                      BONUS: pierwsze 100 osób otrzyma nagranie całego
                      wydarzenia w cenie biletu!
                    </div>
                    <div>W cenie:</div>
                    {[
                      "Profesjonalna wiedza → prawo, finanse, komunikacja, technologia",
                      "Darmowe materiały do pracy → wzory umów, arkusze, strategie, prezentacje",
                      "Niespodzianki od prelegentów i prezenty od sponsorów",
                      "Networking w elitarnym gronie architektów i projektantów wnętrz",
                      "Lunch i przerwy networkingowe w prestiżowej przestrzeni Muzeum Historii Polski",
                    ].map((item) => (
                      <div key={item} className="flex items-center">
                        <CheckIcon className="size-5" />
                        <span className="ml-6">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <Link
                      href="/order"
                      className="py-2 px-4 rounded-md bg-black text-white font-semibold text-base/6 block text-center"
                    >
                      Kup bilet teraz
                    </Link>
                  </div>
                </div>
              </div>
              <div className="py-16 text-center">
                <div className="text-h1 pb-16">Dołącz do przełomu</div>
                <div className="text-h2 pb-16">
                  Next Design Summit to nie konferencja. To początek nowej ery w
                  designie.
                </div>

                <div className="max-w-xl mx-auto">
                  Zarezerwuj swój bilet już dziś i bądź częścią wydarzenia,
                  które zapisze się w historii branży.
                  <Link
                    href="/order"
                    className="py-2 px-4 rounded-md bg-black text-white font-semibold text-base/6 block text-center mt-8"
                  >
                    Kup bilet teraz
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#6A615C] pt-[200px] text-nds-baby-blue">
            <div className="container">
              <div className="text-xl pb-10 font-semibold">
                Dlaczego powstał Next Design Summit?
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-lg/7">
                {[
                  "„Przez lata projektowałam wnętrza dla najbardziej wymagających klientów. Nauczyłam się, że prawdziwe piękno to nie tylko materiały i proporcje, ale też proces, relacje i zaufanie. W głębi serca czułam jednak, że moja misja sięga dalej niż pojedyncze projekty. Marzyłam o przestrzeni, w której cała branża projektowania wnętrz i architektury w Polsce będzie mogła spotkać się, wymieniać doświadczeniami i razem inspirować się do sięgania po więcej.",

                  "To marzenie dojrzewało we mnie latami. Chciałam stworzyć wydarzenie, które swoją rangą dorówna najlepszym konferencjom w Mediolanie, Londynie czy Nowym Jorku. Wiedziałam jednak, że aby zrealizować coś tak ambitnego, potrzebuję partnerów, którzy myślą podobnie i wierzą w przyszłość. Dlatego połączyłam siły ze spółką Deccore – dynamicznym zespołem ludzi, dla których technologia i profesjonalizacja branży są tak samo ważne jak dla mnie. Stając się częścią Deccore, mogę nie tylko tworzyć wnętrza, ale też kreować nowe możliwości dla całego środowiska projektowego.",

                  "Tak narodził się NEXT DESIGN SUMMIT – wydarzenie światowej klasy, które od teraz będzie odbywać się co roku. To coś więcej niż konferencja. To wspólnota ludzi z pasją, wiedzą i odwagą, którzy chcą zmieniać oblicze projektowania wnętrz i architektury. Wierzę, że NEXT DESIGN SUMMIT wyznacza nowe standardy w naszej branży w Polsce i że to dopiero początek.”",
                ].map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
            <div className="text-right py-16 container">
              <div className="text-h2 text-nds-baby-blue">
                „Wierzę, że przyszłość designu rodzi się tam, gdzie spotykają
                się ludzie, wiedza i odwaga.”
              </div>
              <div className="text-right text-lg/7 pt-8">
                Katarzyna Kraszewska
              </div>
            </div>
            <div className="container">
              <div className="text-xl pb-10 font-semibold">
                Kto za tym stoi?
              </div>
            </div>

            <div className="container grid gap-8 md:grid-cols-3 py-16 pb-32">
              {[
                {
                  img: "ic-01.png",
                  title: "Katarzyna Kraszewska",
                  description:
                    "Architektka wnętrz, przedsiębiorczyni i mentorka z ponad 20-letnim doświadczeniem. Prowadzi autorską pracownię Katarzyna Kraszewska Architektura Wnętrz, realizując prestiżowe projekty w Polsce i za granicą. Tworzy wnętrza premium, łączące ponadczasową elegancję z funkcjonalnością. Jest jedną z najbardziej rozpoznawalnych postaci polskiego designu, regularnie obecna w mediach branżowych i lifestylowych.",
                },
                {
                  img: "ic-02.svg",
                  title: "Dobry Projektant",
                  description:
                    "Stworzona przez Katarzynę Kraszewską platforma edukacyjna dla architektów i projektantów wnętrz. Oferuje szkolenia, e-booki, webinary, newslettery i materiały wspierające rozwój zawodowy projektantów. Wokół marki powstała jedna z największych społeczności projektantów wnętrz w Polsce, licząca już kilka tysięcy osób.",
                },
                {
                  img: "ic-03.svg",
                  title: "Deccore",
                  description:
                    "Innowacyjna spółka technologiczna, do której dołączyła Katarzyna Kraszewska. Deccore rozwija narzędzia cyfrowe dla architektów i projektantów wnętrz – usprawnia komunikację z klientami, zarządzanie projektami, kosztorysy i procesy realizacji. Jej misją jest profesjonalizacja branży i wdrażanie nowoczesnych technologii, które ułatwiają pracę projektantom i podnoszą jakość obsługi klientów.",
                },
              ].map((item, index) => (
                <div key={item.title}>
                  <div className="h-36 flex items-center">
                    <img src={`/theme/${item.img}`} />
                  </div>
                  <div className="text-lg/8 pb-6 font-semibold">
                    {item.title}
                  </div>
                  <div>{item.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-nds-red">
            <div className="flex w-full items-center pt-20 pb-8 justify-center">
              <img
                src="/theme/logo.svg"
                alt="Next Design Summit logo"
                className="h-12"
              />
            </div>
            <div className="w-full max-w-sm px-4 text-center mx-auto pb-8">
              Masz pytania?
              <br />
              Napisz do nas:{" "}
              <a href="mailto:kontakt@nextdesignsummit.pl">
                kontakt@nextdesignsummit.pl
              </a>
            </div>
            <div className="font-medium flex items-center justify-center gap-4 py-4 text-sm bg-nds-red">
              <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
              <Link href="/regulamin">Regulamin</Link>
            </div>
            <div className="flex items-center justify-center w-full py-8">
              <a href="https://socommerce.pl" target="_blank" rel="noreferrer">
                <img
                  src="https://socommerce.b-cdn.net/logo_black.svg"
                  alt="Socommerce"
                  width="110"
                  height="30"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
