export default function Home() {
  return (
    <div className="min-h-screen w-full justify-center relative text-[#E80F38] bg-[#f5f5f5]">
      <div className="fixed inset-0 z-0">
        <img
          src="/sygnet-gray.svg"
          className="max-w-full max-h-screen mx-auto"
        />
      </div>
      <main className="relative z-10 border-t-[5px] border-[#E80F38] py-[50px] text-center">
        <div className="max-w-[1140px] px-8 mx-auto">
          <img src="/logo-red.svg" className="w-[200px] mx-auto pb-[150px]" />
          <h1 className="font-semibold text-[58px] mt-14 mb-[50px] leading-[58px]">
            Łączymy klientów i architektów
          </h1>
          <div className="text-[14px]">
            <p className="mb-[50px]">
              Pierwsza w Polsce platforma, która łączy klientów z idealnie
              dopasowanymi architektami i projektantami wnętrz. Prosty wybór,
              przejrzyste profile, możliwość płatnych konsultacji online i pełna
              jasność procesu projektowego.
            </p>
            <p className="mb-[50px]">
              <strong>Dla klientów</strong> – łatwy wybór projektanta.
              <br />
              <strong>Dla architektów</strong> – widoczność, dopasowani klienci
              i nowe źródło przychodów.
            </p>
          </div>
          <h2 className="text-[40px] font-semibold leading-[40px]">
            Sprawdź już 8 września!
          </h2>
        </div>
      </main>
    </div>
  );
}
