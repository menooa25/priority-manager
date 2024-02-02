import { useEffect, useRef } from "react";

const useClickedOutside = (onOutsideClick: () => void) => {
  const ref: any = useRef();
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {

      onOutsideClick();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { ref };
};

export default useClickedOutside;
