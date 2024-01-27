"use client";
import { PropsWithChildren, createContext, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export const TopLoadingContext = createContext({
  startLoading: () => {},
  completeLoading: () => {},
});

const TopLoading = ({ children }: PropsWithChildren) => {
  const ref: any = useRef();
  const [noAnimation, setNoAnimation] = useState("");
  const startLoading = () => {
    ref.current.continuousStart();
    setNoAnimation("no-animation");
  };
  const completeLoading = () => {
    ref.current.complete();
    setTimeout(() => setNoAnimation(""), 350);
  };
  return (
    <TopLoadingContext.Provider value={{ completeLoading, startLoading }}>
      <LoadingBar color="#65c3c8" ref={ref} />
      <div className={noAnimation}>{children}</div>
    </TopLoadingContext.Provider>
  );
};

export default TopLoading;
