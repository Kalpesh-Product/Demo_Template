import React from "react";
import icons from "../assets/icons";

// Master fixed amenities dictionary by vertical
const fixedAmenitiesMap = {
  coworking: [
    "Private Desk",
    "Private Storage",
    "Air Conditioning",
    "High Speed Wi-Fi",
    "IT Support",
    "Tea & Coffee",
    "Reception Support",
    "Admin Support",
    "Housekeeping",
    "Community",
    "Maintenance",
    "Power Backup",
    "Meeting Room",
    "Cafeteria",
    "Printing Services",
    "CCTV Secure",
    "Water Purifier",
    "Custom Solutions",
  ],
  coliving: [
    "Shared Space",
    "Private Space",
    "Private Storage",
    "Air Conditioning",
    "Wi-Fi",
    "IT Support",
    "Tea & Coffee",
    "Reception Support",
    "Admin Support",
    "Housekeeping",
    "Community",
    "Maintenance",
    "Power Backup",
    "Cafeteria",
    "Printing Services",
    "Laundry Facilities",
    "CCTV Secure",
    "Swimming Pool",
  ],
  "private-stay": [
    "Private Space",
    "Private Storage",
    "Television",
    "Air Conditioning",
    "Wi-Fi",
    "IT Support",
    "Tea & Coffee",
    "Reception Support",
    "Admin Support",
    "Housekeeping",
    "Community",
    "Maintenance",
    "Power Backup",
    "Cafeteria",
    "Printing Services",
    "Washing Machine",
    "CCTV Secure",
    "Swimming Pool",
  ],
  hostel: [
    "Shared Space",
    "Private Space",
    "Private Storage",
    "Air Conditioning",
    "Wi-Fi",
    "IT Support",
    "Tea & Coffee",
    "Reception Support",
    "Admin Support",
    "Housekeeping",
    "Community",
    "Maintenance",
    "Power Backup",
    "Cafeteria",
    "Printing Services",
    "Laundry Facilities",
    "CCTV Secure",
    "Swimming Pool",
  ],
  cafe: [
    "Private Desk",
    "Private Storage",
    "Air Conditioning",
    "High Speed Wi-Fi",
    "IT Support",
    "Tea & Coffee",
    "Reception Support",
    "Admin Support",
    "Housekeeping",
    "Community",
    "Maintenance",
    "Power Backup",
    "Visitor allowed",
    "Cafeteria",
    "Printing Services",
    "CCTV Secure",
    "Water Purifier",
    "Custom Solutions",
  ],
  meetingrooms: [
    "Private Meeting Room",
    "Smart Television",
    "Air Conditioning",
    "High Speed Wi-Fi",
    "IT Support",
    "Tea & Coffee",
    "Reception Support",
    "Admin Support",
    "Housekeeping",
    "Community",
    "Maintenance",
    "Power Backup",
    "Visitor allowed",
    "Cafeteria",
    "Printing Services",
    "CCTV Secure",
    "Water Purifier",
    "Custom Solutions",
  ],
};

// Normalize key for matching
const normalizeKey = (str) =>
  str.toLowerCase().replace(/[\s&]/g, "").trim();

export default function AmenitiesList({ type = "coworking", inclusions = [] }) {
  // Normalize all backend inclusions once
  const normalizedInclusions = inclusions.map(normalizeKey);

  // Pick correct fixed amenities list based on type
  const fixedAmenities = fixedAmenitiesMap[type?.toLowerCase()] || [];

  // Sort: available first, then unavailable; both groups sorted alphabetically
  const sortedAmenities = [...fixedAmenities].sort((a, b) => {
    const aAvailable = normalizedInclusions.includes(normalizeKey(a));
    const bAvailable = normalizedInclusions.includes(normalizeKey(b));

    if (aAvailable && !bAvailable) return -1; // a before b
    if (!aAvailable && bAvailable) return 1; // b before a
    return a.localeCompare(b); // both same availability -> alphabetical
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-24 gap-y-10">
      {sortedAmenities.map((amenity) => {
        const key = normalizeKey(amenity);
        const isAvailable = normalizedInclusions.includes(key);
        const iconSrc = icons[key] || "/icons/default.webp";

        return (
          <div
            key={amenity}
            className="flex flex-row gap-1 w-full lg:w-40 items-center"
          >
            <div className="h-10 w-10 overflow-hidden relative rounded">
              <img
                src={iconSrc}
                className="h-full w-full object-contain"
                alt={amenity}
              />
              {!isAvailable && (
                <div className="absolute h-full w-[2px] -top-1 left-[45%] -rotate-45 bg-black" />
              )}
            </div>
            <p
              className={`text-center text-secondary-dark w-full text-[0.89rem] uppercase ${
                !isAvailable ? "line-through" : ""
              }`}
            >
              {amenity}
            </p>
          </div>
        );
      })}
    </div>
  );
}
