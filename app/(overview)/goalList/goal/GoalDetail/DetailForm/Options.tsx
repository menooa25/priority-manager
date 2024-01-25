"use client";

import classNames from "classnames";
import { useContext, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { AllowedOptionsContext } from "../AllowedOptionsProvider";

const Options = () => {
  const { allow, allowedOptions } = useContext(AllowedOptionsContext);
  const [open, setOpen] = useState<"not-clicked" | "open" | "close">(
    "not-clicked"
  );
  const gearClass = classNames({
    "open-options": open === "open",
    "close-options": open === "close",
  });
  const optionsClass = classNames({
    "open-options-width": open === "open",
    "close-options-width": open === "close",
  });
  const onGearClick = () => {
    if (open === "not-clicked") setOpen("open");
    else if (open === "open") setOpen("close");
    else if (open === "close") setOpen("open");
  };
  return (
    <div className="relative h-6 flex items-center overflow-hidden">
      <FaGear
        size={22}
        onClick={onGearClick}
        className={"cursor-pointer ml-auto z-10 block " + gearClass}
      />
      <div
        className={
          "form-control flex-row gap-x-2 top-0 bottom-0 h-6  border-b border-b-primary bg-primary mr-2 bg-opacity-10 pl-2 rounded-l-lg  right-0 w-0 absolute " +
          optionsClass
        }
      >
        <label className="label cursor-pointer p-0">
          <span className="label-text text-nowrap flex items-start ">
            چرا
            <input
              onChange={({ target: { checked } }) => allow("why", checked)}
              checked={allowedOptions.why}
              type="checkbox"
              className="checkbox checkbox-xs mt-px  ml-1"
            />
          </span>
        </label>
        <label className="label cursor-pointer p-0">
          <span className="label-text text-nowrap flex items-start ">
            چگونه
            <input
              checked={allowedOptions.how}
              onChange={({ target: { checked } }) => allow("how", checked)}
              type="checkbox"
              className="checkbox checkbox-xs mt-px ml-1"
            />
          </span>
        </label>
        <label className="label cursor-pointer p-0">
          <span className="label-text text-nowrap flex items-start ">
            جه زمانی
            <input
              checked={allowedOptions.when}
              onChange={({ target: { checked } }) => allow("when", checked)}
              type="checkbox"
              className="checkbox checkbox-xs mt-px ml-1"
            />
          </span>
        </label>
      </div>
    </div>
  );
};

export default Options;
