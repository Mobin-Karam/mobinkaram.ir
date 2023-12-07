import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { FaBeer, FaLinkedin, FaHome } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import Button from "./button";

export default function SideNav() {
  return (
    <div className="w-full lg:min-h-screen lg:relative lg:flex-col lg:px-4 lg:pt-4 lg:pb-2 fixed top-0 bg-slate-900 flex item-center justify-between  flex-nowrap">
      {/* // LoGo  */}
      <div className="">
        <div className="w-full flex item-center justify-center flex-row flex-nowrap">
          <Link href={"/"}>
            <Image
              src={Logo}
              alt=""
              className="lg:w-[180px] w-[60px] bg-slate-400 border-slate-600 border-4 rounded-full p-[4px]"
            />
          </Link>
        </div>
        <div className="w-full flex item-center justify-center flex-row flex-nowrap">
          <span className="lg:inline-block hidden text-xl lg:text-xl lg:font-bold font-popp text-gray-200 mt-[20px] transition-all duration-400">
            Mobin karam
          </span>
        </div>
      </div>
      {/* // Buttons  */}
      <div className="w-full flex item-center justify-center lg:flex-col flex-row flex-nowrap">
        {/* Mobile Button Menu  */}
        <div className="lg:hidden relative">

        </div>
        {/* All Devices Button Menu  */}
        <Link className="" href="/">
          <Button
            title="Home"
            className={"w-full hidden lg:text-sm xl:text-md lg:inline-block lg:px-6 xl:px-12 py-1 mt-3 m-0"}
          />
        </Link>
        <Link className="" href="/aboutme">
          <Button
            title="About Me"
            className={"w-full hidden lg:text-sm xl:text-md lg:inline-block lg:px-6 xl:px-12 py-1 mt-3 m-0"}
          />
        </Link>
        <Link className="" href="/whatido">
          <Button
            title="What I Do"
            className={"w-full hidden lg:text-sm xl:text-md lg:inline-block lg:px-6 xl:px-12 py-1 mt-3 m-0"}
          />
        </Link>
        <Link className="" href="/resume">
          <Button
            title="Resume"
            className={"w-full hidden max-w-5xl:text-sm xl:text-md lg:inline-block lg:px-6 xl:px-12 py-1 mt-3 m-0"}
          />
        </Link>
        <Link className="" href="/portfolio">
          <Button
            title="Portfolio"
            className={"w-full hidden lg:text-sm xl:text-md lg:inline-block lg:px-6 xl:px-12 py-1 mt-3 m-0"}
          />
        </Link>
        <Link className="" href="/testimonial">
          <Button
            title="Testimonial"
            className={"w-full hidden lg:text-sm xl:text-md lg:inline-block lg:px-6 xl:px-12 py-1 mt-3 m-0"}
          />
        </Link>
        <Link className="" href="/contact">
          <Button
            title="Contact"
            className={"w-full hidden lg:text-sm xl:text-md lg:inline-block lg:px-6 xl:px-12 py-1 mt-3 m-0"}
          />
        </Link>
      </div>
      {/* // Icons  */}
      <div className="hidden lg:flex w-full items-center justify-evenly flex-row flex-nowrap mb-5 ">
        <Link href={"https://www.buymeacoffee.com/mohammadmk"} target="_blank">
          <FaBeer className="text-white lg:w-5 lg:h-5  xl:w-7 xl:h-7" />
        </Link>
        <Link href={"https://github.com/Mobin-Karam"} target="_blank">
          <AiFillGithub className="text-white lg:w-5 lg:h-5  xl:w-7 xl:h-7" />
        </Link>
        <Link
          href={"https://linkedin.com/in/mobin-karam-a54114242"}
          target="_blank"
        >
          <FaLinkedin className="text-white lg:w-5 lg:h-5  xl:w-7 xl:h-7" />
        </Link>
      </div>
    </div>
  );
}
