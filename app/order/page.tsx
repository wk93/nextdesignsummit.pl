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
import {
  defaultAddressValues,
  makeDefaultFormValues,
  orderFormSchema,
} from "@/components/order/order.schema";
import { OrderData } from "@wk93/socommerce-sdk/lib/hooks/useOrder";
export default function Order() {
  const { cart, isLoading, update } = useCart();
  const router = useRouter();
  const { isCarriersLoading, isPaymentsLoading, carriers, payments, create } =
    useOrder();

  const form = useForm({
    defaultValues: makeDefaultFormValues(),
    validators: { onChange: orderFormSchema },
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
        const response = await create(data);
        if (response.shouldRedirect) {
          if (response.redirect) {
            window.location.href = response.redirect;
          } else {
            alert("Błąd");
          }
        } else {
          router.push("/success");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (!isLoading) {
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
      } else if (
        cart &&
        cart.items.length === 1 &&
        cart.items[0].quantity > 1
      ) {
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
    }
  }, [isLoading]);

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
            <img className="max-w-40 w-full" src="/theme/logo.svg" alt="Logo" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* LEWA KOLUMNA */}
            <div className="bg-white p-8">
              <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
                {/* Email */}
                <div className="md:col-span-2">
                  <form.Field name="email">
                    {({ name, state, handleChange, handleBlur }) => (
                      <div>
                        <Input
                          label="Adres email"
                          type="email"
                          color="#bd1417"
                          id={name}
                          name={name}
                          value={state.value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                        />
                        {state.meta.isTouched && state.meta.errors[0] && (
                          <div className="text-red-500 text-xs mt-1">
                            {state.meta.errors[0].message}
                          </div>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>

                <div className="md:col-span-2 text-lg pt-4 pb-2">
                  Dane kontaktowe
                </div>

                {/* Osoba vs Firma */}
                <div className="md:col-span-2">
                  <form.Field name="addressDelivery.isCompany">
                    {({ state: { value }, handleChange }) => (
                      <Radio
                        color="#bd1417"
                        value={value ? "company" : "person"}
                        onChange={(v) => handleChange(v === "company")}
                        options={[
                          { id: "person", name: "Osoba fizyczna" },
                          { id: "company", name: "Firma" },
                        ]}
                      />
                    )}
                  </form.Field>
                </div>

                {/* Warunkowe pola (dostawa) */}
                <form.Subscribe
                  selector={(s) => [s.values.addressDelivery.isCompany]}
                >
                  {([isCompany]) =>
                    isCompany ? (
                      <>
                        <form.Field name="addressDelivery.company">
                          {({
                            name,
                            state: { value, meta },
                            handleChange,
                            handleBlur,
                          }) => (
                            <div>
                              <Input
                                label="Nazwa firmy"
                                color="#bd1417"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                              {meta.isTouched && meta.errors[0] && (
                                <div className="text-red-500 text-xs mt-1">
                                  {meta.errors[0].message}
                                </div>
                              )}
                            </div>
                          )}
                        </form.Field>
                        <form.Field name="addressDelivery.taxNumber">
                          {({
                            name,
                            state: { value, meta },
                            handleChange,
                            handleBlur,
                          }) => (
                            <div>
                              <Input
                                label="NIP"
                                color="#bd1417"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                              {meta.isTouched && meta.errors[0] && (
                                <div className="text-red-500 text-xs mt-1">
                                  {meta.errors[0].message}
                                </div>
                              )}
                            </div>
                          )}
                        </form.Field>
                      </>
                    ) : (
                      <>
                        <form.Field name="addressDelivery.firstName">
                          {({
                            name,
                            state: { value, meta },
                            handleChange,
                            handleBlur,
                          }) => (
                            <div>
                              <Input
                                label="Imię"
                                color="#bd1417"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                              {meta.isTouched && meta.errors[0] && (
                                <div className="text-red-500 text-xs mt-1">
                                  {meta.errors[0].message}
                                </div>
                              )}
                            </div>
                          )}
                        </form.Field>
                        <form.Field name="addressDelivery.lastName">
                          {({
                            name,
                            state: { value, meta },
                            handleChange,
                            handleBlur,
                          }) => (
                            <div>
                              <Input
                                label="Nazwisko"
                                color="#bd1417"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                              {meta.isTouched && meta.errors[0] && (
                                <div className="text-red-500 text-xs mt-1">
                                  {meta.errors[0].message}
                                </div>
                              )}
                            </div>
                          )}
                        </form.Field>
                      </>
                    )
                  }
                </form.Subscribe>

                {/* Adres dostawy */}
                <div className="md:col-span-2">
                  <form.Field name="addressDelivery.line1">
                    {({
                      name,
                      state: { value, meta },
                      handleChange,
                      handleBlur,
                    }) => (
                      <div>
                        <Input
                          label="Ulica i numer domu/mieszkania"
                          color="#bd1417"
                          id={name}
                          name={name}
                          value={value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                        />
                        {meta.isTouched && meta.errors[0] && (
                          <div className="text-red-500 text-xs mt-1">
                            {meta.errors[0].message}
                          </div>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>

                <form.Field name="addressDelivery.zipcode">
                  {({
                    name,
                    state: { value, meta },
                    handleChange,
                    handleBlur,
                  }) => (
                    <div>
                      <Input
                        label="Kod pocztowy"
                        color="#bd1417"
                        id={name}
                        name={name}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                      />
                      {meta.isTouched && meta.errors[0] && (
                        <div className="text-red-500 text-xs mt-1">
                          {meta.errors[0].message}
                        </div>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field name="addressDelivery.city">
                  {({
                    name,
                    state: { value, meta },
                    handleChange,
                    handleBlur,
                  }) => (
                    <div>
                      <Input
                        label="Miejscowość"
                        color="#bd1417"
                        id={name}
                        name={name}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                      />
                      {meta.isTouched && meta.errors[0] && (
                        <div className="text-red-500 text-xs mt-1">
                          {meta.errors[0].message}
                        </div>
                      )}
                    </div>
                  )}
                </form.Field>

                <div className="md:col-span-2">
                  <form.Field name="addressDelivery.phone">
                    {({
                      name,
                      state: { value, meta },
                      handleChange,
                      handleBlur,
                    }) => (
                      <div>
                        <Input
                          label="Telefon"
                          color="#bd1417"
                          id={name}
                          name={name}
                          value={value}
                          onChange={(e) => handleChange(e.target.value)}
                          onBlur={handleBlur}
                        />
                        {meta.isTouched && meta.errors[0] && (
                          <div className="text-red-500 text-xs mt-1">
                            {meta.errors[0].message}
                          </div>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>

                <div className="md:col-span-2">
                  <form.Field name="sameAddressInvoice">
                    {({ state: { value }, handleChange }) => (
                      <Checkbox
                        color="#bd1417"
                        value={value ? ["same"] : []}
                        onChange={(arr) => {
                          const checked = arr.includes("same");
                          handleChange(checked);
                          if (checked) {
                            // ukrywamy sekcję -> wyrzucamy addressInvoice z wartości
                            form.resetField("addressInvoice");
                          } else {
                            // pokazujemy sekcję -> zapewniamy obiekt do bindowania pól
                            form.setFieldValue("addressInvoice", {
                              ...defaultAddressValues,
                            });

                            form.validateAllFields("change");
                          }
                        }}
                        options={[
                          {
                            id: "same",
                            name: "Adres rachunku, taki sam jak adres dostawy",
                          },
                        ]}
                      />
                    )}
                  </form.Field>
                </div>

                {/* --- Faktura: pola gdy inny adres --- */}
                <form.Subscribe
                  selector={(s) => [
                    s.values.sameAddressInvoice,
                    s.values.addressInvoice?.isCompany,
                  ]}
                >
                  {([sameAddressInvoice, isCompany]) =>
                    sameAddressInvoice ? null : (
                      <>
                        {/* --- Faktura: toggle --- */}
                        <div className="md:col-span-2 text-lg pt-6 pb-2">
                          Dane do faktury
                        </div>
                        {/* Osoba/Firma dla faktury */}
                        <div className="md:col-span-2">
                          <form.Field name="addressInvoice.isCompany">
                            {({ state: { value }, handleChange }) => (
                              <Radio
                                color="#bd1417"
                                value={value ? "company" : "person"}
                                onChange={(v) => handleChange(v === "company")}
                                options={[
                                  {
                                    id: "person",
                                    name: "Osoba fizyczna",
                                  },
                                  {
                                    id: "company",
                                    name: "Firma",
                                  },
                                ]}
                              />
                            )}
                          </form.Field>
                        </div>

                        {isCompany ? (
                          <>
                            <form.Field name="addressInvoice.company">
                              {({
                                name,
                                state: { value, meta },
                                handleChange,
                                handleBlur,
                              }) => (
                                <div>
                                  <Input
                                    label="Nazwa firmy"
                                    color="#bd1417"
                                    id={name}
                                    name={name}
                                    value={value}
                                    onChange={(e) =>
                                      handleChange(e.target.value)
                                    }
                                    onBlur={handleBlur}
                                  />
                                  {meta.isTouched && meta.errors[0] && (
                                    <div className="text-red-500 text-xs mt-1">
                                      {meta.errors[0].message}
                                    </div>
                                  )}
                                </div>
                              )}
                            </form.Field>
                            <form.Field name="addressInvoice.taxNumber">
                              {({
                                name,
                                state: { value, meta },
                                handleChange,
                                handleBlur,
                              }) => (
                                <div>
                                  <Input
                                    label="NIP"
                                    color="#bd1417"
                                    id={name}
                                    name={name}
                                    value={value}
                                    onChange={(e) =>
                                      handleChange(e.target.value)
                                    }
                                    onBlur={handleBlur}
                                  />
                                  {meta.isTouched && meta.errors[0] && (
                                    <div className="text-red-500 text-xs mt-1">
                                      {meta.errors[0].message}
                                    </div>
                                  )}
                                </div>
                              )}
                            </form.Field>
                          </>
                        ) : (
                          <>
                            <form.Field name="addressInvoice.firstName">
                              {({
                                name,
                                state: { value, meta },
                                handleChange,
                                handleBlur,
                              }) => (
                                <div>
                                  <Input
                                    label="Imię"
                                    color="#bd1417"
                                    id={name}
                                    name={name}
                                    value={value}
                                    onChange={(e) =>
                                      handleChange(e.target.value)
                                    }
                                    onBlur={handleBlur}
                                  />
                                  {meta.isTouched && meta.errors[0] && (
                                    <div className="text-red-500 text-xs mt-1">
                                      {meta.errors[0].message}
                                    </div>
                                  )}
                                </div>
                              )}
                            </form.Field>
                            <form.Field name="addressInvoice.lastName">
                              {({
                                name,
                                state: { value, meta },
                                handleChange,
                                handleBlur,
                              }) => (
                                <div>
                                  <Input
                                    label="Nazwisko"
                                    color="#bd1417"
                                    id={name}
                                    name={name}
                                    value={value}
                                    onChange={(e) =>
                                      handleChange(e.target.value)
                                    }
                                    onBlur={handleBlur}
                                  />
                                  {meta.isTouched && meta.errors[0] && (
                                    <div className="text-red-500 text-xs mt-1">
                                      {meta.errors[0].message}
                                    </div>
                                  )}
                                </div>
                              )}
                            </form.Field>
                          </>
                        )}

                        {/* Adres faktury */}
                        <div className="md:col-span-2">
                          <form.Field name="addressInvoice.line1">
                            {({
                              name,
                              state: { value, meta },
                              handleChange,
                              handleBlur,
                            }) => (
                              <div>
                                <Input
                                  label="Ulica i numer"
                                  color="#bd1417"
                                  id={name}
                                  name={name}
                                  value={value}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                />
                                {meta.isTouched && meta.errors[0] && (
                                  <div className="text-red-500 text-xs mt-1">
                                    {meta.errors[0].message}
                                  </div>
                                )}
                              </div>
                            )}
                          </form.Field>
                        </div>

                        <form.Field name="addressInvoice.zipcode">
                          {({
                            name,
                            state: { value, meta },
                            handleChange,
                            handleBlur,
                          }) => (
                            <div>
                              <Input
                                label="Kod pocztowy"
                                color="#bd1417"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                              {meta.isTouched && meta.errors[0] && (
                                <div className="text-red-500 text-xs mt-1">
                                  {meta.errors[0].message}
                                </div>
                              )}
                            </div>
                          )}
                        </form.Field>

                        <form.Field name="addressInvoice.city">
                          {({
                            name,
                            state: { value, meta },
                            handleChange,
                            handleBlur,
                          }) => (
                            <div>
                              <Input
                                label="Miejscowość"
                                color="#bd1417"
                                id={name}
                                name={name}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                              {meta.isTouched && meta.errors[0] && (
                                <div className="text-red-500 text-xs mt-1">
                                  {meta.errors[0].message}
                                </div>
                              )}
                            </div>
                          )}
                        </form.Field>

                        <div className="md:col-span-2">
                          <form.Field name="addressInvoice.phone">
                            {({
                              name,
                              state: { value, meta },
                              handleChange,
                              handleBlur,
                            }) => (
                              <div>
                                <Input
                                  label="Telefon"
                                  color="#bd1417"
                                  id={name}
                                  name={name}
                                  value={value}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                />
                                {meta.isTouched && meta.errors[0] && (
                                  <div className="text-red-500 text-xs mt-1">
                                    {meta.errors[0].message}
                                  </div>
                                )}
                              </div>
                            )}
                          </form.Field>
                        </div>
                      </>
                    )
                  }
                </form.Subscribe>

                {/* Dostawa i płatność */}
                <div className="md:col-span-2 text-lg pt-6 pb-2">
                  Formy dostawy i płatności
                </div>

                {/* (Jeśli chcesz UI dla carrier, dodaj analogiczny blok Radio dla name="carrier") */}

                <div className="md:col-span-2">
                  <form.Field name="payment">
                    {({ state: { value, meta }, handleChange }) => (
                      <div>
                        <Radio
                          label="Forma płatności"
                          color="#bd1417"
                          value={value}
                          onChange={handleChange}
                          options={(payments || []).map((p) => ({
                            id: p.code,
                            name: p.name,
                          }))}
                        />
                        {meta.isTouched && meta.errors[0] && (
                          <div className="text-red-500 text-xs mt-1">
                            {meta.errors[0].message}
                          </div>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>
              </div>
            </div>

            {/* PRAWA KOLUMNA */}
            {cart && (
              <section
                aria-labelledby="summary-heading"
                className="text-gray-600"
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
                        <li key={index} className="flex items-start space-x-4">
                          <div className="flex-auto space-y-1">
                            <h3 className="text-gray-900">
                              {quantity > 1 ? `${quantity} x ` : ""}
                              {product.name}{" "}
                              {stockUnit.variants.length > 0
                                ? ` (${stockUnit.variants[0].group.name} ${stockUnit.variants[0].name})`
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

                    {cart.discount > 0 ? (
                      <div className="flex items-center justify-between">
                        <dt>Zniżka</dt>
                        <dd>{price(cart.discount)}</dd>
                      </div>
                    ) : null}

                    <div className="flex items-center justify-between text-gray-900">
                      <dt className="text-base">Razem</dt>
                      <dd className="text-base">
                        <form.Subscribe
                          selector={(state) => [
                            state.values.carrier,
                            state.values.payment,
                          ]}
                        >
                          {([carrierCode, paymentCode]) => {
                            const selectedCarrier = (carriers || []).find(
                              (c) => c.code === carrierCode,
                            );
                            const selectedPayment = (payments || []).find(
                              (p) => p.code === paymentCode,
                            );
                            const carrierCost =
                              (selectedCarrier?.cost || 0) +
                              ((selectedCarrier?.cost || 0) > 0
                                ? selectedPayment?.cost || 0
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
                    {({ state: { value, meta }, handleChange }) => (
                      <>
                        <Checkbox
                          color="#bd1417"
                          value={value}
                          onChange={(value) =>
                            handleChange(value as ("privacy" | "term")[])
                          }
                          options={[
                            {
                              id: "privacy",
                              name: (
                                <div>
                                  Twoje dane osobowe będą użyte do przetworzenia
                                  zamówienia, ułatwienia korzystania ze strony
                                  internetowej oraz innych celów opisanych w
                                  naszej{" "}
                                  <Link
                                    href="/polityka-prywatnosci"
                                    className="underline"
                                  >
                                    polityce prywatności.
                                  </Link>
                                </div>
                              ),
                            },
                            {
                              id: "term",
                              name: (
                                <div>
                                  Przeczytałem/am i akceptuję{" "}
                                  <Link href="/regulamin" className="underline">
                                    regulamin.
                                  </Link>
                                </div>
                              ),
                            },
                          ]}
                        />
                        {meta.isTouched && meta.errors[0] && (
                          <div className="text-red-500 text-xs mt-2">
                            {meta.errors[0].message}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>

                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <>
                        <button
                          type="submit"
                          disabled={!canSubmit || isSubmitting}
                          className="w-full bg-nds-red text-white mt-5 rounded-md py-2 text-base/tight disabled:opacity-60 cursor-pointer flex items-center justify-center"
                        >
                          {isSubmitting
                            ? "Przetwarzanie..."
                            : "Zamawiam i płacę"}
                        </button>
                      </>
                    )}
                  </form.Subscribe>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
