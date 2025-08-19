import React, { useState } from "react";
import axios from "../utils/axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Spinners from "../components/Spinner";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import Container from "../components/Container";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    partnerstype: "",
    message: "",
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      typeOfPartnerShip: "",
      message: "",
    },
  });

  const handleCloseModal = () => setShowModal(false);

  const { mutate: submitContactForm, isPending: isContactPending } =
    useMutation({
      mutationFn: async (data) => {
        const response = await axios.post("form/add-new-b2c-form-submission", {
          ...data,
          sheetName: "Connect_with_us",
        });
        return response.data;
      },
      onSuccess: (data) => {
        toast.success("Form submitted successfully");
        reset();
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });

  const floatingLabelSx = {
    color: "black",
    "&.Mui-focused": { color: "#1976d2" },
    "&.MuiInputLabel-shrink": { color: "#1976d2" },
  };

  return (
    <div className="bg-white text-black font-sans">
      {/* About & Form */}
      {/* <section className="py-10 px-4 md:px-20"> */}
      <Container padding={false}>
        <section className="">
          <div className="grid md:grid-cols-2 gap-10">
            {/* About Us */}
            <div>
              <h2 className="text-title font-semibold uppercase mb-6">
                About Us
              </h2>
              <p className="text-subtitle mb-4 leading-relaxed">
                WoNo's B2B Software As A Service (SaaS) Licensing tools are
                being developed post in depth discussions with 100's of
                businesses who are trying to develop and evolve the Nomads &
                Remote Working Ecosystem via their own niche concepts in the
                most aspiring destinations of the world. We are currently in our
                BETA stage and are partnering and listening to everyone who
                wants to partner with us and we are providing them with our SaaS
                Tools FREE of Cost in our Testing Phase.
              </p>
              <p className="text-subtitle leading-relaxed">
                WoNo's eventual B2B2C is the largest Nomad Community being built
                for individuals and companies who intend to work remotely. We're
                creating the world’s first such platform and community to
                support global nomads in logistics, decisions, and long-term
                remote work.
              </p>
            </div>

            {/* Connect With Us - MUI Styled Form */}
            <Box
              component="form"
              onSubmit={handleSubmit((data) => submitContactForm(data))}
              sx={{ mt: 0 }}
            >
              <h2 className="text-title font-semibold uppercase mb-6 text-center md:text-left">
                Connect With Us
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Name */}
                <div className="pt-8 pl-8">
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Name"
                        variant="standard"
                        required
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputLabelProps={{ sx: floatingLabelSx }}
                      />
                    )}
                  />
                </div>

                {/* Email */}
                <div className="pt-8 pl-8">
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email"
                        variant="standard"
                        required
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputLabelProps={{ sx: floatingLabelSx }}
                      />
                    )}
                  />
                </div>

                {/* Mobile */}
                <div className="pt-8 pl-8">
                  <Controller
                    name="mobile"
                    control={control}
                    rules={{
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[1-9]{1}[0-9]{9}$/,
                        message: "Enter a valid 10-digit mobile number",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Mobile Number"
                        variant="standard"
                        required
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputLabelProps={{ sx: floatingLabelSx }}
                      />
                    )}
                  />
                </div>

                {/* Type of Partnership */}
                <div className="pt-8 pl-8">
                  <Controller
                    name="typeOfPartnerShip"
                    control={control}
                    rules={{ required: "Partnership type is required" }}
                    render={({ field, fieldState }) => (
                      <FormControl
                        fullWidth
                        required
                        variant="standard"
                        error={!!fieldState.error}
                      >
                        <InputLabel
                          id="partnerstype-label"
                          sx={floatingLabelSx}
                        >
                          Type of Partnership
                        </InputLabel>
                        <Select
                          {...field}
                          labelId="partnerstype-label"
                          sx={{
                            pl: 2,
                            pt: 1,
                            "&:focus": { backgroundColor: "transparent" },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Type
                          </MenuItem>
                          <MenuItem value="B2B SaaS Technology Licensing">
                            B2B SaaS Technology Licensing
                          </MenuItem>
                          <MenuItem value="Landlord Partnerships">
                            Landlord Partnerships
                          </MenuItem>
                          <MenuItem value="Investment Related">
                            Investment Related
                          </MenuItem>
                          <MenuItem value="Coffee Meeting to know us better">
                            Coffee Meeting to know us better
                          </MenuItem>
                        </Select>
                        {fieldState.error && (
                          <p style={{ color: "red", fontSize: "0.8rem" }}>
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormControl>
                    )}
                  />
                </div>

                {/* Message */}
                <div className="pt-8 pl-8 md:col-span-2">
                  <Controller
                    name="message"
                    control={control}
                    rules={{ required: "Message is required" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        minRows={4}
                        label="Message"
                        variant="standard"
                        required
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputLabelProps={{ sx: floatingLabelSx }}
                      />
                    )}
                  />
                </div>

                {/* Button */}
                <div className="pt-6 md:col-span-2 text-center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "black",
                      borderRadius: 20,
                      px: 14,
                      py: 1,
                      "&:hover": { bgcolor: "#333" },
                    }}
                  >
                    {isContactPending && (
                      <CircularProgress
                        size={16}
                        sx={{ color: "white", mr: 1 }}
                      />
                    )}
                    {isContactPending ? "CONNECTING..." : "CONNECT"}
                  </Button>
                </div>
              </div>
            </Box>
          </div>
        </section>
      </Container>

      {/* Maps */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-20 pb-10"> */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8  pb-10">
          <div className="shadow-md">
            <iframe
              title="Singapore Office"
              className="w-full h-[25rem]"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8288436496055!2d103.8432645747905!3d1.2760650987118065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da191343eb5b27%3A0x1781b571e2363017!2s10%20Anson%20Rd%2C%20Singapore%20079903!5e0!3m2!1sen!2sin!4v1723629468618!5m2!1sen!2sin"
            ></iframe>
            <div className="p-4 flex gap-2 text-sm items-start">
              <FaMapMarkerAlt className="mt-1 text-black" />
              <span>
                SINGAPORE OFFICE - WONOCO PRIVATE LIMITED, 10 ANSON ROAD,
                #33-10, INTERNATIONAL PLAZA, SINGAPORE - 079903
              </span>
            </div>
          </div>
          <div className="shadow-md">
            <iframe
              title="India Office"
              className="w-full h-[25rem]"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.7765664747362!2d73.83261987495516!3d15.496445985103028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc1d2e05cbef3%3A0xa643703ebcc4db43!2sBIZ%20Nest%20-%20Co-Working%20Space%2C%20Workations%20%26%20Meeting%20Zone%20in%20Goa!5e0!3m2!1sen!2sin!4v1723627911486!5m2!1sen!2sin"
            ></iframe>
            <div className="p-4 flex gap-2 text-sm items-start">
              <FaMapMarkerAlt className="mt-1 text-black" />
              <span>
                INDIA OFFICE - WONOCO PRIVATE LIMITED, BIZ NEST CO-WORKING,
                SUNTECK KANAKA CORPORATE PARK, 701 - B, PATTO CENTRE, PANJIM,
                GOA - 403001
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <AiOutlineClose size={20} />
            </button>
            <h3 className="text-lg font-bold mb-2">Success</h3>
            <p className="text-sm mb-4">
              Your enquiry has been submitted successfully!
            </p>
            <div className="text-right">
              <button
                onClick={handleCloseModal}
                className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <Spinners animation="border" variant="dark" />
        </div>
      )}
    </div>
  );
};

export default Contact;
