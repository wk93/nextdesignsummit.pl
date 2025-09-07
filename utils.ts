export const price = (price: number, locale?: string) =>
  new Intl.NumberFormat(locale === "en" ? "en-US" : "pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);
