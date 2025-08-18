import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import logo from "../assets/wono-logo-white.png";
import logo from "../assets/WONO_LOGO_Black_TP.png";
import PrimaryButton from "./PrimaryButton";
import Container from "./Container";
import { Drawer } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import GetStartedButton from "./GetStartedButton";
import BnButton from "./BnButton";

const HostHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Host", link: "/hosts" },
    { name: "Modules", link: "/hosts/modules" },
    { name: "Themes", link: "/hosts/themes" },
    { name: "Leads", link: "/hosts/leads" },
    { name: "Capital", link: "/hosts/capital" },
    { name: "Career", link: "/hosts/career" },
  ];
  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md text-black py-3 lg:py-0 shadow-md">
      <Container padding={false}>
        <div className="flex  lg:px-0 justify-between items-center md:py-3  ">
          <div
            onClick={() => navigate("/")}
            className="w-24 lg:w-36 overflow-x-hidden rounded-lg flex justify-between items-center cursor-pointer">
            <img
              src={logo}
              alt={"logo"}
              className="w-full h-full object-contain"
            />
          </div>
          <ul className="hidden xl:flex sm:hidden gap-8 justify-center flex-1 uppercase">
            {links.map((link) => {
              const linkSegment = link.link.split("/").filter(Boolean).pop();
              const currentSegment = location.pathname
                .split("/")
                .filter(Boolean)
                .pop();

              const isActive = linkSegment === currentSegment;

              return (
                <li key={link.name} className="relative">
                  <Link
                    to={link.link}
                    className="relative pb-1 transition-all duration-300 group hover:font-bold ">
                    {link.name}
                    <span
                      className={`absolute left-0 bottom-0 block h-[2px] bg-blue-500 transition-all duration-300
              ${isActive ? "w-full" : "w-0"} group-hover:w-full`}></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="px-1 hidden xl:flex xl:gap-4 py-2 items-center">
            <Link
              to={"/nomad"}
              className="relative pb-1 transition-all duration-300 group hover:font-bold">
              Become a nomad
              <span
                className={`absolute left-0 w-0 bottom-0 block h-[2px] bg-blue-500 transition-all duration-300
               group-hover:w-full`}></span>
            </Link>

            <a
              href="https://wonofe.vercel.app"
              className="bg-[#FF5757] flex items-center justify-center text-white font-[500] capitalize hover:font-semibold hover:bg-red-500 w-[7rem] px-4 py-2 rounded-full">
              Login
            </a>
          </div>
          <div className="h-full px-2  lg:hidden">
            <button
              onClick={() => setOpen(true)}
              className=" rounded-lg text-subtitle text-black">
              ☰
            </button>
          </div>
        </div>
      </Container>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: {
              xs: "85%",
              sm: "400px",
            },
          },
        }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}>
        <div className="flex flex-col h-full justify-between">
          <ul className="flex flex-col gap-4 p-4 ">
            <div className="flex justify-end w-full">
              <span
                className="text-title cursor-pointer text-black"
                onClick={() => setOpen(false)}>
                <IoCloseSharp />
              </span>
            </div>
            <li className="items-center text-center">
              <div onClick={() => handleNavigation("/hosts")} className="py-4">
                <p className="text-secondary-dark text-lg">Home</p>
              </div>
              <div className="h-[0.2px] bg-gray-300"></div>
            </li>
            {links.map((item) => (
              <li key={item.id} className="items-center text-center">
                <div
                  onClick={() => handleNavigation(item.link)}
                  className="py-4">
                  <p className="text-secondary-dark text-lg">{item.name}</p>
                </div>
                <div className="h-[0.2px] bg-gray-300"></div>
              </li>
            ))}

            <div className="flex justify-center p-4">
              <BnButton
                title={"Login"}
                externalStyles={"bg-[#FF5757]"}
                handleSubmit={() => {
                  navigate("");
                  setOpen(false);
                }}
              />
            </div>
          </ul>

          {/* Footer */}

          <div className="w-full text-center flex flex-col gap-4 items-center py-4">
            <div className="flex w-full flex-col gap-2 text-small md:text-small">
              <hr />
              <span>
                &copy; Copyright {new Date().getFullYear()} -{" "}
                {(new Date().getFullYear() + 1).toString().slice(-2)}
              </span>
              <span></span>
              <span>WoNo. All rights reserved</span>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default HostHeader;
