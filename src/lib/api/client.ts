import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  withCredentials: true,
  timeout: 20_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (typeof window !== "undefined") {
      const locale = window.location.pathname.split("/")[1] || "en";

      if (status === 401) {
        window.location.href = `/${locale}/unauthorized`;
      }

      if (status === 403) {
        window.location.href = `/${locale}/forbidden`;
      }

      if (status === 429) {
        window.location.href = `/${locale}/too-many-requests`;
      }

      if (status === 503) {
        window.location.href = `/${locale}/maintenance`;
      }
    }

    return Promise.reject(error);
  },
);
