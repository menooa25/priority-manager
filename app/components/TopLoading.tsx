"use client";
import { PropsWithChildren, createContext, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

export const TopLoadingContext = createContext({
  startLoading: () => {},
  completeLoading: () => {},
});

const TopLoading = ({ children }: PropsWithChildren) => {
  const ref: any = useRef();
  const startLoading = () => ref.current.continuousStart();
  const completeLoading = () => ref.current.complete();
  return (
    <TopLoadingContext.Provider value={{ completeLoading, startLoading }}>
      <LoadingBar color="#f11946" ref={ref} />
      {children}
    </TopLoadingContext.Provider>
  );
};

export default TopLoading;
