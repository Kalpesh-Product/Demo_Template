import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import Container from "../../components/Container";
import GetStartedButton from "../../components/GetStartedButton";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const steps = ["Personal Info", "Company Info", "Services", "Review"];

// const serviceOptions = [
//   "Web Development",
//   "App Development",
//   "SEO",
//   "Marketing",
// ];

const serviceOptions = [
  {
    category: "Department Modules",
    items: [
      "Tickets",
      "Meetings",
      "Tasks",
      "Performance",
      "Visitors",
      "Calendar",
      "Access",
      "Profile",
      "Finance",
      "Sales",
      "HR",
      "Frontend",
      "Admin",
      "Maintenance",
      "IT",
      // "Cafe",
    ],
  },
  // {
  //   category: "Apps",
  //   items: ["Tickets", "Meetings", "Tasks", "Performance", "Visitors"],
  // },
  // {
  //   category: "General",
  //   items: ["Calendar", "Access", "Profile"],
  // },
];

const HostSignup = () => {
  const [activeStep, setActiveStep] = useState(0);

  const { control, handleSubmit, getValues, trigger } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      country: "",
      state: "",
      city: "",
      companyName: "",
      industry: "",
      companySize: "",
      companyType: "",
      companyState: "",
      companyCity: "",
      websiteUrl: "",
      linkedInUrl: "",
      selectedServices: [],
    },
  });

  const { mutate: register, isLoading: isRegisterLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("form/add-new-b2b-form-submission", {
        ...data,
        formName: "register",
      });

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Form submitted successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      reset();
    },
  });

  const stepFields = [
    ["name", "email", "mobile", "country", "state", "city"], // Step 1
    [
      "companyName",
      "industry",
      "companySize",
      "companyType",
      "companyState",
      "companyCity",
      "websiteUrl",
      "linkedInUrl",
    ], // Step 2
    ["selectedServices"], // Step 3
    [], // Step 4
  ];

  const handleNext = async () => {
    const fieldsToValidate = stepFields[activeStep];
    const isValid = await trigger(fieldsToValidate);
    if (!isValid) return; // stop if invalid

    const stepValues = getValues();
    console.log(`Step ${activeStep + 1} values:`, stepValues);

    setActiveStep((prev) => prev + 1);
  };

  const renderStepFields = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Full Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="mobile"
              control={control}
              rules={{ required: "Phone Number is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Country"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="State"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </>
        );

      case 1:
        return (
          <>
            <Controller
              name="companyName"
              control={control}
              rules={{ required: "Company Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Company Name"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="industry"
              control={control}
              rules={{ required: "Industry is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Industry"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="companySize"
              control={control}
              rules={{ required: "Company Size is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Company Size"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="companyType"
              control={control}
              rules={{ required: "Company Type is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Company Type"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="companyState"
              control={control}
              rules={{ required: "Company State is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Company State"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="companyCity"
              control={control}
              rules={{ required: "Company City is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Company City"
                  fullWidth
                  variant="standard"
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="websiteUrl"
              control={control}
              rules={{ required: "Company Website is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Company Website"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="linkedInUrl"
              control={control}
              rules={{ required: "LinkedIn URL is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="LinkedIn URL"
                  fullWidth
                  margin="normal"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </>
        );

      // case 2:
      //   return (
      //     <Controller
      //       name="selectedServices"
      //       control={control}
      //       rules={{
      //         validate: (value) =>
      //           value.length > 0 || "Please select at least one service",
      //       }}
      //       render={({ field, fieldState }) => (
      //         <Box sx={{ mt: 2 }}>
      //           <FormGroup>
      //             {serviceOptions.map((service) => (
      //               <FormControlLabel
      //                 key={service}
      //                 control={
      //                   <Checkbox
      //                     checked={field.value.includes(service)}
      //                     onChange={(e) => {
      //                       const newValue = e.target.checked
      //                         ? [...field.value, service]
      //                         : field.value.filter((s) => s !== service);
      //                       field.onChange(newValue);
      //                     }}
      //                   />
      //                 }
      //                 label={service}
      //               />
      //             ))}
      //           </FormGroup>
      //           {fieldState.error && (
      //             <FormHelperText error>
      //               {fieldState.error.message}
      //             </FormHelperText>
      //           )}
      //         </Box>
      //       )}
      //     />
      //   );

      case 2:
        return (
          <>
            <h2 className="font-semibold text-lg pt-4">
              Please Select Your Services
            </h2>
            <Controller
              name="selectedServices"
              control={control}
              rules={{
                validate: (value) =>
                  value.length > 0 || "Please select at least one service",
              }}
              render={({ field, fieldState }) => (
                <Box sx={{ mt: 2 }} className="col-span-1 lg:col-span-2">
                  {serviceOptions.map((group) => (
                    <Box key={group.category} sx={{ mb: 3 }}>
                      {/* <h3 className="font-semibold mb-2">{group.category}</h3> */}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {group.items.map((service) => {
                          const isSelected = field.value.includes(service);

                          const handleToggle = () => {
                            const newValue = isSelected
                              ? field.value.filter((s) => s !== service)
                              : [...field.value, service];

                            console.log("Selected services:", newValue);
                            field.onChange(newValue);
                          };

                          return (
                            <Box
                              key={service}
                              onClick={handleToggle}
                              role="checkbox"
                              aria-checked={isSelected}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ")
                                  handleToggle();
                              }}
                              sx={{
                                border: "1px solid",
                                borderColor: isSelected
                                  ? "primary.main"
                                  : "divider",
                                borderRadius: 2,
                                p: 2,
                                cursor: "pointer",
                                userSelect: "none",
                                boxShadow: isSelected ? 3 : 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}>
                              <span className="font-medium">{service}</span>

                              <Checkbox
                                checked={isSelected}
                                onChange={(e) => {
                                  e.stopPropagation(); // prevent double toggle via card click
                                  handleToggle();
                                }}
                                inputProps={{
                                  "aria-label": `${service} checkbox`,
                                }}
                              />
                            </Box>
                          );
                        })}
                      </div>
                    </Box>
                  ))}

                  {fieldState.error && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </Box>
              )}
            />
          </>
        );

      case 3:
        return (
          <div className="flex flex-col gap-4 col-span-2">
            <h1 className="text-title text-center">Account Activation</h1>
            <div className="space-y-10">
              <div>
                <p>
                  An email has been sent to your email address {"<EMAIL?>"}{" "}
                  containing all the further process for activating the account.
                </p>
                <p>
                  Please let us know if there is any more queries from your
                  side, or you can contact us at : {"response@wono.co"}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 overflow-hidden">
                    <img src="/logos/gmailLogo.jpg" alt="gmail-logo" />
                  </div>
                  <NavLink className={"underline"}>Open Gmail</NavLink>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 overflow-hidden">
                    <img src="/logos/outlookLogo.png" alt="outlook-logo" />
                  </div>
                  <NavLink className={"underline"}>Open Outlook</NavLink>
                </div>
              </div>
              <div>
                <p>Did not recieve an email ? Please check your spam folder.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col justify-start gap-10 p-4 lg:p-10 items-center w-full">
      <Stepper
        className="w-full p-0"
        connectorStateColors={true}
        styleConfig={{
          activeBgColor: "#2196F3", // Blue for the active step
          completedBgColor: "#4CAF50", // Green for completed steps
          inactiveBgColor: "#E0E0E0", // Color for inactive steps
          size: "2.5em", // Step size (Optional)
          activeTextColor: "#FFFFFF", // Text color for active step
          completedTextColor: "#FFFFFF", // Text color for completed steps
          inactiveTextColor: "#000000", // Text color for inactive steps
          circleFontSize: "1rem", // Font size for step number (Optional)
          fontFamily: "inherit",
        }}
        connectorStyleConfig={{
          size: 3, // Thickness of the connector line
          activeColor: "#4CAF50", // Color of the connector when active
          completedColor: "#4CAF50", // Color of the connector when completed
          inactiveColor: "#E0E0E0", // Color of the connector when inactive
        }}
        style={{
          // paddingTop: 0,
          textTransform: "uppercase",
          fontFamily: "Poppins",
        }}
        activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step label={label} key={index} />
        ))}
      </Stepper>
      <div className="max-w-5xl mx-auto w-full">
        {activeStep !== 3 && (
          <h1 className="text-title text-center">
            Let's set up your free account
          </h1>
        )}
        <form
          className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4"
          onSubmit={handleSubmit((data) => register(data))}>
          {renderStepFields()}
          <div className="col-span-1 lg:col-span-2 flex justify-between items-center">
            {activeStep > 0 && (
              <GetStartedButton
                title="Back"
                handleSubmit={() => setActiveStep((prev) => prev - 1)}
              />
            )}
            {activeStep === 0 && (
              <div className="flex  justify-center  items-center w-full">
                <GetStartedButton title="Next" handleSubmit={handleNext} />
              </div>
            )}

            {activeStep !== 0 && activeStep < steps.length - 1 ? (
              <div className="flex  justify-center lg:justify-end items-center w-full">
                <GetStartedButton title="Next" handleSubmit={handleNext} />
              </div>
            ) : (
              <></>
            )}
            {activeStep === stepFields.length - 1 && (
              <div className="flex  justify-center  items-center w-full">
                <GetStartedButton title="Submit" type={"submit"} />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostSignup;
