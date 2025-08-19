import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Container from "../components/Container";
import JobApplicationForm from "./JobApplicationForm";
import HostJobApplicationForm from "./host/HostJobApplicationForm";

const JobDetails = () => {
  const { title } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const { pathname, state } = useLocation();
  const { about, responsibilities, qualifications } = state;
  const isHost = pathname.includes("host");

  return (
    <Container>
      <div className="">
        <h2 className="text-4xl md:text-3xl font-normal text-center mb-6">
          {title?.split("-")?.length ? title?.split("-")?.join(" ")?.toUpperCase():title}
        </h2>

        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-300 mb-8">
          <button
            className={`px-6 py-2 font-medium w-full ${
              activeTab === "description"
                ? "border-b-2 border-black"
                : "text-primary-blue"
            }`}
            onClick={() => setActiveTab("description")}
          >
            JOB DESCRIPTION
          </button>
          <button
            className={`px-6 py-2 font-medium w-full ${
              activeTab === "apply"
                ? "border-b-2 border-black "
                : "text-primary-blue"
            }`}
            onClick={() => setActiveTab("apply")}
          >
            APPLY NOW
          </button>
        </div>

        {/* Content */}
        {activeTab === "description" ? (
          <div className="text-sm leading-relaxed text-gray-800 space-y-6">
            {/* About the Job */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About the Job</h3>
              <p>{about}</p>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
              <ul className="space-y-2">
                {responsibilities && responsibilities.length > 0
                  ? responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500">✔</span>
                        <span>{item}</span>
                      </li>
                    ))
                  : []}
              </ul>
            </div>

            {/* Qualifications */}
            <div className="pb-8">
              <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
              <ul className="space-y-2">
                {qualifications && qualifications.length > 0
                  ? qualifications.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500">✔</span>
                        <span>{item}</span>
                      </li>
                    ))
                  : []}
              </ul>
            </div>

            {/* Footer */}

            <p className="text-sm pb-8 mt-0 border-t border-gray-300 ">
              Please send in your Resume to <strong>Email : hr@wono.co</strong>{" "}
              if unable to apply now
            </p>
          </div>
        ) : <JobApplicationForm title={title}/>}
      </div>
    </Container>
  );
};

export default JobDetails;
