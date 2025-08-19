import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaRupeeSign,
  FaFacebookF,
} from "react-icons/fa";
import sliderImageOne from "../assets/main-slider-images/slider-image-1.png";
import sliderImageTwo from "../assets/main-slider-images/slider-image-2.png";
import logo from "../assets/wono-logo-white.png";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { FaXTwitter } from "react-icons/fa6";

const slides = [
  {
    image: sliderImageOne,
    text: "A one stop platform for Nomads to manage their Nomad Lifestyle and discover the most curated co-working, hostels, working cafes, meeting spaces across Aspiring Destinations!",
  },
  {
    image: sliderImageTwo,
    text: "A No-Code SaaS platform built to empower nomad-friendly hosting businesses worldwide. Includes Website Builder, Meeting Room Booking, Tickets, Visitors and other modules.",
  },
];

const MainPage = () => {
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 10,
    },
  });

  useEffect(() => {
    if (!slider || !slider.current) return;

    intervalRef.current = setInterval(() => {
      slider.current.next();
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, [slider]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Left Column */}
        <figure className="flex flex-col w-full h-full justify-center items-center p-4 lg:p-6">
          <img
            src="images/main-page-1.png"
            alt="wono"
            className="object-cover max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl lg:w-full"
          />
        </figure>

        {/* Vertical Centered Dotted Separator */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[90%] border-l-2 border-dashed border-gray-600 z-10" />

        {/* Right Column */}
        <article className="flex flex-col gap-4 w-full h-full justify-center items-center p-8">
          <div ref={sliderRef} className="keen-slider w-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="keen-slider__slide flex flex-col items-center gap-4 text-center">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
                <p className="text-gray-700 text-[0.9rem] text-pretty leading-relaxed md:line-clamp-3 md:max-h-[6em] overflow-hidden">
                  {slide.text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-8 w-full justify-center items-center pt-4">
            <PrimaryButton
              title="For Nomads"
              handleSubmit={() => navigate("nomad")}
              externalStyles="bg-[#FF5757] text-[1rem] flex text-white font-[500] capatilize hover:bg-[#E14C4C] w-[12rem] px-6"
            />
            <PrimaryButton
              title="For Hosts"
              handleSubmit={() =>
                // (window.location.href = "https://www.wono.co")
                navigate("hosts")
              }
              externalStyles="bg-[#FF5757] text-[1rem] flex text-white font-[500] capatilize hover:bg-[#E14C4C] w-[12rem] px-6"
            />
          </div>
        </article>
      </div>
      <div className="flex justify-evenly items-center flex-row w-full sm:flex-col xs:flex-col lg:flex-row md:flex-row">
        <div className="w-32"></div>
        <div className="w-full  ">

          <p className="text-center pb-2 sm:text-tiny xs:text-tiny lg:text-content">
            <span className="whitespace-nowrap">
              &copy; Copyright {new Date().getFullYear()} -{" "}
              {(new Date().getFullYear() + 1).toString().slice(-2)}
            </span>
            <span className="block sm:inline">
              {" "}
              WONOCO PRIVATE LIMITED – SINGAPORE. All Rights Reserved.
            </span>
          </p>
        </div>
        <div className="flex items-right justify-end gap-4  pb-2 px-6 w-32">
          <FaFacebookF className="text-[12px]" />

          <FaXTwitter className="text-[12px]" />
          <FaInstagram className="text-[12px]" />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
