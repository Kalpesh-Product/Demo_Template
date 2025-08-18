import React from "react";
import Container from "../../components/Container";
import LeadsImage from "/hosts/leads-page/leads-section-image-webp.webp";
import GoogleSheetsImage from "/hosts/leads-page/google-sheets-image-webp.webp";

import RoiImage from "/hosts/leads-page/roi.webp";
import CompleteViewImage from "/hosts/leads-page/complete-view-image.webp";
import FinerPointsImage from "/hosts/leads-page/finer-points-image.webp";

import CompanyLogosDesktop from "/hosts/leads-page/leads-companies-image-desktop.png";
import CompanyLogosTab from "/hosts/leads-page/leads-companies-image-tab.png";
import CompanyLogosMobile from "/hosts/leads-page/leads-companies-image-phone.png";

// import { GrFormCheckmark } from "react-icons/gr";
import { PiCheckFatFill } from "react-icons/pi";
import { ReactFitty } from "react-fitty";
import { useNavigate } from "react-router-dom";
import MySeperator from "../../components/MySeperator";

const checklistItems = [
  "Google My Business",
  "Google Maps",
  "Google Reviews",
  "Google SEO",
  "Website",
  "LinkedIn",
  "Facebook",
  "Instagram",
  "Free Integrations",
  "Cross Promotions",
  "Database",
  "WhatsApp",
];

const contentItems = [
  {
    heading: "SEO tools",
    text: "Use a complete suite of advanced SEO tools to optimize your site for search and increase your organic traffic.",
  },
  {
    heading: "Analytics",
    text: "Get reports with actionable insights and data about your site and marketing activities.",
  },
  {
    heading: "Logo Maker",
    text: "Create a custom logo for your brand in minutes with our AI logo generator.",
  },
  {
    heading: "Google Ads with WoNo",
    text: "Launch a Google Ads campaign to reach your site's target audience and appear high up in Google search results.",
  },
  {
    heading: "Email marketing",
    text: "Create and customize strong email marketing campaigns to engage your audience, send promotions and increase traffic.",
  },
  {
    heading: "Google Business Profile",
    text: "Attract the right customers and boost credibility by managing your business’s presence on Google Maps, Search and more.",
  },
  {
    heading: "Facebook & Instagram Ads",
    text: "Launch targeted ad campaigns on Facebook and Instagram to generate leads and drive traffic.",
  },
  {
    heading: "Marketing integrations",
    text: "Connect tools such as Google Analytics and Facebook Pixel and CAPI to get insights on site traffic, visitor behavior and more.",
  },
  {
    heading: "Social media marketing",
    text: "Design, schedule, and easily share your content across multiple platforms to boost engagement.",
  },
];

