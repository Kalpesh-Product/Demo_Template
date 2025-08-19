import { MenuItem, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Container from "../components/Container";
import { NavLink, useNavigate } from "react-router-dom";
import Map from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios.js";
import renderStars from "../utils/renderStarts.jsx";
import SkeletonCard from "../components/Skeletons/SkeletonCard.jsx";
import SkeletonMap from "../components/Skeletons/SkeletonMap.jsx";
import Select from "react-dropdown-select";
import { setFormValues } from "../features/locationSlice.js";
import ListingCard from "../components/ListingCard.jsx";
import newIcons from "../assets/newIcons.js";
import { IoSearch } from "react-icons/io5";
import SearchBarCombobox from "../components/SearchBarCombobox.jsx";
import { AnimatePresence, motion } from "motion/react";

const GlobalListingsList = () => {
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.location.formValues);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const { handleSubmit, control, reset, setValue, getValues, watch } = useForm({
    defaultValues: {
      country: "",
      location: "",
      category: "",
    },
  });
  const selectedCountry = watch("country");
  const selectedState = watch("location");
  const { data: locations = [], isLoading: isLocations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      try {
        const response = await axios.get("company/company-locations");
        return Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error(error?.response?.data?.message);
      }
    },
  });

  const countryOptions = locations.map((item) => ({
    label: item.country?.charAt(0).toUpperCase() + item.country?.slice(1),
    value: item.country?.toLowerCase(),
  }));
  const filteredLocation = locations.find(
    (item) =>
      item.country ===
      (selectedCountry
        ? selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1)
        : "")
  );
  const locationOptions = filteredLocation?.states?.map((item) => ({
    label: item,
    value: item?.toLowerCase(),
  }));
  const countOptions = [
    { label: "1 - 5", value: "1-5" },
    { label: "5 - 10", value: "5-10" },
    { label: "10 - 25", value: "10-25" },
    { label: "25+", value: "25+" },
  ];
  const categoryOptions = [
    { label: "Co-Working", value: "coworking" },
    // { label: "Co-Living", value: "coliving" },
    { label: "Hostels", value: "hostel" },
    { label: "Workation", value: "workation" },
    { label: "Private Stay", value: "privatestay" },
    { label: "Meetings", value: "meetingRoom" },
    { label: "Cafe’s", value: "cafe" },
  ];
  const typeOrder = [
    "coworking",
    "hostel",
    "workation",
    "privateStay",
    "meetingRoom",
    "cafe",
    "coliving",
  ];
  console.log("formData", formData);
  const handleShowMoreClick = (type) => {
    setExpandedCategories((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const { data: listingsData, isPending: isLisitingLoading } = useQuery({
    queryKey: ["globallistings", formData], // ✅ ensures it refetches when formData changes
    queryFn: async () => {
      const { country, location, category } = formData || {};

      const response = await axios.get(
        `company/companies?country=${country}&state=${location}`
      );

      // return response.data;
      return Array.isArray(response.data) ? response.data : [];
    },
    enabled: !!formData?.country && !!formData?.location, // ✅ prevents fetching on empty state
  });

  const groupedListings = listingsData?.reduce((acc, item) => {
    if (item.companyType === "coliving") return acc; // skip coliving
    if (!acc[item.companyType]) acc[item.companyType] = [];
    acc[item.companyType].push(item);
    return acc;
  }, {});

  console.log("frou[ed ", groupedListings);

  const typeLabels = {
    coworking: "Co-Working Spaces",
    coliving: "Co-Living Spaces",
    hostel: "Hostel",
    privatestay: "Private Stay",
    meetingroom: "Meeting Rooms",
    cafe: "Cafe",
    // fallback for unknown types
    default: (type) => `${type[0].toUpperCase() + type.slice(1)} Spaces`,
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const navigate = useNavigate();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const onSubmit = (data) => {
    locationData(data);
  };

  useEffect(() => {
    setValue("country", formData.country);
    setValue("location", formData.location);
    setValue("count", formData.count);
  }, [formData]);
  const { mutate: locationData, isPending: isLocation } = useMutation({
    mutationFn: async (data) => {
      dispatch(setFormValues(data));
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleCategoryClick = (categoryValue) => {
    const formData = getValues(); // from react-hook-form

    if (!formData.country || !formData.location) {
      alert("Please select Country and Location first.");
      return;
    }
    dispatch(setFormValues({ ...formData, category: categoryValue }));

    // const url = `/nomads/${formData.country}.${formData.location}/${categoryValue}`;
    const state = {
      ...formData,
      category: categoryValue,
    };

    // console.log("Generated URL:", url);
    console.log("State to be passed:", state);

    navigate(
      `/nomad/listings?country=${formData.country}&location=${formData.location}&category=${state.category}`,
      {
        state: {
          country: formData.country,
          location: formData.location,
          category: categoryValue,
        },
      }
    );
  };
  // Prioritize BIZ Nest and MeWo first, then sort the rest by rating descending
  const prioritizedCompanies = ["BIZ Nest", "MeWo"];
  const sortedListings = [...(listingsData || [])].sort((a, b) => {
    const aIsPriority = prioritizedCompanies.includes(a.companyName);
    const bIsPriority = prioritizedCompanies.includes(b.companyName);

    if (aIsPriority && !bIsPriority) return -1;
    if (!aIsPriority && bIsPriority) return 1;

    // If both are priority or both are not, then sort by average rating descending
    const aRating =
      a.reviews?.length > 0
        ? a.reviews.reduce((sum, r) => sum + r.starCount, 0) / a.reviews.length
        : 0;
    const bRating =
      b.reviews?.length > 0
        ? b.reviews.reduce((sum, r) => sum + r.starCount, 0) / b.reviews.length
        : 0;

    return bRating - aRating;
  });

  return (
    <div className="flex flex-col gap-2 lg:gap-6">
      <div className="flex flex-col gap-4 justify-center items-center  w-full lg:mt-0">
        <div className="min-w-[85%] max-w-[80rem] lg:max-w-[80rem] mx-0 md:mx-auto px-6 sm:px-6 lg:px-0">
          <div className="hidden lg:flex flex-col gap-4 justify-between items-center w-full h-full">
            {/* the 5 icons */}

            <div className=" w-3/4 pb-4">
              <div className="flex justify-between items-center">
                {categoryOptions.map((cat) => {
                  const iconSrc = newIcons[cat.value];

                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => handleCategoryClick(cat.value)}
                      className=" text-black  px-4 py-2   hover:text-black transition flex items-center justify-center w-full"
                    >
                      {iconSrc ? (
                        <div className="h-10 w-full flex flex-col gap-0">
                          <img
                            src={iconSrc}
                            alt={cat.label}
                            className="h-full w-full object-contain"
                          />
                          <span className="text-sm">{cat.label}</span>
                          <div></div>
                        </div>
                      ) : (
                        cat.label // fallback if no icon found
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex justify-around md:w-full lg:w-3/4 border-2 bg-gray-50 rounded-full p-0 items-center"
            >
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <SearchBarCombobox
                    value={field.value}
                    onChange={field.onChange}
                    options={countryOptions}
                    label="Select Country"
                    placeholder="Select aspiring destination"
                    className="w-full "
                  />
                )}
              />
              <div className="w-px h-10 bg-gray-300 mx-2 my-auto" />
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <SearchBarCombobox
                    value={field.value}
                    onChange={field.onChange}
                    label="Select Location"
                    options={locationOptions}
                    placeholder="Select area within country"
                    disabled={!selectedCountry}
                    className="w-full"
                  />
                )}
              />
              <div className="w-px h-10 bg-gray-300 mx-2 my-auto" />
              <Controller
                name="count"
                control={control}
                render={({ field }) => (
                  <SearchBarCombobox
                    value={field.value}
                    onChange={field.onChange}
                    options={countOptions}
                    label="Select Count"
                    placeholder="Booking for no. of Nomads"
                    disabled={!selectedState}
                    className="w-full "
                  />
                )}
              />
              <button
                type="submit"
                className="w-fit h-full  bg-[#FF5757] text-white p-5 text-subtitle rounded-full"
              >
                <IoSearch />
              </button>
            </form>
          </div>
          <div className="flex lg:hidden w-full items-center justify-center my-4">
            <button
              onClick={() => setShowMobileSearch((prev) => !prev)}
              className="bg-white flex items-center w-full text-center justify-center font-medium text-secondary-dark border-2 px-6 py-2 rounded-full flex-col gap-2"
            >
              <span>
                Search Results in{" "}
                {formData?.location?.charAt(0).toUpperCase() +
                  formData?.location?.slice(1) || "Unknown"}
              </span>
              <span className="text-tiny text-gray-500">
                {formData?.count || "N/A"} Nomads
              </span>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              // initial={{ y: "-100%" }}
              // animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl overflow-auto z-50 p-4 rounded-t-3xl lg:hidden h-[100dvh]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Search</h3>
                <button
                  onClick={() => setShowMobileSearch(false)}
                  className="text-gray-500 text-xl"
                >
                  &times;
                </button>
              </div>
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-3 md:grid-cols-5 gap-2 gap-y-10 mb-16"
              >
                {categoryOptions.map((cat) => {
                  const iconSrc = newIcons[cat.value];

                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => handleCategoryClick(cat.value)}
                      className=" text-black  px-4 py-2   hover:text-black transition flex items-center justify-center w-full"
                    >
                      {iconSrc ? (
                        <div className="h-10 w-full flex flex-col gap-0">
                          <img
                            src={iconSrc}
                            alt={cat.label}
                            className="h-full w-[90%] object-contain"
                          />
                          <span className="text-sm">{cat.label}</span>
                          <div></div>
                        </div>
                      ) : (
                        cat.label // fallback if no icon found
                      )}
                    </button>
                  );
                })}
              </motion.div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <SearchBarCombobox
                      value={field.value}
                      onChange={field.onChange}
                      options={countryOptions}
                      label="Select Country"
                      placeholder="Select aspiring destination"
                      className="w-full"
                    />
                  )}
                />
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <SearchBarCombobox
                      value={field.value}
                      onChange={field.onChange}
                      label="Select Location"
                      options={locationOptions}
                      placeholder="Select area within country"
                      disabled={!selectedCountry}
                      className="w-full"
                    />
                  )}
                />
                <Controller
                  name="count"
                  control={control}
                  render={({ field }) => (
                    <SearchBarCombobox
                      value={field.value}
                      onChange={field.onChange}
                      options={countOptions}
                      label="Select Count"
                      placeholder="Booking for no. of Nomads"
                      disabled={!selectedState}
                      className="w-full"
                    />
                  )}
                />
                <button
                  type="submit"
                  className="w-full bg-[#FF5757] text-white py-3 rounded-full"
                >
                  <IoSearch className="inline mr-2" />
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* <hr /> */}
      <Container padding={false}>
        <div className="">
          <div className="font-semibold text-md">
            <div className=" custom-scrollbar-hide">
              {/* Popular section */}
              {isLisitingLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              ) : groupedListings && Object.keys(groupedListings).length > 0 ? (
                Object.entries(groupedListings)
                  .sort(([typeA], [typeB]) => {
                    const typeOrder = [
                      "coworking",
                      "hostel",
                      "workation",
                      "privatestay",
                      "meetingroom",
                      "cafe",
                      "coliving",
                    ];
                    const indexA = typeOrder.indexOf(typeA);
                    const indexB = typeOrder.indexOf(typeB);
                    return (
                      (indexA === -1 ? 999 : indexA) -
                      (indexB === -1 ? 999 : indexB)
                    );
                  })
                  .map(([type, items]) => {
                    const prioritizedCompanies = ["BIZ Nest", "MeWo"];

                    const sortedItems = [...items].sort((a, b) => {
                      const aPriorityIndex = prioritizedCompanies.indexOf(
                        a.companyName
                      );
                      const bPriorityIndex = prioritizedCompanies.indexOf(
                        b.companyName
                      );

                      // Both are priority companies
                      if (aPriorityIndex !== -1 && bPriorityIndex !== -1) {
                        return aPriorityIndex - bPriorityIndex; // BIZ Nest (0) before MeWo (1)
                      }

                      // Only a is priority
                      if (aPriorityIndex !== -1) return -1;

                      // Only b is priority
                      if (bPriorityIndex !== -1) return 1;

                      // Fallback: sort by rating
                      const aRating =
                        a.reviews?.length > 0
                          ? a.reviews.reduce((sum, r) => sum + r.starCount, 0) /
                            a.reviews.length
                          : 0;
                      const bRating =
                        b.reviews?.length > 0
                          ? b.reviews.reduce((sum, r) => sum + r.starCount, 0) /
                            b.reviews.length
                          : 0;

                      return bRating - aRating;
                    });

                    const displayItems = expandedCategories.includes(type)
                      ? sortedItems
                      : sortedItems.slice(0, 5);

                    const showViewMore = sortedItems.length > 5;
                    const sectionTitle = `Popular ${
                      typeLabels[type] || typeLabels.default(type)
                    } in ${
                      formData?.location
                        ? formData.location.charAt(0).toUpperCase() +
                          formData.location.slice(1)
                        : ""
                    }`;

                    return (
                      <div key={type} className="col-span-full mb-6">
                        <h2 className="text-subtitle font-semibold mb-5 text-secondary-dark">
                          {sectionTitle}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-0">
                          {displayItems.map((item) => (
                            <ListingCard
                              key={item._id}
                              item={item}
                              showVertical={false}
                              handleNavigation={() =>
                                navigate(
                                  `/nomad/listings/${item.companyName}`,
                                  {
                                    state: {
                                      companyId: item._id,
                                      type: item.type,
                                    },
                                  }
                                )
                              }
                            />
                          ))}
                        </div>

                        {showViewMore && (
                          <div className="mt-3 text-right">
                            <button
                              onClick={() => handleShowMoreClick(type)}
                              className="text-primary-blue text-sm font-semibold hover:underline"
                            >
                              {expandedCategories.includes(type)
                                ? "View Less ←"
                                : "View More →"}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
              ) : (
                <div className="col-span-full text-center text-sm text-gray-500 border border-dotted rounded-lg p-4">
                  No listings found.
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GlobalListingsList;
