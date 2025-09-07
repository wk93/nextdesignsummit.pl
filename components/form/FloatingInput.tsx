import React from "react";
import clsx from "clsx";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import {
  Input as HeadlessInput,
  InputProps as HeadlessInputProps,
} from "@headlessui/react";

interface Props extends Omit<HeadlessInputProps, "size" | "placeholder"> {
  label: string;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  className?: string; // wrapper
  inputClassName?: string; // <input>
  labelClassName?: string; // <label>
  id?: string;
  color?: `#${string}`; // HEX, np. "#ff5a1f"
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      hint,
      className,
      inputClassName,
      labelClassName,
      id: idProp,
      name,
      color = "#2563eb", // domyślnie blue-600 w HEX
      ...props
    },
    ref,
  ) => {
    // Unikalny identyfikator do precyzyjnego scope’owania styli
    const reactId = React.useId();
    const id = idProp ?? (name ? `input-${name}` : `input-${reactId}`);

    const describedByIds: string[] = [];
    if (error) describedByIds.push(`${id}-error`);
    if (hint && !error) describedByIds.push(`${id}-hint`);

    return (
      <div className="pt-2">
        <div className={clsx("relative", className)}>
          {props.disabled && (
            <LockClosedIcon className="size-5 text-gray-500 absolute -translate-y-2.5 top-1/2 right-2" />
          )}

          <HeadlessInput
            id={id}
            data-uid={id}
            name={name}
            ref={ref}
            aria-invalid={!!error || undefined}
            aria-describedby={
              describedByIds.length ? describedByIds.join(" ") : undefined
            }
            className={clsx(
              "block px-2.5 pb-1.5 pt-3 w-full text-base sm:text-sm/6 text-gray-900 bg-transparent rounded-lg",
              "outline-1 -outline-offset-1 outline-gray-200 appearance-none",
              "focus:outline-2 focus:-outline-offset-2", // grubość/offset (kolor ustawimy w CSS niżej)
              "peer disabled:outline-dashed disabled:outline-gray-400 disabled:cursor-not-allowed disabled:text-gray-500",
              inputClassName,
            )}
            placeholder=" "
            // możesz dalej dokładać inne inline style jeśli chcesz
            style={props.style}
            {...props}
          />

          <label
            htmlFor={id}
            className={clsx(
              "absolute select-none text-base sm:text-sm/6 text-gray-500 duration-300",
              "transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] bg-white px-2",
              "peer-focus:px-2",
              "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2",
              "peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4",
              "rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
              labelClassName,
            )}
          >
            {label}
          </label>
        </div>
        {error && (
          <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${id}-hint`} className="mt-1 text-xs text-gray-500">
            {hint}
          </p>
        )}

        <style>{`
          [data-uid="${id}"]:focus {
            outline-color: ${color};
          }
          [data-uid="${id}"]:focus ~ label {
            color: ${color};
          }
        `}</style>
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
