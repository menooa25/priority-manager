import classNames from "classnames";
import { default as NextLink } from "next/link";
import React, { useContext } from "react";
import { SingleGoalContext } from "../SingleGoalContextProvider";

const Link = () => {
  const { done, id } = useContext(SingleGoalContext)!;
  const btnClass = classNames({
    "!bg-base-300 !border-base-300": done,
  });
  return (
    <NextLink
      onClick={() => localStorage.setItem("goal", id.toString())}
      href={`/tasks?goal=${id}`}
      className={"tag-button " + btnClass}
    >
      فعالیت ها
    </NextLink>
  );
};

export default Link;
