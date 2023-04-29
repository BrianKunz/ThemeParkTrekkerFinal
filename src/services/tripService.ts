import axios from "axios";
import { Trip } from "../entities/Trip.entity";

const baseURL = "https://themeparktrekker.herokuapp.com/trips/";

export const tripService = {
  getAll: async (): Promise<Trip[]> => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    console.log(token); // Log the token to the console
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  },

  getOne: async (id: string): Promise<Trip> => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    const response = await axios.get(baseURL + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  create: async (trip: Trip): Promise<Trip> => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    const response = await axios.post(baseURL, trip, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  update: async (id: string, trip: Trip): Promise<Trip> => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    const response = await axios.put(baseURL + id, trip, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    await axios.delete(baseURL + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
