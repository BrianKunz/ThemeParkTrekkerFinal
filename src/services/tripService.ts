import axios from "axios";
import { Trip } from "../entities/Trip.entity";

const baseURL = "https://themeparktrekker.herokuapp.com/trips/";

export const tripService = {
  getAll: async (): Promise<Trip[]> => {
    const token = getCookie("accessToken");
    console.log(getCookie("accesssToken"));

    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getOne: async (id: string): Promise<Trip> => {
    const token = getCookie("accessToken");
    console.log(getCookie("accesssToken"));

    const response = await axios.get(baseURL + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  create: async (trip: Trip): Promise<Trip> => {
    const token = getCookie("accessToken");
    console.log(getCookie("accesssToken"));

    const response = await axios.post(baseURL, trip, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  update: async (id: string, trip: Trip): Promise<Trip> => {
    const token = getCookie("accessToken");

    const response = await axios.put(baseURL + id, trip, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    const token = getCookie("accessToken");

    await axios.delete(baseURL + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return null;
}
