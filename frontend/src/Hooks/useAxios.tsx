import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [csrf, setCsrf] = useState("");

  useEffect(() => {
    getSession();
  }, []);

  const get = async (url: string) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error as AxiosError);
      throw error;
    }
  };

  // const post = async (url: string, data: any) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(url, data);
  //     setLoading(false);
  //     return response.data;
  //   } catch (error) {
  //     setLoading(false);
  //     setError(error as AxiosError);
  //     throw error;
  //   }
  // };

  const post = async (url: string, data: any) => {
    try {
      setLoading(true);
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf,
        },
        withCredentials: true,
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error as AxiosError);
      throw error;
    }
  };

  const getCsrf = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/auth/csrf/", {
        withCredentials: true,
      });
      setLoading(false);
      const csrfToken = res.headers["x-csrftoken"];
      if (csrfToken) setCsrf(csrfToken);

      return csrfToken;
    } catch (error) {
      setLoading(false);
      setError(error as AxiosError);
      throw error;
    }
  };

  const getSession = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/auth/session/", {
        withCredentials: true,
      });
      setLoading(false);
      console.log(res.data);
      if (res.data.isAuthenticated) {
        return true;
      } else {
        const csrfToken = await getCsrf();
        return csrfToken ? true : false;
      }
    } catch (error) {
      setLoading(false);
      setError(error as AxiosError);
      throw error;
    }
  };

  return { loading, error, get, post, getCsrf, getSession };
};

export default useAxios;
