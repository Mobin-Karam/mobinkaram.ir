"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SideNav from "./ui/sidenav";

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <div className="w-full h-screen flex items-center justify-center flex-col bg-slate-900">
            <div className="mb-20px border-8 border-t-8 border-t-sky-700 rounded-full w-80px h-80px animate-[wiggle_.5s_linear_infinite]"></div>
            <div className="text-white font-bold text-3xl">
              Please wait is Loading... 😊
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:flex  lg:items-center lg:justify-center lg:bg-slate-400 transition-all duration-500">
          <div className="lg:grid lg:grid-cols-5 flex flex-col-reverse w-full transition-all duration-600">
            <div className="lg:col-start-1  lg:col-end-2 ">
              <SideNav />
            </div>
            <div className="lg:col-start-2 lg:col-end-6 ">
              {/* <Outlet /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
