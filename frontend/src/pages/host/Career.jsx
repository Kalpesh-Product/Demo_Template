import { Container } from "@mui/material";
import React, { useState } from "react";
import Jobrole from "../Jobrole";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "../../utils/axios";

const HostCareer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const { data: jobRoles, isLoading } = useQuery({
    queryKey: ["jobRoles"],
    queryFn: async () => {
      const response = await axios.get("job/get-job-posts");
      return response.data;
    },
  });

  const toggleAccordion = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <Container padding={false}>
      <div className="">
        <h3 className="text-4xl md:text-6xl font-semibold mb-6">
          JOIN OUR TEAM
        </h3>
        <h2 className="text-xl md:text-3xl font-bold mb-4">OPEN POSITION</h2>
        <div className="border-b-2 border-gray-300 w-[5%] mb-6"></div>
        {/* <Jobrole jobRoles={jobRoles}/> */}
        <div className="flex flex-col gap-4">
          {jobRoles.map((section, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-b pb-4 overflow-hidden">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex justify-between items-center py-6 text-left text-3xl font-bold focus:outline-none">
                  {section.categoryTitle}
                  <FaChevronDown
                    className={`text-gray-600 transition-transform duration-300 text-sm ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion Body with Transition */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}>
                  <div className="space-y-4 mt-2">
                    {section.jobs.map((job, jobIdx) => (
                      <div key={job.id}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 ">
                          <div className="md:w-1/2 lg:w-1/2 sm:w-full xs:w-full md:py-8 lg:py-6">
                            <p className="font-bold text-2xl">
                              {jobIdx + 1}. {job.title}
                            </p>
                            {job.subtitle && (
                              <p className="text-sm text-black ">
                                {job.subtitle}
                              </p>
                            )}
                          </div>
                          <div className="text-right flex items-center gap-10 sm:justify-between xs:justify-between md:justify-end lg:justify-end md:w-1/2 lg:w-1/2  sm:w-full xs:w-full">
                            <p className="text-sm font-semibold text-gray-900">
                              {job.type} | {job.mode} | {job.location}
                            </p>
                            <div className="flex justify-end mt-1">
                              {/* <Link
                            to={`/nomad/career`}
                            className="border-2 border-gray-600 p-2 rounded-md hover:bg-black hover:text-white transition-colors">
                            <FaChevronRight />
                          </Link> */}
                              <Link
                                to={`job/${job.id}`}
                                className="border-2 border-gray-600 p-2 rounded-md hover:bg-black hover:text-white transition-colors">
                                <FaChevronRight />
                              </Link>
                            </div>
                          </div>
                        </div>
                        {section.jobs.length > 1 &&
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
      <div className="py-20"></div>
    </Container>
  );
};

export default HostCareer;
