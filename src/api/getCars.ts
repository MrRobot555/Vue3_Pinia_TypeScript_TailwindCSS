import axios from "axios";
import type { Car } from "@/api/types";

const getCars = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/cars`;
  const response = await axios.get<Car[]>(url);
  return response.data;
};

export default getCars;
