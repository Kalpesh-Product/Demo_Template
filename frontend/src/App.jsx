import React, { useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation();
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ behavior: "smooth", top: "0" });
    }
  }, [location.pathname]);

  return (
    <div
      ref={contentRef}
      className="flex flex-col h-screen overflow-auto justify-between relative bg-white custom-scrollbar-hide"
    >
      <Header />
      <div
        // ref={contentRef}
        className={` flex flex-col gap-4 bg-white`}
      >
        <Outlet />
        <Toaster />
      </div>
      <Footer />
    </div>
  );
};

export default App;
