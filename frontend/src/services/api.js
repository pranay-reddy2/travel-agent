import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL
});

export const generatePlan =
  async (brief) => {
    const { data } =
      await api.post("/plan", {
        brief
      });

    return data;
  };

export const requestChange =
  async (
    itinerary,
    request
  ) => {
    const { data } =
      await api.post("/change", {
        itinerary,
        request
      });

    return data;
  };