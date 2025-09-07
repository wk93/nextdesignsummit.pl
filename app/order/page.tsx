"use client";
import Checkbox from "@/components/form/Checkbox";
import Input from "@/components/form/FloatingInput";
import Radio from "@/components/form/Radio";
import LoadingIcon from "@/components/layout/LoadingIcon";
import { useForm } from "@tanstack/react-form";
import { getLink, useCart, useOrder } from "@wk93/socommerce-sdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { price } from "@/utils";
import Link from "next/link";
import makeOrder from "@wk93/socommerce-sdk/lib/client/makeOrder";
import { OrderData } from "@wk93/socommerce-sdk/lib/hooks/useOrder";
//import { z } from "zod";

const defaultAddressValues = {
  isCompany: false,
  company: "",
  taxNumber: "",
  firstName: "",
  lastName: "",
  line1: "",
  line2: "",
  zipcode: "",
  city: "",
  country: "pl",
  phone: "",
};

/*

const TEXT = {
  required: {
    pl: "Pole wymagane",
    en: "Required field",
  },
  email: {
    pl: "Nieprawidłowy adres e-mail",
    en: "Incorrect email address",
  },
} as const;

type Lang = keyof typeof TEXT.required;

const requiredStr = (lang: Lang) =>
  z.string().trim().min(1, { message: TEXT.required[lang] });

const addressSchema = (lang: Lang) =>
  z
    .object({
      isCompany: z.boolean(),
      firstName: z.string().trim().optional(),
      lastName: z.string().trim().optional(),
      company: z.string().trim().optional(),
      taxNumber: z.string().trim().optional(),
      line1: requiredStr(lang),
      line2: z.string().trim().optional(),
      city: requiredStr(lang),
      zipcode: requiredStr(lang),
      country: requiredStr(lang),
      phone: requiredStr(lang),
    })
    .superRefine((data, ctx) => {
      // Osoba fizyczna -> wymagaj firstName & lastName
      if (!data.isCompany) {
        if (!data.firstName || data.firstName.trim().length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["firstName"],
            message: TEXT.required[lang],
          });
        }
        if (!data.lastName || data.lastName.trim().length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["lastName"],
            message: TEXT.required[lang],
          });
        }
      } else {
        // Firma -> wymagaj company & taxNumber
        if (!data.company || data.company.trim().length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["company"],
            message: TEXT.required[lang],
          });
        }
        if (!data.taxNumber || data.taxNumber.trim().length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["taxNumber"],
            message: TEXT.required[lang],
          });
        }
      }
    });

const validationSchema = (lang: Lang) =>
  z
    .object({
      sameAddressInvoice: z.boolean(),
      addressDelivery: addressSchema(lang),
      email: requiredStr(lang).email({ message: TEXT.email[lang] }),
      payment: requiredStr(lang),
      carrier: requiredStr(lang),
      addressInvoice: addressSchema(lang).optional(), // wymusimy warunkiem niżej
      subscribe: z.boolean().optional(),
      smsSubscribe: z.boolean().optional(),
      paymentAuthorizationCode: z.string().trim().optional(),
    })
    .superRefine((data, ctx) => {
      if (!data.sameAddressInvoice && !data.addressInvoice) {
        ctx.addIssue({
          code: "custom",
          path: ["addressInvoice"],
          message: TEXT.required[lang],
        });
      }
    });

// type AddressInput = z.infer<ReturnType<typeof addressSchema>>;
//type ValidationInput = z.infer<ReturnType<typeof validationSchema>>;
  //
*/

