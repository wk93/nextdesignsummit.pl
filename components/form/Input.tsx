import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<Props> = ({ label, className, ...props }) => {
  return (
    <div className={clsx("relative")}>
      {label && (
        <label
          htmlFor={props.name}
          className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-700 pointer-events-none select-none"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          "block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6",
          props.disabled ? "bg-gray-100" : "bg-white",
          className,
        )}
      />
    </div>
  );
};

export default Input;
