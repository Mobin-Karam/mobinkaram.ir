// Button

type ButtonProps = {
  title: string;
};

export default function Button({ title }: ButtonProps) {
  return (
    <button className="text-sky-500 border-sky-500 p-[20px] border-2 bg-sky-900/20 px-[40px] hover:bg-sky-500 hover:text-white font-bold mt-[50px] rounded-full transition-all duration-400">
      {title}
    </button>
  );
}
