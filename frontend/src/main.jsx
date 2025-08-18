import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "keen-slider/keen-slider.min.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const queryClient = new QueryClient();
const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "Poppins-Regular",
      "Poppins-SemiBold",
      "Poppins-Bold",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:after": {
            borderBottomColor: "black",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: "0.85rem", // 🔽 globally reduce selected value font size
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}>
                <App />
              </RouterProvider>
            </QueryClientProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
