// "use client";

import Link from "next/link";
import Button from "./ui/button";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-slate-500 flex items-center justify-evenly flex-col flex-nowrap">
      <div className=" flex items-center justify-center flex-col flex-nowrap">
        <div className=" flex items-center justify-evenly flex-col flex-nowrap">
          <span className="text-white font-popp text-3xl font-medium mb-[40px]">
            Welcome
          </span>
          <span className="text-white font-popp text-6xl font-semibold">
            I&apos;m Full Stack Developer.
          </span>
          <span className="text-white font-popp text-xl font-thin mt-[40px] mb-[40px]">
            bases in IRAN , Kermanshah, Paveh.
          </span>
          <span className=""></span>
          <Link href={"/contact"}>
            <Button title="Hire Me" className={"px-12 py-4 bg-slate-600"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
