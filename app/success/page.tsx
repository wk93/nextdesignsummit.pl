"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSuccess } from "@wk93/socommerce-sdk";
import LoadingIcon from "@/components/layout/LoadingIcon";
import Link from "next/link";

export default function Success() {
  const { order, isLoading } = useSuccess();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !order) {
      router.push("/order");
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading || order === null ? (
        <div className="h-96 flex items-center justify-center">
          <LoadingIcon className="size-8" />
        </div>
      ) : (
        <div className="container mx-auto my-40 text-center">
          <div className="p-8">
            <img className="max-w-40 w-full mx-auto" src="/theme/logo.svg" />
          </div>
          <div className="text-2xl">Dziękujemy za złożenie zamówienia!</div>
          <div>
            Twój numer zamówienia to <strong>{order.token}</strong>
            {order.payment.code === "banktransfer" ? (
              <>
                <p className="mb-8">
                  Aby je opłacić, prosimy o dokonanie przelewu na poniższe dane:
                </p>

                <p className="mb-8">
                  DECCORE Spółka z o.o.
                  <br />
                  ul. Grzybowska 4/96
                  <br />
                  00-131 Warszawa
                </p>

                <p className="mb-8">
                  Numer konta: 06 1160 2202 0000 0006 0161 6133 NIP: 5252989674
                </p>

                <p className="mb-8">
                  W tytule przelewu prosimy wpisać numer zamówienia:{" "}
                  {order.token}
                </p>

                <p className="mb-8">
                  Po zaksięgowaniu wpłaty otrzymasz od nas potwierdzenie
                  mailowe.
                </p>
              </>
            ) : (
              <>
                <p className="mb-8">
                  Twoja transakcja przebiegła pomyślnie i właśnie
                  zarezerwowaliśmy dla Ciebie miejsce na wydarzeniu.
                </p>
                <p>
                  Dziękujemy, że dołączasz do grona uczestników. Cieszymy się,
                  że będziemy mogli spotkać się z Tobą na wydarzeniu!
                </p>
              </>
            )}
          </div>
          <div className="py-8">
            <Link
              href="/"
              className="py-2 px-4 rounded-md bg-black text-white font-semibold text-base/6"
            >
              Wróć na stronę główną
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
