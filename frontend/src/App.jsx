import React, { useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import HostHeader from "./components/HostHeader";
import HostFooter from "./components/HostFooter";

const App = () => {
  const location = useLocation();
  const contentRef = useRef(null);

  // Only hide header and footer on these routes
  const hideHeaderFooter = location.pathname === "/";
  const isNomad = location.pathname.includes("/nomad");
  const isHost = location.pathname.includes("/hosts");

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ behavior: "smooth", top: "0" });
    }
  }, [location.pathname]);

  return (
    <div
      ref={contentRef}
      className="flex flex-col h-screen overflow-auto justify-between relative bg-white custom-scrollbar-hide">
      {!hideHeaderFooter && (
        <div className="sticky top-0 w-full z-50">
          <div className="md:block">
            {isNomad ? <Header /> : <HostHeader />}
            {/* {isNomad ? <Header /> : <Header />} */}
          </div>
        </div>
      )}

      <div
        // ref={contentRef}
        className={`${
          hideHeaderFooter ? "" : " "
        } flex flex-col gap-4 bg-white`}>
        <Outlet />
        <Toaster />
      </div>

      {/* {!hideHeaderFooter && isNomad ? <Footer /> : <HostFooter />} */}
      {!hideHeaderFooter && (isNomad ? <Footer /> : <HostFooter />)}
      {/* {!hideHeaderFooter && (isNomad ? <Footer /> : <Footer />)} */}
    </div>
  );
};

export default App;