const Leads = () => {
  const navigate = useNavigate()
  return (
    <div>
      {/* Top Text section */}
      <Container>
        <div>
          <div>
            <h2 className="lg:text-[2.6rem] md:text-[1.75rem] sm:text-[1.75rem] xs:text-[1.75rem] leading-[1.4] font-semibold text-host">
              Generate continuos structured leads for your business with the
              support of our automated platform and trained and experienced
              resources.
            </h2>
          </div>
          <div className="flex flex-row lg:justify-end md:justify-end  sm:justify-center xs:justify-center items-center py-6">
            <button onClick={()=>navigate('/hosts/signup')} className="bg-black text-white px-8 py-2 rounded-full">
              Get Started
            </button>
          </div>
        </div>
      </Container>

      {/* Social media icons banner */}
      <div>
        <img src={LeadsImage} alt="Leads Image" className="w-full" />
      </div>

      {/* Our Core focus section */}
      <Container padding={false}>
        <div className="pt-16 pb-8">
          <div className="pb-16">
            <h2 className="lg:text-[2.75rem] md:text-[2.75rem] sm:text-[1.75rem] xs:text-[1.75rem] lg:leading-[3.5rem] xs:leading-9 font-semibold text-host">
              Our core focus is to generate ORGANIC LEADS!
            </h2>
            <h2 className="lg:text-[2.75rem] md:text-[2.75rem] sm:text-[1.75rem] xs:text-[1.75rem] lg:leading-[3.5rem] xs:leading-9 font-semibold text-host">
              With NO INVESTMENTS!
            </h2>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 xs:grid-cols-1">
            <div className="col-span-4">
              <div className="pr-4">
                <ul role="list" className="list-none m-0 p-0 space-y-1.5">
                  {checklistItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 mt-0">
                      <PiCheckFatFill
                        size={20}
                        className=" text-primary-blue shrink-0 text-[1.1rem]"
                        aria-hidden
                      />
                      <span className="text-slate-800 text-[1.1rem] mt-0">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-span-8">
              {/* Desktop */}
              <img
                src={CompanyLogosDesktop}
                alt="Leads Company Logos"
                className="hidden lg:block"
              />

              {/* Tablet */}
              <img
                src={CompanyLogosTab}
                alt="Leads Company Logos Tablet"
                className="hidden md:block lg:hidden"
              />

              {/* Mobile */}
              <img
                src={CompanyLogosMobile}
                alt="Leads Company Logos Mobile"
                className="block md:hidden"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Automated Google Leads Section */}
      <Container padding={false}>
        <div className="pt-16 pb-8">
          <div className="pb-6">
            <h2 className="lg:text-[2.75rem] md:text-[2.75rem] sm:text-[1.75rem] xs:text-[1.75rem] lg:leading-[3.5rem] md:leading-9 sm:leading-9 xs:leading-9 font-semibold text-host">
              Automated Google LEAD SHEET!
            </h2>
            <h2 className="lg:text-[2.75rem] md:text-[2.75rem] sm:text-[1.75rem] xs:text-[1.75rem]  lg:leading-[3.5rem] md:leading-9 sm:leading-9 xs:leading-9  font-semibold text-host">
              Never miss any leads generated from our platform.
            </h2>
          </div>
          <div className="h-[16rem] pt-[1.875rem]">
            <img
              src={GoogleSheetsImage}
              alt="Google Sheets"
              className="w-full object-cover h-full"
            />
          </div>
        </div>
      </Container>


      {/* Run & Scale Grid Section */}
      <Container padding={false}>
        <div className="pt-16 pb-8">
          <ReactFitty className="text-host">
            RUN & SCALE YOUR BUSINESS
          </ReactFitty>

          <h2 className=" lg:text-left lg:text-[2.5rem] xs:text-center xs:text-3xl font-semibold text-host pb-4 border-b-2 border-gray-500 pt-2">
            Marketing
          </h2>

          <br />
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {contentItems.map((item, index) => (
              <div key={index} className="py-2">
                <h2 className="text-[1.5rem] font-semibold text-[#212529]">{item.heading}</h2>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="flex lg:justify-end xs:justify-center items-center lg:px-8">
            <button onClick={()=>navigate('/hosts/signup')} className="bg-black text-white px-8 py-2 rounded-full">
              Get Started
            </button>
          </div>
        </div>
      </Container>

      <div className="flex items-center justify-center h-0">
        <hr className="w-[80%] h-0 m-0 border-t  border-gray-400" />
      </div>

      {/* Get better ROI Section */}
      <Container padding={false}>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 py-8">
          <div>
            <img src={RoiImage} alt="ROI Image" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="lg:text-[4rem] sm:text-[2.5rem] xs:text-[2.5rem] leading-[1.2]  text-host">
              Get better ROI from your marketing.
            </h2>

            <p className="text-[1.2rem] pt-8">
              Discover all the ways that Analytics surfaces helpful insights for
              a complete understanding of your customers — from built-in
              automation and customized reporting, to cross-platform attribution
              and more.
            </p>
          </div>
        </div>
      </Container>

      <div className="flex items-center justify-center h-0">
        <hr className="w-[80%] h-0 m-0 border-t  border-gray-400" />
      </div>

      {/* Get a Complete View Section */}
      <Container padding={false}>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 py-8">
          <div className="flex flex-col justify-center lg:order-1 md:order-1 sm:order-2 xs:order-2">
            <h2 className="lg:text-[4rem] sm:text-[2.5rem] xs:text-[2.5rem] leading-[1.2]  text-host">
              Get a complete view.
            </h2>

            <p className="text-[1.2rem] pt-8">
              Analytics helps you get a more complete understanding of how your
              customers engage with your business so you can deliver better
              experiences and drive results.
            </p>
          </div>
          <div className="lg:order-2 md:order-2 sm:order-1 xs:order-1">
            <img src={CompleteViewImage} alt="Complete View Image" />
          </div>
        </div>
      </Container>

      <div className="flex items-center justify-center h-0">
        <hr className="w-[80%] h-0 m-0 border-t  border-gray-400" />
      </div>

      {/* The finer points Section */}
      <Container padding={false}>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 py-8">
          <div>
            <img src={FinerPointsImage} alt="Finer Points" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="lg:text-[4rem] sm:text-[2.5rem] xs:text-[2.5rem] leading-[1.2]  text-host">
              The finer points.
            </h2>

            <p className="text-[1.2rem] pt-8">
              Analytics helps you understand how people use your sites and apps,
              so you can take action to improve their experience. Discover what
              Google Analytics can do by checking out the features listed below.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Leads;
