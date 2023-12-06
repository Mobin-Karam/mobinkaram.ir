// Button

import clsx from "clsx";

type ButtonProps = {
  title: string;
  className?: any;
};

export default function Button({ title, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "text-sky-500 border-sky-500 border-2 bg-sky-900/20 hover:bg-sky-700 hover:text-white font-bold rounded-full transition-all duration-400",
        className
      )}
    >
      {title}
    </button>
  );
}
