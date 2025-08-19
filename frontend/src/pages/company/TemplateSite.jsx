// src/pages/TemplateSite.jsx
import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

// helper to get subdomain
function getTenantFromHost() {
  const hostname = window.location.hostname; // e.g. "biznest.localhost"
  const parts = hostname.split(".");
  return parts[0] === "www" ? null : parts[0]; // "biznest"
}


const TemplateSite = () => {
  const tenant = getTenantFromHost();

  const { data, isPending, error } = useQuery({
    queryKey: ["company", tenant],
    queryFn: async () => {
      const res = await axios.get(`https://wonotestbe.vercel.app/api/editor/get-template/${tenant}`); 
      // axios auto-parses JSON
      return res.data;
    },
    enabled: !!tenant, // only run if we actually have a subdomain
  });

  if (!tenant) {
    return <div>No tenant specified</div>;
  }

  if (isPending) {
    return <div>Loading site...</div>;
  }

  if (error) {
    return <div>Error loading site: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{data?.companyName || "sda"}</h1>
      <p className="mt-4 text-lg">{data?.description}</p>

      {data.companyLogo && (
        <img
          src={data?.companyLogo}
          alt={data?.companyName}
          className="mt-6 max-h-32 object-contain"
        />
      )}
    </div>
  );
};

export default TemplateSite;
