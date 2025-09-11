import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  size?: "mini" | "small" | "normal";
}

const InputNumber: React.FC<Props> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value.toString());

  const realChange = (value: number) => {
    setLocalValue(value.toString());
    onChange(value);
  };

  const onFocus = (value: string) => {
    const num = Number(value);
    realChange(isNaN(num) ? 1 : num);
  };

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  return (
    <div className="rounded-md overflow-hidden border border-gray-200 inline-flex shadow-xs items-center">
      <button
        type="button"
        onClick={() => realChange(value - 1)}
        className="relative inline-flex items-center px-2 py-2.5 text-xs text-gray-900 hover:bg-gray-50 focus:outline-offset-0 cursor-pointer border-r border-gray-200"
      >
        <MinusIcon className="size-4" />
      </button>

      <input
        value={localValue}
        onChange={(e) => setLocalValue(e.currentTarget.value)}
        onBlur={(e) => onFocus(e.currentTarget.value)}
        className="w-full text-sm text-center h-full"
      />

      <button
        type="button"
        onClick={() => realChange(value + 1)}
        className="relative inline-flex items-center px-2 py-2.5 text-xs text-gray-900 hover:bg-gray-50 focus:outline-offset-0 cursor-pointer border-l border-gray-200"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

export default InputNumber;
