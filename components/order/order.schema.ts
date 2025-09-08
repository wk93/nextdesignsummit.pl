// orderForm.schema.ts
import { z } from "zod";

/* ---- pomocnicze ---- */
const required = (msg = "Pole wymagane") =>
  z.string().trim().min(1, { message: msg });

// PL: 01-234
export const plZipRegex = /^\d{2}-\d{3}$/;
// Prosty telefon: 7–16 cyfr, opcjonalnie +, spacje, myślniki
export const phoneRegex = /^\+?[0-9\s-]{7,16}$/;

/* ---- wspólna część adresu ---- */
const addressCommon = z.object({
  line1: required(),
  // CHANGED: zamiast optional().default("") -> wymagany string z catch("")
  line2: z.string().trim().catch(""),
  zipcode: z
    .string()
    .trim()
    .regex(plZipRegex, { message: "Nieprawidłowy kod pocztowy (np. 01-234)" }),
  city: required(),
  // CHANGED: zamiast required().default("pl") -> string z catch("pl") (input dalej string)
  country: z.string().trim().min(1, { message: "Pole wymagane" }).catch("pl"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, { message: "Nieprawidłowy numer telefonu" }),
});

/* ---- rozgałęzienie: osoba vs firma ---- */
const personAddressPart = z.object({
  isCompany: z.literal(false),
  firstName: required(),
  lastName: required(),
  // CHANGED: zamiast optional().default("") -> string().catch("")
  company: z.string().trim().catch(""),
  taxNumber: z.string().trim().catch(""),
});

const companyAddressPart = z.object({
  isCompany: z.literal(true),
  company: required(),
  taxNumber: required(),
  // CHANGED: w wariancie firma te pola mogą być puste, ale input ma być string
  firstName: z.string().trim().catch(""),
  lastName: z.string().trim().catch(""),
});

/* ---- pełne adresy ---- */
export const personAddressSchema = addressCommon.merge(personAddressPart);
export const companyAddressSchema = addressCommon.merge(companyAddressPart);
export const addressSchema = z.union([
  personAddressSchema,
  companyAddressSchema,
]);

/* ---- zgody ---- */
const consentLiteral = z.union([z.literal("privacy"), z.literal("term")]);

/* ---- główne schema formularza (bez list dozwolonych kodów) ---- */
export const orderFormSchema = z
  .object({
    email: required().email({ message: "Nieprawidłowy adres e-mail" }),
    addressDelivery: addressSchema,
    // CHANGED: default nie wpływa na input, ale tu ok (boolean)
    sameAddressInvoice: z.boolean(),
    // Może być brak – to osobne pole (OK)
    addressInvoice: addressSchema.optional(),

    // Wymagane stringi (radio i tak wymusi poprawną wartość)
    carrier: required("Wybierz formę dostawy"),
    payment: required("Wybierz formę płatności"),

    // Komentarz opcjonalny – tu może zostać optional (input: string | undefined)
    // ale jeśli chcesz „twarde” string w input, użyj .catch("")
    comment: z
      .string()
      .trim()
      .max(1000, { message: "Za długi komentarz" })
      .catch(""),
    terms: z.array(consentLiteral).catch([]),
  })
  .superRefine((data, ctx) => {
    console.log(data.sameAddressInvoice);
    if (!data.sameAddressInvoice && !data.addressInvoice) {
      ctx.addIssue({
        code: "custom",
        path: ["addressInvoice"],
        message: "Pole wymagane",
      });
    }
    const hasPrivacy = data.terms.includes("privacy");
    const hasTerm = data.terms.includes("term");
    if (!hasPrivacy || !hasTerm) {
      ctx.addIssue({
        code: "custom",
        path: ["terms"],
        message: "Zaakceptuj wymagane zgody",
      });
    }
  });

/* ---- typy ---- */
export type OrderFormValues = z.infer<typeof orderFormSchema>;

/* ---- domyślne wartości ---- */
export const defaultAddressValues: OrderFormValues["addressDelivery"] = {
  isCompany: false,
  firstName: "",
  lastName: "",
  company: "",
  taxNumber: "",
  line1: "",
  line2: "",
  zipcode: "",
  city: "",
  country: "pl",
  phone: "",
};

export const makeDefaultFormValues = (): OrderFormValues => ({
  email: "",
  addressDelivery: defaultAddressValues,
  sameAddressInvoice: true,
  addressInvoice: undefined, // <= BYŁO: defaultAddressValues
  carrier: "",
  payment: "",
  comment: "",
  terms: [],
});
