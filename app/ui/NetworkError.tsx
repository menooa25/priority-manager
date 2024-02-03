"use client";

import { useEffect, useState } from "react";

const NetworkError = () => {
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (!window.navigator.onLine) setShowError(true);
    else setShowError(false);
  }, []);
  if (showError)
    return (
      <div className="absolute z-50 top-0 left-0 right-0 bottom-0 bg-base-100 bg-opacity-75 flex justify-center items-center">
        <span className="font-bold bg-base-100 px-4 py-2 rounded-xl text-2xl">
          ...لطفا به اینترنت متصل شوید
        </span>
      </div>
    );
  return null;
};

export default NetworkError;
