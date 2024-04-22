import axios from "axios";
import type { Spotlight } from "@/api/types";

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;
  const response = await axios.get<Spotlight[]>(url);
  return response.data;
};

export default getSpotlights;
