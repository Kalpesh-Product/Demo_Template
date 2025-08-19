import { useLocation } from "react-router-dom";
import GlobalListingsMap from "./GlobalListingsMap";
import GlobalListingsList from "./GlobalListingsList"; // Assuming you split list logic

const GlobalListings = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const view = params.get("view");

  if (view === "map") {
    return <GlobalListingsMap />;
  }

  return <GlobalListingsList />; // Default to list view
};

export default GlobalListings;
