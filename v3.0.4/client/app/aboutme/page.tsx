import Link from "next/link";
import Button from "../ui/button";
import { Metadata } from "next";

export const metadate : Metadata = {
  title: "Mobin Karam | About Me",
}

export default function Page() {
  return (
    <section
      id="aboutme"
      className="section w-full h-screen flex items-center justify-center flex-col flex-nowrap lg:py-[72px] bg-slate-300 "
    >
      <div className="container relative w-full lg:px-12 mx-[120px]">
        {/* // Top  */}
        <div className="relative w-full flex items-center justify-center flex-row flex-nowrap">
          <span className="sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-900/5 font-popp">
            ABOUT ME
          </span>
          <span className="border-b-2 sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl font-popp font-semibold border-sky-500 absolute top-100">
            Know Me More
          </span> 
        </div>
        {/* // Center  */}
        <div className="w-full flex items-start justify-between flex-row flex-nowrap lg:p-[50px]">
          {/* // CenterLeft  */}
          <div className="h-full flex items-start justify-center flex-col flex-nowrap">
            <div className="font-popp flex items-start justify-center flex-col flex-nowrap mb-[20px]">
              <h2 className="text-3xl font-semibold">
                I&apos;m
                <span className="text-sky-500 font-popp"> Mobin Karam</span>, a
                Full Stack Developer
              </h2>
            </div>
            <div className="">
              <p className="font-popp mb-[20px]">
                I help you build brand for your business at an affordable price.
              </p>
              <p className="font-popp mb-[20px]">
                {/* I Love writing clean code, and pushing my skills to the limit.
                My interests include joining an exciting team of passionate
                people, personal growth, and making silly faces. Some people
                might be nervous to leave the exciting on-the-job learning and
                fulfilling teamwork dynamic behind. Personally, I&apos;m excited
                to join the boring, simple, and rarely-evolving world of tech.
                Other than coding,I Love baking cookies, and making people
                laugh. */}
                Thousands of clients have procured exceptional results while
                working with our dedicated team. when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </p>
              <p className="font-popp">
                {/* Delivering work within time and budget which meets client&apos;s
                requirements is our moto. */}
                Delivering work within time and budget which meets client&apos;s
                requirements is our moto. Lorem Ipsum has been the
                industry&apos;s standard dummy text ever when an unknown printer
                took a galley.
              </p>
            </div>
          </div>
          {/* // CenterRight  */}
          <div className=" ml-[20px] flex items-start justify-start flex-col flex-nowrap">
            <div className="w-full font-popp mb-[10px]  border-b-gray-600/20 border-2 border-t-0 border-r-0 border-l-0 p-[6px]">
              <span className="font-semibold">Name:</span> Mobin Karam
            </div>
            <div className="w-full font-popp mb-[10px]  border-b-gray-600/20 border-2 border-t-0 border-r-0 border-l-0 p-[6px]">
              <span className="font-semibold">Email: </span>
              <Link
                className="text-sky-500"
                href={"mailto:mohammadmobinkaram@gmail.com"}
              >
                mohammadmobinkaram@gmail.com
              </Link>
            </div>
            <div className="w-full font-popp mb-[10px]  border-b-gray-600/20 border-2 border-t-0 border-r-0 border-l-0 p-[6px]">
              <span className="font-semibold">Age:</span> 21
            </div>
            <div className="w-full font-popp mb-[10px]  border-b-gray-600/20 border-2 border-t-0 border-r-0 border-l-0 p-[6px]">
              <span className="font-semibold">From:</span> IRAN, Kermanshah,
              Paveh
            </div>
            {/* // Button  */}
            <div className="w-full flex items-start justify-start flex-col flex-nowrap">
              <Link
                href={"https://mobinkaram.ir/download/mobinkaram-resume.pdf"}
                target="_blank"
                className=""
              >
                <Button title="Download" className={"py-3 px-20 bg-sky-400 text-white"} />
              </Link>
            </div>
          </div>
        </div>
        {/* // Bottom  */}
        <div className="w-full flex items-center justify-evenly flex-row flex-nowrap text-gray-500 font-semibold ">
          <div className="flex items-center font-popp justify-center flex-col flex-nowrap">
            <div className="text-5xl ">1+</div>
            <div className="">Years Experiance</div>
          </div>
          <div className="border-[1px] h-[100px] border-gray-400 h-120px"></div>
          <div className="flex items-center font-popp justify-center flex-col flex-nowrap">
            <div className="text-5xl">0+</div>
            <div className="">Happy Clients</div>
          </div>
          <div className="border-[1px] h-[100px] border-gray-400 h-120px"></div>
          <div className="flex items-center font-popp justify-center flex-col flex-nowrap">
            <div className="text-5xl">3+</div>
            <div className="">Projects Done</div>
          </div>
          <div className="border-[1px] h-[100px] border-gray-400 h-120px"></div>
          <div className="flex items-center font-popp justify-center flex-col flex-nowrap">
            <div className="text-5xl">0</div>
            <div className="">Get Awards</div>
          </div>
        </div>
      </div>
    </section>
  );
}
