import { useEffect, useState } from "react";
import SideNav from "./sidenav";

export default function Home({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <div className="lg:flex  lg:items-center lg:justify-center lg:bg-slate-400 transition-all duration-500">
        <div className="lg:grid lg:grid-cols-5 flex flex-col-reverse w-full transition-all duration-600">
          <div className="lg:col-start-1  lg:col-end-2 ">
            <SideNav />
          </div>
          <div className="lg:col-start-2 lg:col-end-6 ">{children}</div>
        </div>
      </div>
    </>
  );
}
