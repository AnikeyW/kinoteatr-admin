import axios, { AxiosError } from "axios";
import $api from "@/http";

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

export const authService = {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/login",
        { email, password },
        { withCredentials: true },
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const data = axiosError.response.data as ErrorResponse;
          throw new Error(data.message);
        } else {
          console.log("Error message:", axiosError.message);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  },

  async logout(): Promise<any> {
    try {
      const response = await $api.get(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "auth/logout",
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const data = axiosError.response.data as ErrorResponse;
          throw new Error(data.message);
        } else {
          console.log("Error message:", axiosError.message);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  },
};
