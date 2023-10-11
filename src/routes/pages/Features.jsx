import React from "react";
import { useErrorAlert } from "../../hooks/useErrorAlert";

export default function Features() {
  const [error, setError] = React.useState({ other: null });

  error.other = "Something went wrong";

  const NonAuthErrorAlert = useErrorAlert({
    error: error.other,
    clearError: () => {
      setError((prevError) => ({ ...prevError, other: null }));
    },
  });

  return (
    <div>
      <NonAuthErrorAlert />
    </div>
  );
}
