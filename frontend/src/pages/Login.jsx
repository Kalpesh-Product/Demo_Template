import { TextField, Button } from "@mui/material";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const { mutate: submitLogin, isPending: isLoginPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        import.meta.env.VITE_ENV === "PRODUCTION"
          ? `${import.meta.env.VITE_API_PRODUCTION_URL}/auth/login`
          : `${import.meta.env.VITE_API_DEVELOPMENT_URL}/auth/login`,
        { ...data },
        { headers: { "Content-Type": "application/json" } }
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Login successful");
      reset();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = (data) => {
    submitLogin(data);
  };

  return (
    <div className="flex items-center justify-center flex-col gap-14 h-[55vh] md:h-[60vh] lg:h-[75vh] border-gray-300 rounded-lg p-8">
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
        <h1 className="text-hero text-center">Login</h1>
        <form
          //   onSubmit={handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-1">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email/Phone"
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
                          tabIndex={-1}
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

          <div className="col-span-1 md:col-span-2 flex justify-center items-center mt-2 py-2">
            <PrimaryButton
              title={"Login"}
              type={"submit"}
              isLoading={isLoginPending}
              disabled={isLoginPending}
              className={
                "bg-[#FF5757]  flex text-white font-[500] capatilize hover:bg-[#E14C4C] w-[7rem] px-6"
              }
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-center">
              New to WoNo?&nbsp;{" "}
              <span className="underline">
                <Link to="/nomad/signup">Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
