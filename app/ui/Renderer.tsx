"use client";

import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  condition: boolean;
}
const Renderer = ({ children, condition }: Props) => {
  if (condition) return <>{children}</>;
  return null;
};

export default Renderer;