export default function Order() {
  const { cart, isLoading, update } = useCart();
  const router = useRouter();
  const { isCarriersLoading, isPaymentsLoading, carriers, payments, create } =
    useOrder();

  const form = useForm({
    defaultValues: {
      email: "",
      addressDelivery: defaultAddressValues,
      sameAddressInvoice: true,
      addressInvoice: defaultAddressValues,
      carrier: "",
      payment: "",
      comment: "",
      terms: [] as string[],
    },
    onSubmit: async ({ value }) => {
      const data: OrderData = {
        addressDelivery: {
          ...value.addressDelivery,
          name: value.addressDelivery.firstName,
          surname: value.addressDelivery.lastName,
          country: value.addressDelivery.country || "pl",
        },
        email: value.email,
        payment: value.payment,
        carrier: value.carrier,
        sameAddressInvoice: value.sameAddressInvoice,
        subscribe: false,
        smsSubscribe: false,
      };
      try {
        console.log(data);
        const x = await create(data);
        console.log(x);
      } catch (error) {
        console.log((error as any).request);
        console.log((error as any).response.data);
      }
    },
    /*
    validators: {
      onChange: validationSchema("pl"),
      onBlur: validationSchema("pl"),
      onSubmit: validationSchema("pl"),
    },
    */
  });

  useEffect(() => {
    if (cart && cart.items.length < 1) {
      (async () => {
        const { link } = await getLink(
          `${process.env.NEXT_PUBLIC_API_URL!}/public`,
          {
            lang: "pl",
            slug: "bilet",
          },
        );
        if (link?.type === "Product" && link.product) {
          const product = link.product;
          await update({
            item: {
              quantity: 1,
              product: {
                stockUnit: product.stockUnits[0],
                product: { ...product, link },
              },
            },
          });
        }
      })();
    } else if (cart && cart.items.length === 1 && cart.items[0].quantity > 1) {
      (async () => {
        const { link } = await getLink(
          `${process.env.NEXT_PUBLIC_API_URL!}/public`,
          {
            lang: "pl",
            slug: "bilet",
          },
        );
        if (link?.type === "Product" && link.product) {
          const product = link.product;
          await update({
            item: {
              quantity: -(cart.items[0].quantity - 1),
              product: {
                stockUnit: product.stockUnits[0],
                product: { ...product, link },
              },
            },
          });
        }
      })();
    }
  }, [isLoading, cart]);

  useEffect(() => {
    if (!isCarriersLoading && carriers) {
      form.setFieldValue("carrier", carriers[0].code);
    }
  }, [isCarriersLoading, carriers]);

  useEffect(() => {
    if (!isPaymentsLoading && payments) {
      form.setFieldValue("payment", payments[0].code);
    }
  }, [isPaymentsLoading, payments]);

  return !cart && isLoading ? (
    <div className="h-96 flex items-center justify-center">
      <LoadingIcon className="size-8" />
    </div>
  ) : (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="min-h-screen bg-white">
          <div className="max-w-5xl p-8 mx-auto">
            <div className="p-8">
              <img className="max-w-40 w-full" src="/theme/logo.svg" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8">
                <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
                  <div className="md:col-span-2">
                    <form.Field name="email">
                      {({ name, state, handleChange, handleBlur }) => (
                        <>
                          <Input
                            label="Adres email"
                            type="email"
                            color="#bd1417;"
                            id={name}
                            name={name}
                            value={state.value}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={handleBlur}
                          />

                          {/*state.meta.isTouched && state.meta.errors[0] && (
                          <div className="text-red-500 text-xs mt-1">
                            {state.meta.errors[0].message}
                          </div>
                        )*/}
                        </>
                      )}
                    </form.Field>
                  </div>
                  <div className="md:col-span-2 text-lg pt-4 pb-2">
                    Adres dostawy
                  </div>
                  <div className="md:col-span-2">
                    <form.Field name="addressDelivery.isCompany">
                      {({ state: { value }, handleChange }) => (
                        <Radio
                          color="#bd1417;"
                          value={value ? "company" : "person"}
                          onChange={(e) => handleChange(e === "company")}
                          options={[
                            { id: "person", name: "Osoba fizyczna" },
                            { id: "company", name: "Firma" },
                          ]}
                        />
                      )}
                    </form.Field>
                  </div>
                  <form.Subscribe
                    selector={(state) => [
                      state.values.addressDelivery.isCompany,
                    ]}
                  >
                    {([isCompany]) =>
                      isCompany ? (
                        <>
                          <form.Field name="addressDelivery.company">
                            {({
                              name,
                              state: { value },
                              handleChange,
                              handleBlur,
                            }) => (
                              <Input
                                label="Nazwa firmy"
                                color="#bd1417;"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                            )}
                          </form.Field>
                          <form.Field name="addressDelivery.taxNumber">
                            {({
                              name,
                              state: { value },
                              handleChange,
                              handleBlur,
                            }) => (
                              <Input
                                label="NIP"
                                color="#bd1417;"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                            )}
                          </form.Field>
                        </>
                      ) : (
                        <>
                          <form.Field name="addressDelivery.firstName">
                            {({
                              name,
                              state: { value },
                              handleChange,
                              handleBlur,
                            }) => (
                              <Input
                                label="Imię"
                                color="#bd1417;"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                            )}
                          </form.Field>
                          <form.Field name="addressDelivery.lastName">
                            {({
                              name,
                              state: { value },
                              handleChange,
                              handleBlur,
                            }) => (
                              <Input
                                label="Nazwisko"
                                color="#bd1417;"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                            )}
                          </form.Field>
                        </>
                      )
                    }
                  </form.Subscribe>
                  <div className="md:col-span-2">
                    <form.Field name="addressDelivery.line1">
                      {({
                        name,
                        state: { value },
                        handleChange,
                        handleBlur,
                      }) => (
                        <Input
                          label="Ulica i numer domu/mieszkania"
                          color="#bd1417;"
                          id={name}
                          name={name}
                          value={value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                        />
                      )}
                    </form.Field>
                  </div>
                  <form.Field name="addressDelivery.zipcode">
                    {({ name, state: { value }, handleChange, handleBlur }) => (
                      <Input
                        label="Kod pocztowy"
                        color="#bd1417;"
                        id={name}
                        name={name}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                      />
                    )}
                  </form.Field>
                  <form.Field name="addressDelivery.city">
                    {({ name, state: { value }, handleChange, handleBlur }) => (
                      <Input
                        label="Miejscowość"
                        color="#bd1417;"
                        id={name}
                        name={name}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                      />
                    )}
                  </form.Field>
                  <div className="md:col-span-2">
                    <form.Field name="addressDelivery.phone">
                      {({
                        name,
                        state: { value },
                        handleChange,
                        handleBlur,
                      }) => (
                        <Input
                          label="Telefon"
                          color="#bd1417;"
                          id={name}
                          name={name}
                          value={value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                        />
                      )}
                    </form.Field>
                  </div>
                  <div className="md:col-span-2">
                    <form.Field name="sameAddressInvoice">
                      {({ state: { value }, handleChange }) => (
                        <Checkbox
                          color="#bd1417"
                          value={value ? ["sameAddressInvoice"] : []}
                          onChange={(value) => handleChange(value.length > 0)}
                          options={[
                            {
                              id: "sameAddressInvoice",
                              name: "Adres rachunku, taki sam jak adres dostawy",
                            },
                          ]}
                        />
                      )}
                    </form.Field>
                  </div>

                  <form.Subscribe
                    selector={(state) => [state.values.sameAddressInvoice]}
                  >
                    {([sameAddressInvoice]) =>
                      !sameAddressInvoice && (
                        <>
                          <div className="md:col-span-2 text-lg pt-4 pb-2">
                            Adres rachunku
                          </div>
                          <div className="md:col-span-2">
                            <form.Field name="addressInvoice.isCompany">
                              {({ state: { value }, handleChange }) => (
                                <Radio
                                  color="#bd1417;"
                                  value={value ? "company" : "person"}
                                  onChange={(e) =>
                                    handleChange(e === "company")
                                  }
                                  options={[
                                    { id: "person", name: "Osoba fizyczna" },
                                    { id: "company", name: "Firma" },
                                  ]}
                                />
                              )}
                            </form.Field>
                          </div>
                          <form.Subscribe
                            selector={(state) => [
                              state.values.addressInvoice.isCompany,
                            ]}
                          >
                            {([isCompany]) =>
                              isCompany ? (
                                <>
                                  <form.Field name="addressInvoice.company">
                                    {({
                                      name,
                                      state: { value },
                                      handleChange,
                                      handleBlur,
                                    }) => (
                                      <Input
                                        label="Nazwa firmy"
                                        color="#bd1417;"
                                        id={name}
                                        name={name}
                                        value={value}
                                        onChange={(e) =>
                                          handleChange(e.target.value)
                                        }
                                        onBlur={handleBlur}
                                      />
                                    )}
                                  </form.Field>
                                  <form.Field name="addressInvoice.taxNumber">
                                    {({
                                      name,
                                      state: { value },
                                      handleChange,
                                      handleBlur,
                                    }) => (
                                      <Input
                                        label="NIP"
                                        color="#bd1417;"
                                        id={name}
                                        name={name}
                                        value={value}
                                        onChange={(e) =>
                                          handleChange(e.target.value)
                                        }
                                        onBlur={handleBlur}
                                      />
                                    )}
                                  </form.Field>
                                </>
                              ) : (
                                <>
                                  <form.Field name="addressInvoice.firstName">
                                    {({
                                      name,
                                      state: { value },
                                      handleChange,
                                      handleBlur,
                                    }) => (
                                      <Input
                                        label="Imię"
                                        color="#bd1417;"
                                        id={name}
                                        name={name}
                                        value={value}
                                        onChange={(e) =>
                                          handleChange(e.target.value)
                                        }
                                        onBlur={handleBlur}
                                      />
                                    )}
                                  </form.Field>
                                  <form.Field name="addressInvoice.lastName">
                                    {({
                                      name,
                                      state: { value },
                                      handleChange,
                                      handleBlur,
                                    }) => (
                                      <Input
                                        label="Nazwisko"
                                        color="#bd1417;"
                                        id={name}
                                        name={name}
                                        value={value}
                                        onChange={(e) =>
                                          handleChange(e.target.value)
                                        }
                                        onBlur={handleBlur}
                                      />
                                    )}
                                  </form.Field>
                                </>
                              )
                            }
                          </form.Subscribe>
                          <div className="md:col-span-2">
                            <form.Field name="addressInvoice.line1">
                              {({
                                name,
                                state: { value },
                                handleChange,
                                handleBlur,
                              }) => (
                                <Input
                                  label="Ulica i numer domu/mieszkania"
                                  color="#bd1417;"
                                  id={name}
                                  name={name}
                                  value={value}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                />
                              )}
                            </form.Field>
                          </div>
                          <form.Field name="addressInvoice.zipcode">
                            {({
                              name,
                              state: { value },
                              handleChange,
                              handleBlur,
                            }) => (
                              <Input
                                label="Kod pocztowy"
                                color="#bd1417;"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                            )}
                          </form.Field>
                          <form.Field name="addressInvoice.city">
                            {({
                              name,
                              state: { value },
                              handleChange,
                              handleBlur,
                            }) => (
                              <Input
                                label="Miejscowość"
                                color="#bd1417;"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                            )}
                          </form.Field>
                          <div className="md:col-span-2">
                            <form.Field name="addressInvoice.phone">
                              {({
                                name,
                                state: { value },
                                handleChange,
                                handleBlur,
                              }) => (
                                <Input
                                  label="Telefon"
                                  color="#bd1417;"
                                  id={name}
                                  name={name}
                                  value={value}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                />
                              )}
                            </form.Field>
                          </div>
                        </>
                      )
                    }
                  </form.Subscribe>
                  <div className="md:col-span-2 text-lg pt-4 pb-2">
                    Formy dostawy i płatności
                  </div>
                  <div className="md:col-span-2">
                    <form.Field name="carrier">
                      {({ state: { value }, handleChange }) => (
                        <Radio
                          label="Form dostawy"
                          color="#bd1417;"
                          value={value}
                          onChange={handleChange}
                          options={carriers.map((carrier) => ({
                            id: carrier.code,
                            name: carrier.name,
                          }))}
                        />
                      )}
                    </form.Field>
                  </div>
                  <div className="md:col-span-2">
                    <form.Field name="payment">
                      {({ state: { value }, handleChange }) => (
                        <Radio
                          label="Forma płatności"
                          color="#bd1417;"
                          value={value}
                          onChange={handleChange}
                          options={payments.map((carrier) => ({
                            id: carrier.code,
                            name: carrier.name,
                          }))}
                        />
                      )}
                    </form.Field>
                  </div>
                </div>
              </div>
              {cart && (
                <section
                  aria-labelledby="summary-heading"
                  className="bg-gray-100-900 text-gray-600"
                >
                  <div className="sticky top-8 max-w-2xl mx-auto px-4 lg:max-w-none p-8 bg-white">
                    <div className="md:hidden">Podsumowanie</div>
                    <ul
                      role="list"
                      className="text-sm font-medium divide-y divide-white space-y-2 divide-opacity-10"
                    >
                      {cart.items.map(
                        (
                          {
                            product,
                            quantity,
                            discountPrice,
                            price: productPrice,
                            stockUnit,
                          },
                          index,
                        ) => (
                          <li
                            key={index}
                            className="flex items-start space-x-4"
                          >
                            <div className="flex-auto space-y-1">
                              <h3 className="text-gray-900">
                                {quantity > 1 ? `${quantity} x ` : ""}
                                {product.name}{" "}
                                {stockUnit.variants.length > 0
                                  ? ` (${stockUnit.variants[0].group.name} ${
                                      stockUnit.variants[0].name
                                    })`
                                  : null}
                              </h3>
                            </div>
                            <p className="flex-none text-base font-medium text-gray-900">
                              {price(
                                (discountPrice
                                  ? discountPrice.brutto
                                  : productPrice.brutto) * quantity,
                              )}
                            </p>
                          </li>
                        ),
                      )}
                    </ul>
                    <dl className="text-sm font-medium space-y-6 border-y border-gray-200 my-6 py-6">
                      <div className="flex items-center justify-between">
                        <dt>Suma</dt>
                        <dd>{price(cart.total.brutto)}</dd>
                      </div>

                      <div className="flex items-center justify-between">
                        <dt>Dostawa</dt>
                        <dd>
                          <form.Subscribe
                            selector={(state) => [
                              state.values.carrier,
                              state.values.payment,
                            ]}
                          >
                            {([carrier, payment]) => {
                              const selectedCarrier = carriers.filter(
                                (item) => item.code === carrier,
                              )[0] || { cost: 0 };
                              const selectedPayment = payments.filter(
                                (item) => item.code === payment,
                              )[0] || { cost: 0 };
                              const carrierCost =
                                (selectedCarrier?.cost || 0) +
                                ((selectedCarrier?.cost || 0) > 0
                                  ? selectedPayment.cost
                                  : 0);

                              return price(carrierCost);
                            }}
                          </form.Subscribe>
                        </dd>
                      </div>

                      {cart.discount > 0 ? (
                        <div className="flex items-center justify-between">
                          <dt>Znizka</dt>
                          <dd>{price(cart.discount)}</dd>
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between  text-gray-900">
                        <dt className="text-base">Razem</dt>
                        <dd className="text-base">
                          <form.Subscribe
                            selector={(state) => [
                              state.values.carrier,
                              state.values.payment,
                            ]}
                          >
                            {([carrier, payment]) => {
                              const selectedCarrier = carriers.filter(
                                (item) => item.code === carrier,
                              )[0] || { cost: 0 };
                              const selectedPayment = payments.filter(
                                (item) => item.code === payment,
                              )[0] || { cost: 0 };
                              const carrierCost =
                                (selectedCarrier?.cost || 0) +
                                ((selectedCarrier?.cost || 0) > 0
                                  ? selectedPayment.cost
                                  : 0);

                              return price(
                                carrierCost + cart.total.brutto - cart.discount,
                              );
                            }}
                          </form.Subscribe>
                        </dd>
                      </div>
                    </dl>
                    <form.Field name="terms">
                      {({ state: { value }, handleChange }) => (
                        <Checkbox
                          color="#bd1417"
                          value={value}
                          onChange={handleChange}
                          options={[
                            {
                              id: "privacy",
                              name: (
                                <>
                                  Twoje dane osobowe będą użyte do przetworzenia
                                  zamówienia, ułatwienia korzystania ze strony
                                  internetowej oraz innych celów opisanych w
                                  naszej{" "}
                                  <Link
                                    href="/polityka_prywatnosci"
                                    className="underline"
                                  >
                                    polityce prywatności.
                                  </Link>
                                </>
                              ),
                            },
                            {
                              id: "term",
                              name: (
                                <>
                                  Przeczytałem/am i akceptuję{" "}
                                  <Link
                                    href="/regulamin_sklepu"
                                    className="underline"
                                  >
                                    regulamin.
                                  </Link>
                                </>
                              ),
                            },
                          ]}
                        />
                      )}
                    </form.Field>
                    <form.Subscribe
                      selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                        state.errors,
                      ]}
                    >
                      {
                        //([canSubmit, isSubmitting, errors]) => (
                        () => (
                          <button
                            type="submit"
                            //disabled={!canSubmit || isSubmitting}
                            className={
                              "w-full bg-nds-red text-white mt-5 rounded-md py-2 text-base/tight disabled:bg-euro-red/80 cursor-pointer flex items-center justify-center"
                            }
                          >
                            Złóż zamówienie
                          </button>
                        )
                      }
                    </form.Subscribe>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
