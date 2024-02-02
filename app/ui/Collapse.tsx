"use client";
import { ReactNode, useState } from "react";

interface Props {
  title: ReactNode;
  children: ReactNode;
}

const Collapse = ({ children, title }: Props) => {
  return (
    <div className="collapse rounded-none ">
      <input type="checkbox" className="min-h-0" />
      <div className="collapse-title p-0 min-h-0 rounded-none">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

export default Collapse;
