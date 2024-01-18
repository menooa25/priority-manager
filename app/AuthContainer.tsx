"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const AuthContainer = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContainer;
