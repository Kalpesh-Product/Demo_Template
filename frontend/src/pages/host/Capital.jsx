import React from "react";
import GetStartedButton from "../../components/GetStartedButton";
import Container from "../../components/Container";
import tabImageCapital from "/hosts/capital/finance-usd-3.png";
import { useNavigate } from "react-router-dom";

const Capital = () => {
  const navigate = useNavigate()
  const investorData = [
    {
      title: "Investor Management",
      imgSrc:
        "https://cdn.sanity.io/images/q8bht0jl/production/9d6463d6289e7fc2c3b2a276459c70c8e84a6134-864x1151.jpg?auto=format&fit=max&q=100&w=432",
      imgAlt: "capital-img-1",
      content:
        "Get identified and introduced within our network and ecosystem of investors who can support your growth an ambitions.",
    },
    {
      title: "Financial Service",
      imgSrc:
        "https://cdn.sanity.io/images/q8bht0jl/production/231a71aafbef445f1f288a4af09ab3478ce36adf-864x1151.jpg?auto=format&fit=max&q=100&w=432",
      imgAlt: "capital-img-2",
      content:
        "We have curated the best financial services partners for your business who can seamlessly manage your business operations.",
    },
    {
      title: "PERSONAL FUND MANAGER",
      imgSrc:
        "https://cdn.sanity.io/images/q8bht0jl/production/a3a1a5ef1c4d2a1d5b61cb69788ad0e44d60c21f-696x928.jpg?auto=format&fit=max&q=100&w=348",
      imgAlt: "capital-img-3",
      content:
        "Once you are ready to move to the next level, we have a team of talented and experiences Fund Managers who can be your team.",
    },
    {
      title: "VENTURE FUNDING & DEBT",
      imgSrc:
        "https://cdn.sanity.io/images/q8bht0jl/production/c7fea715cb9887d72855b536004d6a464f2a5b2c-864x1151.jpg?auto=format&fit=max&q=100&w=432",
      imgAlt: "capital-img-4",
      content:
        "Our automated analytics platform will help you identify trends when you may need funds and what type of funds which will help your growth.",
    },
  ];

  return (
    <div>
      {/* Top banner section */}
      <Container padding={false}>
        <div className="pt-16 pb-11">
          <h1 className="lg:text-[2.5rem] text-host text-center lg:leading-[3rem] font-medium">
            We{" "}
            <span className="hero_animation-container">
              help the daring
              <svg
                fill="none"
                viewBox="0 0 390 97"
                className="hero__animation hero__animation--standard">
                <path d="M2,76.26c16.11,4.95,31.91,3.84,48.58,3.84,20.39,0,40.67,0,61,1,18,.87,36-1,53.94-1,15.79,0,31.51,1.81,47.31,1.21,24.51-.93,49.17-2.18,73.68-2.49,19.45-.25,39.4,1.59,58.76-.64,15-1.73,29-2.29,39.75-14.79C387.89,60.1,390.5,48.5,386.5,40c-5.69-12.09-12.63-18.68-23.67-25.17C341.68,2.4,314.67,1.82,291.09,2c-21.31.2-55.45,3.62-68.52,24.46C212.14,43.1,212,59.57,227.79,72.77c24.81,20.81,63.45,26.8,93.41,18.85"></path>
              </svg>
            </span>{" "}
            build{" "}
          </h1>
          <h1 className="lg:text-[2.5rem] text-host text-center lg:leading-[3rem] font-medium">
            legandary Companies.
          </h1>
          <div className="flex justify-center lg:justify-end pt-6">
            <GetStartedButton handleSubmit={()=>navigate('/hosts/signup')} title="CONNECT WITH US" />
          </div>
        </div>
      </Container>

      {/* 4 images section */}
      <div className="bg-black text-white pt-12">
        <Container padding={false}>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
            {investorData.map((item, index) => (
              <div key={index}>
                <h3 className="uppercase mb-5 text-xl">{item.title}</h3>
                <div className="rounded-[0.625rem] ">
                  <img
                    src={item.imgSrc}
                    alt={item.imgAlt}
                    className="rounded-[0.625rem] "
                  />
                </div>
                <p className="py-4 pl-1 text-[0.94rem]">{item.content}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Our software Suite section */}
      <Container>
        <div>
          <div>
            <p className="lg:text-[3.32rem] text-host lg:text-left lg:leading-[4rem] font-normal">
              Our software suite amplifies the opportunity for the correct
              investor such as angel investors, venture capital firms and debt
              firms to integrate with your company at the most appropriate time
              regardless of the stage you are which ensure the company does not
              slow its growth strategy.
            </p>
          </div>
        </div>
      </Container>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-[0.375rem] p-2">
        <div className="h-[25rem]">
          <img
            src="https://media.istockphoto.com/id/660743390/photo/angel-investor.jpg?s=612x612&w=0&k=20&c=bMCsPyNz0LLMVYmFh0Kn2f0prRikRbjyNzc9dfvjGcY="
            alt="card-img-1"
            className="object-cover rounded-lg h-full"
          />
        </div>
        <div className="h-[25rem]">
          <img
            src="https://assets.smfgindiacredit.com/sites/default/files/Venture-Capital.jpg?VersionId=YDGq4VyQQAdW2x57A5ucusQkZbmffKwh"
            alt="card-img-2"
            className="object-cover rounded-lg h-full"
          />
        </div>
        <div className="h-[25rem]">
          <img
            src="https://www.techfunnel.com/wp-content/uploads/2021/07/debt-financing.png"
            alt="card-img-3"
            className="object-cover rounded-lg h-full"
          />
        </div>
      </div>

      {/* Systematic & Seamless section */}
      <div className="bg-black text-white">
        <Container padding={false}>
          <div>
            <div className="py-16 flex flex-col gap-10 items-center">
              <h1 className="text-[3.563rem] font-normal text-center leading-[4.3rem]">
                <span className="text-[#0aa9ef]">Systematic & seamless</span>{" "}
                fundraising with accurate projections and cashflow trends.
              </h1>
              <div className="text-center">
                <button onClick={()=>navigate('/hosts/signup')} className="bg-white text-black px-8 py-2 rounded-full">
                  Get Started
                </button>
              </div>
            </div>
            <div>
              <img
                src={tabImageCapital}
                className="w-full h-full object-cover object-top rounded-xl"
                alt="tab-image"
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Capital;
