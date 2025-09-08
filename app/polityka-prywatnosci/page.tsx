import { privatePolicy } from "@/data";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PolitykaPrywatnosci() {
  return (
    <div className="max-w-5xl w-full mx-auto">
      <div className="p-8 flex items-center justify-between">
        <img className="max-w-40 w-full" src="/theme/logo.svg" />
        <Link href="/">
          <div className="flex items-center justify-center border rounded-lg border-gray-200 p-2">
            <span>Wróć</span> <ArrowLeftIcon className="ml-3 size-5" />
          </div>
        </Link>
      </div>
      <div
        className="prose max-w-none p-8"
        dangerouslySetInnerHTML={{ __html: privatePolicy }}
      />
    </div>
  );
}
