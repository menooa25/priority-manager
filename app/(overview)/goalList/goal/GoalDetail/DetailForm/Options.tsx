"use client";

import classNames from "classnames";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";

const Options = () => {
  const [open, setOpen] = useState<"not-clicked" | "open" | "close">(
    "not-clicked"
  );
  const gearClass = classNames({
    "cursor-pointer": true,
    "open-options": open === "open",
    "close-options": open === "close",
  });
  const onGearClick = () => {
    if (open === "not-clicked") setOpen("open");
    else if (open === "open") setOpen("close");
    else if (open === "close") setOpen("open");
  };
  return (
    <div className="flex justify-end">
      <FaGear onClick={onGearClick} className={gearClass + " "} />
    </div>
  );
};

export default Options;
