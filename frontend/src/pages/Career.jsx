// Career.jsx
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Container from "../components/Container";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";
import romans from "romans";


const Career = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { pathname } = useLocation();
  const isHost = pathname.includes("host");
  const customLink = isHost ? `/hosts/career/job` : `/nomad/career/job`;
  // const customRoute = isHost ? "job/get-job-posts" : "";

  const categoryOrder = [
  "Product Management",
  "Tech",
  "Finance",
  "HR & EA",
  "Sales",
  "Marketing",
  "Internships",
];

 const { data: jobRoles, isLoading } = useQuery({
  queryKey: ["jobRoles"],
  queryFn: async () => {
    const response = await axios.get("job/get-job-posts");
    // sort API response by category order
    return response.data.sort(
      (a, b) =>
        categoryOrder.indexOf(a.categoryTitle) -
        categoryOrder.indexOf(b.categoryTitle)
    );
  },
});

  const toggleAccordion = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  // const jobData = isHost ? jobRoles : jobRolesDummy;

  return (
    <Container>
      <div className="">
        <h3 className="text-4xl md:text-6xl font-semibold text-host">
          JOIN OUR TEAM
        </h3>
        <br />
        <h2 className="text-xl md:text-3xl font-semibold mb-4 text-host">
          OPEN POSITION
        </h2>
        <div className="border-b-2 border-gray-300 w-[5%] mb-6"></div>
        {/* <Jobrole jobRoles={jobRoles}/> */}
        <div className="flex flex-col gap-4">
          {isLoading
            ? []
            : jobRoles
                .filter((item) => {
                  
                  return item.jobPosts?.length;
                })
                .map((section, idx) => {
                  const isOpen = openIndex === idx;

                  return (
                    <div key={idx} className="border-b pb-4 overflow-hidden">
                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full flex justify-between items-center py-6 text-left text-3xl font-semibold focus:outline-none"
                      >
                        {romans.romanize(idx + 1)}.{section.categoryTitle}
                        <FaChevronDown
                          className={`text-gray-600 transition-transform duration-300 text-sm ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Accordion Body with Transition */}
                      <div
                        className={`transition-all duration-500 ease-in-out ${
                          isOpen
                            ? "max-h-[2000px] opacity-100"
                            : "max-h-0 opacity-0"
                        } overflow-hidden`}
                      >
                        <div className="space-y-4 mt-2">
                          {section.jobPosts?.map((job, jobIdx) => (
                            <div key={job._id}>
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 ">
                                <div className="md:w-1/2 lg:w-1/2 sm:w-full xs:w-full md:py-8 lg:py-6">
                                  {/* <p className="font-medium text-subtitle"> */}
                                  <p className="font-semibold text-2xl">
                                    {jobIdx + 1}. {job.title}
                                  </p>
                                  {job.title && (
                                    <p className="text-sm text-black ">
                                      {job?.subtitle}
                                    </p>
                                  )}
                                </div>
                                <div className="text-right flex items-center gap-10 sm:justify-between xs:justify-between md:justify-end lg:justify-end md:w-1/2 lg:w-1/2  sm:w-full xs:w-full">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {job?.jobType} | {job?.jobMode} |{" "}
                                    {job?.location}
                                  </p>
                                  <div className="flex justify-end mt-1">
                                    {/* <Link
                            to={`/nomad/career`}
                            className="border-2 border-gray-600 p-2 rounded-md hover:bg-black hover:text-white transition-colors">
                            <FaChevronRight />
                          </Link> */}
                                    <Link
                                      to={`${customLink}/${
                                        job.title
                                          .toLowerCase()
                                          .replace(/[.\s/]+/g, "-") // replace space, dot, slash with -
                                          .replace(/-\)/g, ")") // remove hyphen before (
                                          .replace(/\(-/g, "(") // remove hyphen after )
                                      }`}
                                      state={{
                                        about: job.about,
                                        responsibilities: job.responsibilities,
                                        qualifications: job.qualifications,
                                      }}
                                      className="border-2 border-gray-600 p-2 rounded-md hover:bg-black hover:text-white transition-colors"
                                    >
                                      <FaChevronRight />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              {section?.jobs?.length > 1 &&
                                jobIdx < section.jobs.length - 1 && (
                                  <hr className="mt-4" />
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
        </div>
      </div>

      {/* extra spacing below to match current wono website (Current as in: as of 02-08-2025) */}
      {/* <div className="py-20"></div> */}
    </Container>
  );
};

export default Career;
