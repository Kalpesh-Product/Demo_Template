import {
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";
import MuiModal from "../components/Modal";
import { BiCheck } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IconButton, InputAdornment } from "@mui/material";

export default function Signup() {
  const [countries, setCountries] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
      mobile: "",
      reason: "",
    },
  });

  const { mutate: submitRegisteration, isPending: isRegisterationPending } =
    useMutation({
      mutationFn: async (data) => {
        const response = await axios.post("form/add-new-b2c-form-submission", {...data,sheetName:"Sign_up"});
        return response.data;
      },
      onSuccess: (data) => {
        toast.success("Sign up successful")
        reset();
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });

  const onSubmit = (data) => {
    submitRegisteration(data);
  };

  useEffect(() => {
    const getContries = async () => {
      const response = await fetch(
        "https://trial.mobiscroll.com/content/countries.json"
      );
      const countries = await response.json();
      setCountries(countries);
    };
    getContries();
  }, []);

  return (
    <div className="flex items-center justify-center   px-4 md:h-[60vh] lg:h-[80vh] border-gray-300 rounded-lg">
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
        <h1 className="text-hero">Signup</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-1">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  required
                  error={!!fieldState.error}
                  variant="standard"
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="col-span-1">
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  required
                  error={!!fieldState.error}
                  variant="standard"
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="col-span-1">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  required
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option.text || ""}
                  onChange={(_, data) => field.onChange(data?.text || "")}
                  value={countries.find((c) => c.text === field.value) || null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="standard"
                      required
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </div>

          <div className="col-span-1">
            <Controller
              name="mobile"
              control={control}
              rules={{ required: "Mobile number is required" }}
              render={({ field, fieldState }) => (
                <MuiTelInput
                  {...field}
                  label="Mobile"
                  fullWidth
                  required
                  defaultCountry="IN"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          <div className="col-span-2">
            <FormControl fullWidth>
              <Controller
                name="reason"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    select
                    {...field}
                    label="What is your reason for signup?"
                    error={!!fieldState.error}
                    variant="standard"
                  >
                    <MenuItem
                      sx={{ textWrap: "wrap" }}
                      value="have queries and want to know if WoNo can help me"
                    >
                      <div className="flex items-start gap-2">
                        <BiCheck size={20} />
                        <span>Just want to know if WoNo can help me</span>
                      </div>
                    </MenuItem>
                    <MenuItem value="Just exploring an investment possibility">
                      <div className="flex items-start gap-2">
                        <BiCheck size={20} />
                        <span>Just exploring an investment possibility</span>
                      </div>
                    </MenuItem>
                    <MenuItem value="Want to buy an apartment">
                      <div className="flex items-start gap-2">
                        <BiCheck size={20} />
                        <span>Want to buy an apartment</span>
                      </div>
                    </MenuItem>
                    <MenuItem value="Want to sell an apartment">
                      <div className="flex items-start gap-2">
                        <BiCheck size={20} />
                        <span>Want to sell an apartment</span>
                      </div>
                    </MenuItem>
                    <MenuItem value="Need mortgage">
                      <div className="flex items-start gap-2">
                        <BiCheck size={20} />
                        <span>Need mortgage</span>
                      </div>
                    </MenuItem>
                    <MenuItem value="Need mortgage">
                      <div className="flex items-start gap-2">
                        <BiCheck size={20} />
                        <span>Add Partnership</span>
                      </div>
                    </MenuItem>
                    <MenuItem value="Other reasons">
                      <div className="flex items-start gap-2">
                        <BiCheck size={20} />
                        <span>Other reasons</span>
                      </div>
                    </MenuItem>
                  </TextField>
                )}
              />
            </FormControl>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center items-center mt-2 py-2">
            <PrimaryButton
              type={"submit"}
              isLoading={isRegisterationPending}
              title={"Signup"}
              disabled={isRegisterationPending}
              className={
                "bg-[#FF5757]  flex text-white font-[500] capatilize hover:bg-[#E14C4C] w-[7rem] px-6"
              }
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-center">
              Already have an account?&nbsp;
              <span className="underline">
                <Link to="/nomad/login">Log In</Link>
              </span>
            </p>
          </div>
        </form>

        <MuiModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="Registration Successful"
          height="20vh"
          width="30vw"
          color="text-green-500"
        >
          <div className="flex flex-col space-y-4 text-pretty">
            <p>Thank you for signing up with BRIDG.</p>

            <p>
              Kindly allow us sometime to evaluate your profile. Once the same
              is done, your Personal Assistant from BRIDG will connect with you
              as per your prefered time and get you on-boarded to start the
              Dubai Real Estate Investment process.
            </p>

            <p>Thank you again for trusting in us and signing up!</p>
          </div>
        </MuiModal>
      </div>
    </div>
  );
}
