import React from "react";
import axios from "axios";

const { VITE_APP_BACKENDAPI_URI } = import.meta.env;

export function useAuthPath() {
  const pathsToCheck = [
    "/auth",
    "/account",
    "/checkout",
    "/payment",
    "/contact-us",
  ];

  return pathsToCheck.some((path) => location.pathname.startsWith(path));
}

export function useNewRequest() {
  return axios.create({
    baseURL: `${VITE_APP_BACKENDAPI_URI}/api`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
}

export function useTimeout(fn, ms) {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      fn();
    }, ms);
    return () => clearTimeout(timeout);
  }, [fn, ms]);
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

export function getDaysLeft(expireDate) {
  const currentDate = new Date();
  const expiryDateObject = new Date(expireDate);

  const timeDifference = expiryDateObject.getTime() - currentDate.getTime();

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft;
}

export function useMobileSize() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    });
  }, []);

  return { isMobile };
}

export function useShowLoader(loading, delayMs) {
  const [showLoader, setShowLoader] = React.useState(false);
  useTimeout(() => {
    if (loading) {
      setShowLoader(true);
    }
  }, [delayMs]);
  React.useEffect(() => {
    if (!loading) {
      setShowLoader(false);
    }
  }, [loading]);
  return showLoader;
}
