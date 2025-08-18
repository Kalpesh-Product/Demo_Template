import React from "react";
import Container from "../../components/Container";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingGlobe from "../../components/RotatingGlobe";
import images from "../../assets/images";
import FeatureCard from "../../components/FeatureCard";
import { ReactFitty } from "react-fitty";
import GetStartedButton from "../../components/GetStartedButton";
import { NavLink, useNavigate } from "react-router-dom";
import MySeperator from "../../components/MySeperator";

const HostHome = () => {
  // mobile screen for globe responsiveness
  const ismobile = window.innerWidth < 769;
  const isTablet = window.innerWidth < 1025;
  const isLaptop = window.innerWidth < 1441;
  const navigate = useNavigate();
  const amenities = [
    // Group 1
    { id: 1, title: "No Code Website", icon: images.website },
    { id: 11, title: "Booking Engine", icon: images.bookingsSaas }, // using bookingsSaas as booking engine
    { id: 2, title: "Payment Gateway", icon: images.paymentGateway },
    { id: 5, title: "Leads Management", icon: images.leadGenerationSM },
    { id: 27, title: "AI SEO", icon: images.automatedSeoSM },
    { id: 23, title: "Notifications", icon: images.notifications },

    // Group 2
    { id: 25, title: "Tickets", icon: images.ticketRaisingCM },
    { id: 20, title: "Tasks", icon: images.taskManagementHR },
    { id: 7, title: "Meeting Rooms", icon: images.meetingRoomsCM },
    { id: 21, title: "Visitors", icon: images.visitorCM },
    { id: 19, title: "Assets", icon: images.eSignHR },
    { id: 22, title: "Calendar", icon: images.calendar },

    // Group 3
    { id: 4, title: "Sales", icon: images.sales },
    { id: 3, title: "Finance", icon: images.financialReportsFA },
    { id: 12, title: "Human Resource", icon: images.employeeReportsRA },
    { id: 18, title: "IT", icon: images.fullDataAnalysisRA },
    {
      id: 28,
      title: "Maintenance",
      icon: images.maintenanceCM || images.assets,
    }, // fallback if no icon exists
    { id: 17, title: "Admin", icon: images.customerProfile },

    // Group 4
    { id: 29, title: "Customer Service", icon: images.customerService },
    { id: 15, title: "Marketing", icon: images.smsMarketingSM },
    { id: 10, title: "Cafe", icon: images.cafeOrdersCM },
    { id: 9, title: "Events", icon: images.events },
    { id: 24, title: "Profile", icon: images.customerProfile },
    { id: 26, title: "Analytics", icon: images.analyticsCM },
  ];
  const onePartner = [
    {
      id: 1,
      title: "Global Bookings",
      description:
        "Become a globally acceptable business where customers can book  your offerings seamlessly and with great experience",
    },
    {
      id: 2,
      title: "Systems & Processes",
      description:
        "Our SaaS platform has everything covered for your business requirements and we customize ourselves as per your needs.",
    },
    {
      id: 3,
      title: "Growth & Revenues",
      description:
        "Our approach is based on data and analytics to help you make decisions which will grow your business without employee dependency.",
    },
  ];
  const noCode = [
    { id: 1, image: "/hosts/themes/cafe.webp", label: "Cafe" },
    { id: 2, image: "/hosts/themes/coworking.png", label: "Co-Working" },
    { id: 3, image: "/hosts/themes/coliving.png", label: "Co-Living" },
    { id: 4, image: "/hosts/themes/boutique.png", label: "Boutique" },
  ];
  return (
    <main>
      <section className="bg-[#f7feec] mb-0 lg:mb-0">
        <Container>
          <div className="lg:space-y-0">
            <div className="flex flex-col md:flex-row justify-center items-center ">
              <div className="mb-0 md:mb-20 text-center w-full">
                <h1 className="font-semibold text-[clamp(3.3rem,6.8vw,7rem)]">
                  Introducing
                </h1>{" "}
              </div>
              <div className="leading-normal text-center w-full">
                <div className="relative mb-8 lg:mb-0">
                  <h1 className="font-semibold text-[clamp(2.8rem,6.1vw,6rem)] text-nowrap">
                    N-Commerce
                  </h1>
                  <img
                    className="absolute w-full -bottom-6 left-0 h-1/2"
                    src="/blue-line.png"
                    alt="underline"
                  />
                </div>
                <p className="text-[clamp(1.5rem,3.2vw,3rem)]">
                  "<span className="font-semibold">Wo</span>rld{" "}
                  <span className="font-semibold">No</span>mad{" "}
                  <span className="font-semibold">Co</span>mmerce"
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 py-12">
              <p className="text-subtitle lg:text-title font-semibold">
                A simple NO CODE SaaS Platform.
              </p>
              <p className="text-content">
                We support businesses in small and aspiring destinations which
                host Nomads!
              </p>
              <p className="text-content">
                SaaS Tech for Nomad supoorting businesses across the world.
                <span className="font-medium">
                  (Example: Co-Working, Co-Living, Hostels, Workations, Resorts,
                  Cafes, Events etc)
                </span>
              </p>
            </div>
            <div className="flex justify-center items-center w-full h-full my-12">
              <div
                onClick={() => navigate("signup")}
                className="relative hover:font-semibold w-full text-center  cursor-pointer"
              >
                <p className="uppercase my-0  md:my-16">It's Completely free</p>
                <img
                  src="/blue-circle.png"
                  alt="blue circle"
                  className="absolute  -top-6 left-[22%] md:top-8 md:left-[35%] lg:left-[41%] md:right-6 w-48 h:16 md:w-56 md:h-30"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* GLOBE SECTIon */}
      <section className="bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[70vh] font-hero">
            <div
              className="min-w-full h-[50vh] lg:h-full"
              style={{ textAlign: "left" }}
            >
              <Canvas
                className="canvas"
                camera={{
                  position: [0, 0, ismobile ? 15 : 25],
                  fov: ismobile ? 50 : isTablet ? 50 : isLaptop ? 40 : 28,
                }}
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <RotatingGlobe />
                <OrbitControls
                  enableZoom={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={(2 * Math.PI) / 3}
                />
              </Canvas>
            </div>
            <div className=" flex flex-col justify-center items-center w-full">
              <h3 className="text-white text-[clamp(1rem,2.9vw,7rem)] text-nowrap">
                <strong>
                  SUPPORTING THE FOUNDATION OF N-COMMERCE <br />
                </strong>
              </h3>
              <p className="text-primary-blue text-[clamp(2.3rem,6.4vw,7rem)] text-nowrap">
                {" "}
                “NOMAD COMMERCE”{" "}
              </p>
              <div
                className="w-1/2 lg:w-fit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GetStartedButton
                  title="CONNECT WITH US"
                  externalStyles={
                    "bg-white text-seconadary-dark w-full text-subtitle lg:text-content"
                  }
                  handleSubmit={() => {
                    navigate("signup");
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* GLOBE SECTIon */}
      {/* Key Modules */}
      <Container>
        <section className="space-y-2">
          <div>
            <h1 className="text-[clamp(1.2rem,4.9vw,7rem)] font-semibold text-center text-secondary-dark">
              KEY MODULES FOR YOUR BUSINESS
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((item) => (
              <FeatureCard key={item.id} icon={item.icon} title={item.title} />
            ))}
          </div>
        </section>
      </Container>
      {/* Key Modules */}
      <Container padding={false}>
        <hr className="border-t-2 border-gray-300" />
      </Container>
      <section>
        <Container>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col leading-tight">
              <ReactFitty>
                <h1 className="font-semibold uppercase">
                  One Partner Platform
                </h1>
              </ReactFitty>
              <ReactFitty>
                <p className="font-semibold uppercase">
                  Infinite possibilities and opportunities!
                </p>
              </ReactFitty>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {onePartner.map((item) => (
                <div
                  key={item.id}
                  className="border-t-2 border-black w-full space-y-2 py-2"
                >
                  <h1 className="text-title py-4">
                    {item.title || "Title here"}
                  </h1>
                  <span className="text-secondary-dark">
                    {item.description || "Description here"}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex w-full justify-center lg:justify-end pr-0 lg:pr-20">
              <GetStartedButton
                title={"Get Started"}
                handleSubmit={() => navigate("signup")}
              />
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#f7f7f7]">
        <Container>
          <div className="flex flex-col leading-tight">
            <ReactFitty>
              <h1 className="font-semibold uppercase">NO CODE SELF SERVE</h1>
            </ReactFitty>
            <ReactFitty>
              <p className="font-semibold uppercase">
                TRANSACTIONAL WEBSITE & MOBILE SITE
              </p>
            </ReactFitty>
            <p className="text-[clamp(1rem,1.8vw,3rem)] my-4 lg:my-4">
              Free customizable website templates which are strategically
              tailored for managing Lifestyle Businesses like Co-Working,
              Co-Living, Hostels, Boutique Properties, Cafes etc
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
              {noCode.map((item) => (
                <div
                  key={item.id}
                  className="h-72 w-full overflow-hidden rounded-lg  shadow-lg"
                >
                  <img
                    src={item.image || "/hosts/themes/cafe.webp"}
                    className="h-full w-full object-cover"
                    alt={item.label || "image"}
                  />
                </div>
              ))}
            </div>
            <div className="text-center my-4">
              <NavLink
                to={"themes"}
                className={" hover:underline hover:text-primary-blue"}
              >
                View More
              </NavLink>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="flex flex-col gap-10">
            <h1 className="text-title lg:text-[4.3rem] uppercase text-center font-semibold lg:font-medium">
              TESTIMONIAL
            </h1>
            <div className="flex flex-col gap-4 lg:gap-10 md:flex-row justify-between w-full items-stretch">
              {/* Left Section */}
              <div className="flex flex-col justify-between h-full lg:h-[26rem] w-full lg:w-[90%]">
                <div className="w-full lg:w-[80%]">
                  <p className="text-card-title font-medium text-[#212529] leading-normal">
                    “We went from managing 3,000 sq ft to 50,000+ sq ft in the
                    most efficient and seamless manner with tech, processes,
                    data analytics, customer & employee management and due to an
                    extraordinary extended team like WoNo which integrated with
                    us and had no demands!”
                  </p>
                </div>
                <div>
                  <h4
                    className="my-4"
                    style={{ fontFamily: "Amsterdam", fontSize: "2rem" }}
                  >
                    Kashif Shaikh
                  </h4>
                  <p className="m-0">Co-Founder & COO</p>
                  <p>BIZ Nest, Goa India </p>
                </div>
              </div>

              {/* Right Section */}
              <div className="h-[26rem] w-full lg:w-1/2 overflow-hidden rounded-xl">
                <img
                  src="/hosts/themes/Kashif_Edit.png"
                  alt="owner-image"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <MySeperator />
      <div className="flex w-full justify-center lg:justify-center my-16">
        <GetStartedButton
          title={"Get Started"}
          handleSubmit={() => navigate("signup")}
        />
      </div>
      {/* <MySeperator /> */}
    </main>
  );
};

export default HostHome;
