import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import SecondaryButton from "../components/SecondaryButton";
import ReviewCard from "../components/ReviewCard";
import LeafRatings from "../components/LeafRatings";
import axios from "../utils/axios";
import renderStars from "../utils/renderStarts";
import relativeTime from "dayjs/plugin/relativeTime";
import MuiModal from "../components/Modal";
import Map from "../components/Map";
import LeafWrapper from "../components/LeafWrapper";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import {
  isAlphanumeric,
  isValidEmail,
  isValidPhoneNumber,
  noOnlyWhitespace,
} from "../utils/validators";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import AmenitiesList from "../components/AmenitiesList";
import { FaCheck } from "react-icons/fa";
import TransparentModal from "../components/TransparentModal";

dayjs.extend(relativeTime);

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { companyId, type } = location.state;
  const [selectedReview, setSelectedReview] = useState([]);
  const [showAmenities, setShowAmenities] = useState(false);
  console.log("selected : ", selectedReview);
  const [open, setOpen] = useState(false);
  console.log("company id", companyId);

  const { data: companyDetails, isPending: isCompanyDetails } = useQuery({
    queryKey: ["companyDetails", companyId],
    queryFn: async () => {
      const response = await axios.get(
        `common/individual-company?companyId=${companyId}&&type=${type}`
      );
      return response.data;
    },
    enabled: !!companyId && !!type,
  });

  console.log("companuDetials ", companyDetails);
  const companyImages = companyDetails?.images?.slice(0, 4) || [];
  const showMore = (companyDetails?.images?.length || 0) > 4;
  const inclusions = companyDetails?.inclusions || [];

  // const total = allAmenities.length;
  // const columns = 6;
  // const remainder = total % columns;
  // const lastRowStartIndex = remainder === 0 ? -1 : total - remainder;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      fullName: "",
      noOfPeople: 0,
      mobileNumber: 0,
      email: "",
      startDate: null,
      endDate: null,
    },
    mode: "onChange",
  });
  const selectedStartDate = watch("startDate");
  const {
    handleSubmit: handlesubmitSales,
    control: salesControl,
    reset: salesReset,
    formState: { errors: salesErrors },
  } = useForm({
    defaultValues: {
      fullName: "",
      mobileNumber: 0,
      email: "",
    },
    mode: "onChange",
  });

  const { mutate: submitEnquiry, isPending: isSubmitting } = useMutation({
    mutationKey: ["submitEnquiry"],
    mutationFn: async (data) => {
      const response = await axios.post("/form/add-new-b2c-form-submission", {
        ...data,
        country: companyDetails?.country,
        state: companyDetails?.state,
        companyType: companyDetails?.type,
        personelCount: parseInt(data?.noOfPeople),
        companyName: companyDetails?.companyName,
        sheetName: "All_Enquiry",
        phone: data?.mobileNumber,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
  const { mutate: submitSales, isPending: isSubmittingSales } = useMutation({
    mutationKey: ["submitSales"],
    mutationFn: async (data) => {
      const response = await axios.post("/form/add-new-enquiry", {
        ...data,
        pocName: companyDetails?.pocs?.name || "Anviksha Godkar",
        pocCompany: companyDetails?.companyName,
        pocDesignation: companyDetails?.pocs?.designation,
        sheetName: "All_POC_Contact",
        mobile: data.mobileNumber,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      salesReset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (companyImages?.length && !selectedImage) {
      setSelectedImage(companyImages[0]);
    }
  }, [companyImages, selectedImage]);

  const reviewData = isCompanyDetails
    ? []
    : companyDetails?.reviews.map((item) => ({
        ...item,
        stars: item.starCount,
        message: item.description,
        date: dayjs(item.createdAt).fromNow(),
      }));

  const forMapsData = {
    id: companyDetails?._id,
    lat: companyDetails?.latitude,
    lng: companyDetails?.longitude,
    name: companyDetails?.companyName,
    location: companyDetails?.city,
    reviews: companyDetails?.reviewCount,
    ratings: companyDetails?.ratings,
    image:
      companyDetails?.images?.[0]?.url ||
      "https://biznest.co.in/assets/img/projects/subscription/Managed%20Workspace.webp",
  };

  const mapsData = [forMapsData];
  const [heartClicked, setHeartClicked] = useState(false);

  return (
    <div className="p-4">
      <div className="min-w-[70%] max-w-[80rem] lg:max-w-[70rem] mx-0 md:mx-auto">
        <div className="flex flex-col gap-8">
          {/* Image Section */}
          {isCompanyDetails ? (
            // 🔄 Loading skeletons
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 overflow-hidden animate-pulse">
              {/* Main Skeleton */}
              <div className="w-full h-[28.5rem] bg-gray-200 rounded-md" />
              {/* Thumbnail Skeletons */}
              <div className="grid grid-cols-2 gap-1">
                {[1, 2, 3, 4].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-full h-56 bg-gray-200 rounded-md"
                  />
                ))}
              </div>
            </div>
          ) : companyImages.length === 0 ? (
            // 🚫 No images fallback
            <div className="flex flex-col items-center justify-center gap-4 py-10 border border-dashed border-gray-300 rounded-md">
              <img
                src="https://via.placeholder.com/150x100?text=No+Images"
                alt="No images"
                className="w-40 h-auto"
              />
              <p className="text-gray-500 text-sm">
                No images have been provided by the company.
              </p>
            </div>
          ) : (
            // ✅ Actual image display
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 overflow-hidden">
              {/* Main Image */}
              <div className="w-full h-[28.5rem] overflow-hidden rounded-md">
                <img
                  src={
                    companyDetails?.images?.[0]?.url ||
                    "https://via.placeholder.com/400x200?text=No+Image+Found+"
                  }
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() =>
                    navigate("images", {
                      state: {
                        companyName: companyDetails?.companyName,
                        images: companyDetails?.images,
                        selectedImageId: selectedImage?._id, // ✅ Fix here
                      },
                    })
                  }
                  alt="Selected"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-2 gap-1">
                {companyDetails?.images?.slice(1,5).map((item, index) => (
                  <div
                    key={item._id}
                    className={`relative w-full h-56 overflow-hidden rounded-md cursor-pointer border-2 ${
                      selectedImage?._id === item._id
                        ? "border-primary-dark"
                        : "border-transparent"
                    }`}
                    onClick={() =>
                      navigate("images", {
                        state: {
                          companyName: companyDetails?.companyName,
                          images: companyDetails?.images,
                          selectedImageId: item._id,
                        },
                      })
                    }
                  >
                    <img
                      src={item.url}
                      alt="company-thumbnail"
                      className="w-full h-full object-cover"
                    />

                    {/* Button on bottom right of 4th image */}
                    {showMore && index === 3 && (
                      <div className="absolute inset-0 bg-black/40 flex items-end justify-end p-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent selecting the image
                            navigate("images", {
                              state: {
                                companyName: companyDetails?.companyName,
                                images: companyDetails?.images,
                              },
                            });
                          }}
                          className="bg-white text-sm px-3 py-1 rounded shadow font-medium"
                        >
                          +{companyDetails.images.length - 4} more
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About and Location */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-8">
              {isCompanyDetails ? (
                // 🔄 Skeleton while loading
                <div className="w-full h-36 bg-gray-200 animate-pulse rounded-md" />
              ) : !companyDetails?.logo ? (
                // 🚫 Fallback UI when logo is missing
                <div className="w-full h-36 flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-md">
                  <span className="text-gray-500 text-sm">
                    No company logo available
                  </span>
                </div>
              ) : (
                // ✅ Show actual logo
                <div className="w-full h-36 overflow-hidden rounded-md">
                  <img
                    src={companyDetails.logo}
                    alt="company-logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-title  font-medium text-gray-700 uppercase">
                    About
                  </h1>
                  <div className="items-center flex gap-2">
                    <div
                      onClick={() => setHeartClicked((prev) => !prev)}
                      className="cursor-pointer relative"
                    >
                      {heartClicked ? <IoIosHeart /> : <IoIosHeartEmpty />}
                    </div>
                    <NavLink
                      className={"text-small underline"}
                      to={"/nomad/login"}
                    >
                      Save
                    </NavLink>
                  </div>
                </div>

                {isCompanyDetails ? (
                  // 🔄 Skeleton UI while loading
                  <div className="space-y-1 animate-pulse">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ) : !companyDetails?.about ? (
                  // 🚫 Fallback if no "about" content
                  <div className="place-content-center w-full h-full">
                    <p className="text-sm text-gray-500 italic">
                      Company information is not provided.
                    </p>
                  </div>
                ) : (
                  // ✅ Actual content
                  <p className="text-sm text-secondary-dark">
                    {companyDetails.about.replace(/\\n/g, " ")}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border-2 rounded-xl flex  gap-1 items-center p-4">
                <div className="text-tiny w-full hidden lg:flex justify-center items-center">
                  <LeafWrapper height="3rem" width={"2rem"}>
                    <div className="text-secondary-dark font-semibold flex text-subtitle flex-col leading-5  items-center">
                      <span>Guest</span>
                      <span>Favorite</span>
                    </div>
                  </LeafWrapper>
                </div>
                <div className="w-full hidden lg:flex">
                  <p className="text-tiny ">
                    One of the most loved places on WoNo, according to guests
                  </p>
                </div>
                <div className="flex w-full lg:w-1/2 gap-1 justify-end">
                  <div className="flex flex-col gap-0 justify-center items-center">
                    <p className="text-subtitle lg:text-subtitle">
                      {companyDetails?.ratings || 0}
                    </p>
                    <span className="text-sm flex lg:text-small font-medium">
                      {renderStars(companyDetails?.ratings || 0)}
                    </span>
                  </div>
                  {/* Vertical Separator */}
                  <div className="w-px h-10 bg-gray-300 mx-2 my-auto lg:hidden" />
                  <div className="text-tiny w-full flex justify-center items-center lg:hidden">
                    <LeafWrapper height="3rem" width={"2rem"}>
                      <div className="text-secondary-dark font-semibold flex text-subtitle flex-col leading-5  items-center">
                        <span>Guest</span>
                        <span>Favorite</span>
                      </div>
                    </LeafWrapper>
                  </div>

                  {/* Vertical Separator */}
                  <div className="w-px h-10 bg-gray-300 mx-2 my-auto" />

                  <div className="flex flex-col gap-4 lg:gap-0 justify-center items-center">
                    <p className="text-subtitle lg:text-subtitle mt-1">
                      {companyDetails?.reviewCount || companyDetails?.totalReviews || 0}
                    </p>
                    <span className="text-small font-medium">Reviews</span>
                  </div>
                </div>
              </div>

              <div className="shadow-md flex flex-col gap-4 p-6 rounded-xl border-2">
                <h1 className="text-card-title text-secondary-dark font-semibold leading-normal">
                  Enquire & Recieve Quote
                </h1>
                <form
                  onSubmit={handleSubmit((data) => submitEnquiry(data))}
                  action=""
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  <Controller
                    name="fullName"
                    rules={{
                      required: "Full Name is required",
                      validate: {
                        noOnlyWhitespace,
                        isAlphanumeric,
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Full Name"
                        fullWidth
                        variant="standard"
                        size="small"
                        helperText={errors?.fullName?.message}
                        error={!!errors.fullName}
                      />
                    )}
                  />
                  <Controller
                    name="noOfPeople"
                    control={control}
                    rules={{
                      required: "No. of people is required",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="No. Of People"
                        fullWidth
                        type="number"
                        variant="standard"
                        size="small"
                        helperText={errors?.noOfPeople?.message}
                        error={!!errors.noOfPeople}
                      />
                    )}
                  />
                  <Controller
                    name="mobileNumber"
                    control={control}
                    rules={{
                      required: "Mobile number is required",
                      validate: {
                        isValidPhoneNumber,
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Mobile Number"
                        fullWidth
                        type="number"
                        value={field.value || ""}
                        variant="standard"
                        size="small"
                        helperText={errors?.mobileNumber?.message}
                        error={!!errors.mobileNumber}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      validate: {
                        isValidEmail,
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        fullWidth
                        type="email"
                        variant="standard"
                        size="small"
                        helperText={errors?.email?.message}
                        error={!!errors.email}
                      />
                    )}
                  />

                  {/* {companyDetails?.type === "coworking" && (
                    <Controller
                      name="numberOfDesks"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Number of Desk"
                          fullWidth
                          variant="standard"
                          size="small"
                          select>
                          <MenuItem value="" disabled>
                            <em>Select Number of Desk</em>
                          </MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                        </TextField>
                      )}
                    />
                  )} */}
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="Start Date"
                        disablePast
                        format="DD-MM-YYYY"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={field.onChange}
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                            variant: "standard",
                          },
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="End Date"
                        format="DD-MM-YYYY"
                        disablePast
                        disabled={!selectedStartDate}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={field.onChange}
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                            variant: "standard",
                          },
                        }}
                      />
                    )}
                  />
                  <div className="flex justify-center items-center lg:col-span-2">
                    <SecondaryButton
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                      title={"Get Quote"}
                      type={"submit"}
                      externalStyles={"w-1/2"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <hr className="my-5 lg:my-10" />
          {/* Inclusions */}
          <div className="flex flex-col gap-8 w-full">
            <h1 className="text-title text-gray-700 font-medium uppercase">
              What Inclusions does it offer
            </h1>

            {inclusions.length === 0 ? (
              <div className="w-full border-2 border-dotted border-gray-400 rounded-lg p-6 text-center text-gray-500">
                Inclusions not available
              </div>
            ) : (
              <div className="flex flex-col gap-10 w-full">
                <AmenitiesList
                  type={companyDetails?.type.toLowerCase() || ""}
                  inclusions={inclusions}
                />
                {/* <div className="flex justify-end">
                  <button
                    onClick={() => setShowAmenities(true)}
                    className="text-primary-blue text-content hover:underline"
                  >
                    Show more
                  </button>
                </div> */}
              </div>
            )}
          </div>

          <hr className="my-5 lg:my-10" />
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
              <h1 className="text-main-header font-medium mt-5">
                <LeafRatings
                  ratings={companyDetails?.ratings || 0}
                  align="items-start"
                />
              </h1>

              <p className="text-subtitle  my-4 font-medium">Guest favorite</p>
              <span className="text-content text-center">
                This place is a guest favourite based on <br /> ratings, reviews
                and reliability
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0 lg:p-0">
              {companyDetails?.reviews?.length > 0 ? (
                companyDetails?.reviews?.slice(0, 6).map((review, index) => (
                  <ReviewCard
                    handleClick={() => {
                      setSelectedReview(review);
                      setOpen(true);
                    }}
                    key={index}
                    review={review}
                  />
                ))
              ) : (
                <div className="col-span-full border-2 border-dotted border-gray-300 rounded-xl p-6 text-center text-sm text-gray-500 h-40 flex justify-center items-center">
                  No reviews yet.
                </div>
              )}
            </div>

            <hr className="my-5 lg:my-10" />
            {/* Map */}
            <div className="w-full h-[500px] flex flex-col gap-8 rounded-xl overflow-hidden">
              <h1 className="text-title font-medium text-gray-700 uppercase">
                Where you'll be
              </h1>
              <Map
                locations={mapsData}
                disableNavigation
                disableTwoFingerScroll
              />
            </div>
            <hr className="my-5 lg:my-10" />
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-10 pb-20">
              <div className="flex flex-col lg:flex-row justify-center items-center col-span-1 border-2 shadow-md gap-4 rounded-xl p-6 w-full">
                <div className="flex flex-col gap-4 justify-between items-center h-full w-56">
                  {/* Avatar with Initials */}
                  <div className="w-32 aspect-square rounded-full bg-primary-blue flex items-center justify-center text-white text-6xl font-semibold uppercase">
                    {companyDetails?.pocs?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2) || "AG"}
                  </div>

                  {/* Name & Designation */}
                  <div className="text-center space-y-3 h-1/2 flex flex-col justify-evenly items-center">
                    <h1 className="text-title text-gray-700 font-medium leading-10">
                      {companyDetails?.pocs?.name || "Anviksha Godkar"}
                    </h1>
                    <p className="text-content">
                      {companyDetails?.pocs?.designation ||
                        "Deputy Sales Manager"}
                    </p>
                  </div>
                </div>

                <div className="w-px h-full bg-gray-300 mx-2 my-auto" />
                <div className="h-full w-56 flex flex-col justify-normal">
                  <p className="text-title text-center text-gray-700 font-medium mb-8 underline uppercase">
                    Host Details
                  </p>
                  <div className="flex flex-col gap-5 text-sm sm:text-base">
                    {[
                      "Response rate: 100%",
                      "Speaks English, Hindi and Punjabi",
                      "Responds within an hour",
                      "Lives in Velha, Goa",
                    ].map((detail, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaCheck className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full border-2 shadow-md rounded-xl">
                <div className="flex flex-col  h-full gap-4 rounded-xl p-6 w-full lg:w-full justify-between">
                  <h1 className="text-title text-gray-700 font-medium uppercase">
                    Connect With Host
                  </h1>
                  <form
                    onSubmit={handlesubmitSales((data) => submitSales(data))}
                    className="grid grid-cols-1 gap-4"
                  >
                    <Controller
                      name="fullName"
                      control={salesControl}
                      rules={{
                        required: "Full Name is required",
                        validate: {
                          isAlphanumeric,
                          noOnlyWhitespace,
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Full Name"
                          fullWidth
                          variant="standard"
                          size="small"
                          error={!!salesErrors?.fullName}
                          helperText={salesErrors?.fullName?.message}
                        />
                      )}
                    />
                    <Controller
                      name="mobileNumber"
                      control={salesControl}
                      rules={{
                        required: "Mobile number is required",
                        validate: {
                          isValidPhoneNumber,
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Mobile Number"
                          fullWidth
                          value={field.value || ""}
                          type="number"
                          variant="standard"
                          size="small"
                          error={!!salesErrors?.mobileNumber}
                          helperText={salesErrors?.mobileNumber?.message}
                        />
                      )}
                    />
                    <Controller
                      name="email"
                      control={salesControl}
                      rules={{
                        required: "Email is required",
                        validate: { isValidEmail },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          fullWidth
                          type="email"
                          variant="standard"
                          size="small"
                          error={!!salesErrors?.email}
                          helperText={salesErrors?.email?.message}
                        />
                      )}
                    />
                    <div className="flex justify-center items-center">
                      <SecondaryButton
                        title={"Submit"}
                        type={"submit"}
                        externalStyles={"mt-6 w-1/2"}
                        disabled={isSubmittingSales}
                        isLoading={isSubmittingSales}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MuiModal open={open} onClose={() => setOpen(false)} title={"Review"}>
        <div className="flex flex-col gap-4">
          {/* Reviewer Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center text-white font-semibold text-lg uppercase">
              {(
                selectedReview?.reviewerName ||
                selectedReview?.name ||
                "Unknown"
              )
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-base">
                {selectedReview?.reviewerName ||
                  selectedReview?.name ||
                  "Unknown"}
              </p>
              <p className="text-sm text-gray-500">{selectedReview?.date}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-black text-sm">
            {renderStars(selectedReview?.rating || selectedReview?.starCount)}
          </div>

          {/* Message */}
          <div className="text-gray-800 text-sm whitespace-pre-line leading-relaxed">
            {selectedReview?.message ||
              selectedReview?.reviewText ||
              selectedReview?.description}
          </div>
        </div>
      </MuiModal>
      <TransparentModal
        open={showAmenities}
        onClose={() => setShowAmenities(false)}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {(Array.isArray(companyDetails?.inclusions)
            ? companyDetails.inclusions
            : companyDetails?.inclusions?.split(",") || []
          ).map((item) => (
            <span
              key={item}
              className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 text-center"
            >
              {item
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/-/g, " ")
                .replace(/&/g, " & ")
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </span>
          ))}
        </div>
      </TransparentModal>
    </div>
  );
};

export default Product;
