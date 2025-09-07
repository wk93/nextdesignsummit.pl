import React from "react";
import {
  Description,
  Field,
  Checkbox as HeadlessCheckbox,
  Label,
} from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/outline";

interface Option {
  id: string;
  name: React.ReactNode;
  description?: React.ReactNode;
}
interface Props {
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  options: Option[];
  color?: `#${string}`;
}

const Checkbox: React.FC<Props> = ({
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
            data-checkbox-group-label
            data-checkbox-group={uid}
          >
            {label}
          </span>
        )}

        <div
          className={clsx("-space-y-px rounded-md bg-white")}
          data-checkbox-group={uid}
        >
          {options.map((setting) => (
            <Field
              key={setting.id}
              className={clsx(
                "border border-gray-200 p-4 py-2.5",
                "first:rounded-t-md last:rounded-b-md",
                "focus:outline-hidden cursor-pointer",
                label && "first:pt-3",
              )}
            >
              <Label className="flex items-start gap-3">
                <HeadlessCheckbox
                  data-checkbox
                  checked={(value || []).indexOf(setting.id) > -1}
                  onChange={(isChecked) => {
                    const newValue = isChecked
                      ? [...(value || []), setting.id]
                      : (value || []).filter((option) => option !== setting.id);
                    onChange?.(newValue);
                  }}
                  className={clsx(
                    "relative mt-0.5 size-4 shrink-0 flex items-center justify-center",
                    "appearance-none rounded border border-gray-300 bg-white",
                    "focus-visible:outline-2 focus-visible:outline-offset-2",
                    "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100",
                  )}
                >
                  <CheckIcon className="size-3 text-white stroke-3" />
                </HeadlessCheckbox>
                <div className="flex flex-col">
                  <div
                    className={clsx(
                      "block text-sm select-none",
                      setting.description
                        ? "font-medium text-gray-900"
                        : "font-base text-gray-600",
                    )}
                  >
                    {setting.name}
                  </div>
                  {setting.description && (
                    <Description className="block text-sm text-gray-500 select-none">
                      {setting.description}
                    </Description>
                  )}
                </div>
              </Label>
            </Field>
          ))}
        </div>
      </div>
      <style>{`
  [data-checkbox-group="${uid}"] [data-checkbox][data-checked] {
    background-color: ${color};
    border-color: ${color};
  }

  [data-checkbox-group="${uid}"] [data-checkbox] > svg {
    opacity: 0;
    transition: opacity 120ms ease;
  }
  [data-checkbox-group="${uid}"] [data-checkbox][data-checked] > svg {
    opacity: 1;
  }

  [data-checkbox-group="${uid}"] [data-checkbox]:focus-visible {
    outline-color: ${color};
  }

  [data-checkbox-group="${uid}"] [data-checkbox][data-checked][data-disabled] {
    background-color: ${color};
    opacity: 0.5;
  }
`}</style>
    </div>
  );
};

export default Checkbox;
