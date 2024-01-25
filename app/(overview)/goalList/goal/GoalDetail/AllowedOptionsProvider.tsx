"use client";

import { PropsWithChildren, createContext, useState } from "react";
type Options = "why" | "how" | "when";
export const AllowedOptionsContext = createContext({
  allow: (option: Options) => {},
  disallow: (option: Options) => {},
  allowedOptions: {},
});
const AllowedOptionsProvider = ({ children }: PropsWithChildren) => {
  const [allowedOptions, setAllowedOptions] = useState({
    why: true,
    how: true,
    when: true,
  });
  const allow = (option: Options) => {
    setAllowedOptions({ ...allowedOptions, [option]: true });
  };
  const disallow = (option: Options) => {
    setAllowedOptions({ ...allowedOptions, [option]: false });
  };
  return (
    <AllowedOptionsContext.Provider value={{ allowedOptions, allow, disallow }}>
      {children}
    </AllowedOptionsContext.Provider>
  );
};

export default AllowedOptionsProvider;
