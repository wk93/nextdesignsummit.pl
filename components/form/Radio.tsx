import React from "react";
import {
  Description,
  Field,
  Radio as HeadlessRadio,
  Label,
  RadioGroup,
} from "@headlessui/react";
import clsx from "clsx";

interface Option {
  id: string;
  name: string;
  description?: string;
}
interface Props {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  color?: `#${string}`;
}

const Radio: React.FC<Props> = ({
  label,
  value,
  onChange,
  options,
  color = "#2563eb",
}) => {
  const uid = React.useId();

  return (
    <div className="pt-2">
      <div className={clsx("relative")}>
        {label && (
          <span
            className={clsx(
              "absolute select-none text-base sm:text-sm/6 text-gray-500 -translate-y-4 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 start-1",
            )}
            data-radio-group-label
            data-radio-group={uid}
          >
            {label}
          </span>
        )}

        <RadioGroup
          aria-label="Options"
          className="-space-y-px rounded-md bg-white"
          value={value}
          onChange={onChange}
          data-radio-group={uid}
        >
          {options.map((option) => (
            <Field
              key={option.id}
              className={clsx(
                "border border-gray-200 p-4 py-2.5",
                "first:rounded-t-md last:rounded-b-md",
                "focus:outline-hidden cursor-pointer",
                label && "first:pt-3",
              )}
            >
              <Label className="flex items-start gap-3">
                <HeadlessRadio
                  value={option.id}
                  data-radio
                  className={clsx(
                    "relative mt-0.5 size-4 shrink-0",
                    "appearance-none rounded-full border border-gray-300 bg-white",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "disabled:border-gray-300 disabled:bg-gray-100",
                  )}
                />
                <div className="flex flex-col">
                  <div
                    className={clsx(
                      "block text-sm select-none",
                      option.description
                        ? "font-medium text-gray-900"
                        : "font-base text-gray-600",
                    )}
                  >
                    {option.name}
                  </div>
                  {option.description && (
                    <Description className="block select-none text-sm text-gray-500">
                      {option.description}
                    </Description>
                  )}
                </div>
              </Label>
            </Field>
          ))}
        </RadioGroup>

        <style>{`
        [data-radio-group="${uid}"] [data-radio][data-checked] {
          border-color: ${color};
          background-color: ${color};
        }

        [data-radio-group="${uid}"] [data-radio]:focus-visible {
          outline-color: ${color};
        }

        [data-radio-group="${uid}"] [data-radio]::after {
          content: "";
          position: absolute;
          inset: 4px;            
          border-radius: 9999px; 
          background: white;     
          opacity: 0;
          transition: opacity 120ms ease;
        }
        [data-radio-group="${uid}"] [data-radio][data-checked]::after {
          opacity: 1;
        }
      `}</style>
      </div>
    </div>
  );
};

export default Radio;
