import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import PrimaryButton from "./PrimaryButton";
import logo from "../assets/WONO_LOGO_Black_TP.png";
import SecondaryButton from "./SecondaryButton";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const view = searchParams.get("view"); // could be 'map', 'list', or null

  const currentPath = location.pathname;

  const isNomadOrListings =
    /^\/nomad(\/listings\/[^/]+)?$/.test(currentPath) ||
    currentPath === "/nomad/login" ||
    currentPath === "/nomad/signup";

  const hideMapListLinks = isNomadOrListings;
  const isNomadHome = isNomadOrListings;

  const pathRegex = /^\/nomad\/[^/]+\/[^/]+$/; // e.g., /nomad/india/goa
  const isNomadLocation = /^\/nomad\/[^/]+\/[^/]+$/.test(location.pathname); // Matches /nomad/:country/:state

  const isNomadListingsPage = location.pathname === "/nomad/listings";

  // NEW: listings detail page like /nomad/listings/BIZ%20Nest
  const isNomadListingsDetail = /^\/nomad\/listings\/[^/]+$/.test(currentPath);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  // Only the two links you want, and absolute paths so they work from nested routes
  const headerLinks = [
    { id: 1, text: "Destination News", to: "/nomad/destination-news" },
    { id: 2, text: "Local Blog", to: "/nomad/local-blog" },
  ];

  function getListViewPath() {
    const match = location.pathname.match(/^\/nomad\/([^/]+)\/([^/]+)/);
    if (match) {
      const [, country, state] = match;
      return `/nomad/${country}/${state}`;
    }
    // fallback default if nothing matched
    return "/nomad/india/goa";
  }

  return (
    <div className="flex px-4 py-3 justify-between items-center md:py-3 md:px-[7.5rem] lg:px-[7.5rem] sm:px-6 xs:px-6 lg:py-[0.625rem] shadow-md bg-white/80 backdrop-blur-md ">
      <div
        onClick={() => navigate("/")}
        className="w-24 lg:w-36 overflow-x-hidden rounded-lg flex justify-between items-center cursor-pointer">
        <img src={logo} alt={"logo"} className="w-full h-full object-contain" />
      </div>

      {!hideMapListLinks && (
        <div>
          <ul className="hidden xl:flex sm:hidden gap-8 pl-20 justify-center flex-1">
            <>
              <li className="flex items-center">
                {!["Signup"].includes("Nomad") && (
                  <div className="p-4 px-0 whitespace-nowrap">
                    <Link
                      to={"/nomad"}
                      className="group relative text-md text-black">
                      <span className="relative z-10 group-hover:font-bold mb-8">
                        Nomad
                      </span>
                      <span className="absolute left-0 bottom-0 top-6  w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </div>
                )}
              </li>
              {/* Case 1: It's a /nomad/:country/:state page */}
              {isNomadLocation ? (
                <>
                  {view !== "map" && (
                    <li className="flex items-center">
                      <div className="p-4 px-0 whitespace-nowrap">
                        <Link
                          to={`${location.pathname}?view=map`}
                          className="group relative text-md  text-black">
                          <span className="relative z-10 group-hover:font-bold mb-2">
                            Map view
                          </span>
                          <span className="absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      </div>
                    </li>
                  )}

                  {view === "map" && (
                    <li className="flex items-center">
                      <div className="p-4 px-0 whitespace-nowrap">
                        <Link
                          to={`${location.pathname}`}
                          className="group relative text-md text-black">
                          <span className="relative z-10 group-hover:font-bold mb-2">
                            List view
                          </span>
                          <span className="absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      </div>
                    </li>
                  )}
                </>
              ) : (
                // Case 2: Not a /nomad/:country/:state page, always show List View
                <>
                  {isNomadListingsPage && (
                    <li className="flex items-center">
                      <div className="p-4 px-0 whitespace-nowrap">
                        <Link
                          to={getListViewPath()}
                          className="group relative text-md text-black">
                          <span className="relative z-10 group-hover:font-bold mb-2">
                            List view
                          </span>
                          <span className="absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      </div>
                    </li>
                  )}
                </>
              )}
            </>

            {/* Remaining nav links */}
            {headerLinks.map((item, index) => (
              <li key={item.id} className="flex items-center">
                {!["Signup"].includes(item.text) && (
                  <div className="p-4 px-0 whitespace-nowrap">
                    <Link
                      to={item.to}
                      className="group relative text-md text-black">
                      <span className="relative z-10 group-hover:font-bold mb-8">
                        {item.text}
                      </span>
                      <span className="absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* NEW: show the two links on listings detail pages too, while keeping /nomad hidden */}
      {isNomadListingsDetail && (
        <div>
          <ul className="hidden xl:flex sm:hidden gap-8 pl-20 justify-center flex-1">
            {headerLinks.map((item) => (
              <li key={item.id} className="flex items-center">
                <div className="p-4 px-0 whitespace-nowrap">
                  <Link
                    to={item.to}
                    className="group relative text-md text-black">
                    <span className="relative z-10 group-hover:font-bold mb-8">
                      {item.text}
                    </span>
                    <span className="absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="hidden lg:flex gap-10">
        <li className="flex items-center">
          <div className="p-4 px-0 whitespace-nowrap">
            <a
              // href="https://wono.co"
              href="/hosts"
              className="group relative text-md text-black">
              <span className="relative z-10 group-hover:font-bold mb-8">
                Become a host
              </span>
              <span className="absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </li>

        <div className="px-1 hidden xl:flex xl:gap-4 py-2">
          <PrimaryButton
            title={"Login"}
            padding={"py-1"}
            handleSubmit={() => navigate("/nomad/login")}
            className={
              "bg-[#FF5757]  flex text-white font-[500] capatilize hover:bg-[#E14C4C] w-[7rem] px-6"
            }
          />
        </div>
        {/* <div className="px-1 hidden xl:flex gap-2">
          <SecondaryButton
            title={"SIGN UP"}
            handleSubmit={() => navigate("")}
          />
        </div> */}
      </div>
      <div className="h-full px-2  lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className=" rounded-lg text-subtitle text-black">
          ☰
        </button>
      </div>

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
            <div className="flex w-full justify-end text-right">
              <span
                className="text-title cursor-pointer"
                onClick={() => setOpen(false)}>
                <IoCloseSharp />
              </span>
            </div>

            {!hideMapListLinks && (
              <div>
                <ul className=" xl:flex gap-8  justify-center flex-1">
                  <>
                    <li className="items-center text-center">
                      <div
                        onClick={() => handleNavigation("/nomad")}
                        className="py-4">
                        <p className="text-secondary-dark text-lg">Nomad</p>
                      </div>
                      <div className="h-[0.2px] bg-gray-300"></div>
                    </li>

                    {/* Case 1: It's a /nomad/:country/:state page */}
                    {isNomadLocation ? (
                      <>
                        {view !== "map" && (
                          <li className="flex flex-col justify-center items-center">
                            <div className="p-4 px-0 whitespace-nowrap">
                              <Link
                                onClick={() => setOpen(false)}
                                to={`${location.pathname}?view=map`}
                                className="group relative text-md  text-black">
                                <span className="relative z-10 group-hover:font-bold mb-2">
                                  Map view
                                </span>
                                <span className="absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                              </Link>
                            </div>
                            <div className="h-[0.2px] bg-gray-300 w-full"></div>
                          </li>
                        )}

                        {view === "map" && (
                          <li className="flex flex-col justify-center items-center">
                            <div className="p-4 px-0 whitespace-nowrap">
                              <Link
                                onClick={() => setOpen(false)}
                                to={`${location.pathname}`}
                                className="group relative text-md text-black">
                                <span className="relative z-10 group-hover:font-bold mb-2">
                                  List view
                                </span>
                                <span className="absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                              </Link>
                            </div>
                            <div className="h-[0.2px] bg-gray-300 w-full"></div>
                          </li>
                        )}
                      </>
                    ) : (
                      // Case 2: Not a /nomad/:country/:state page, always show List View
                      <>
                        {isNomadListingsPage && (
                          <li className="flex items-center justify-center">
                            <div className="p-4 px-0 whitespace-nowrap">
                              <Link
                                to={getListViewPath()}
                                className="group relative text-md text-black">
                                <span className="relative z-10 group-hover:font-bold mb-2">
                                  List view
                                </span>
                                <span className="absolute left-0 bottom-0 top-6 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                              </Link>
                            </div>
                          </li>
                        )}
                      </>
                    )}
                  </>
                </ul>
              </div>
            )}
            {headerLinks.map((item) => (
              <li key={item.id} className="items-center text-center">
                <div onClick={() => handleNavigation(item.to)} className="py-4">
                  <p className="text-secondary-dark text-lg">{item.text}</p>
                </div>
                <div className="h-[0.2px] bg-gray-300"></div>
              </li>
            ))}
            <div className="flex justify-center p-4">
              <PrimaryButton
                title={"Sign In"}
                externalStyles={"bg-primary-blue"}
                handleSubmit={() => {
                  navigate("login");
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
              <span>BRIDG. All rights reserved</span>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
