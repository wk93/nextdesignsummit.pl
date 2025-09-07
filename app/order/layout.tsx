"use client";
import { SocommerceProvider } from "@wk93/socommerce-sdk";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export default function OrderLayout({ children }: Props) {
  return (
    <SocommerceProvider
      url={`${process.env.NEXT_PUBLIC_API_URL!}/public`}
      currency="PLN"
    >
      {children}
    </SocommerceProvider>
  );
}
