"use client";
import { PropsWithChildren, createContext, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

export const TopLoadingContext = createContext({
  startLoading: () => {},
  completeLoading: () => {},
});

const TopLoading = ({ children }: PropsWithChildren) => {
  const ref: any = useRef();
  return (
    <div>
      <LoadingBar color="#f11946" ref={ref} />
      {children}
    </div>
  );
};

export default TopLoading;
