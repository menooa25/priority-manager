"use client";

import { PropsWithChildren, createContext, useState } from "react";
type Options = "why" | "how" | "when";
export const AllowedOptionsContext = createContext({
  allow: (option: Options, isAllowed: boolean) => {},
  allowedOptions: {
    why: true,
    how: true,
    when: true,
  },
});
const AllowedOptionsProvider = ({ children }: PropsWithChildren) => {
  const [allowedOptions, setAllowedOptions] = useState({
    why: true,
    how: true,
    when: true,
  });
  const allow = (option: Options, isAllowed: boolean) => {
    setAllowedOptions({ ...allowedOptions, [option]: isAllowed });
  };

  return (
    <AllowedOptionsContext.Provider value={{ allowedOptions, allow }}>
      {children}
    </AllowedOptionsContext.Provider>
  );
};

export default AllowedOptionsProvider;
