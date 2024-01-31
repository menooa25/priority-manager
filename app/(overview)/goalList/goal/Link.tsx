import classNames from "classnames";
import {default as NextLink} from "next/link";
import React from "react";

interface Props {
  goalIsDone: boolean;
  goalId: number;
}

const Link = ({ goalIsDone, goalId }: Props) => {
  const btnClass = classNames({
    "!bg-base-300 !border-base-300": goalIsDone,
  });
  return (
    <NextLink href={`/tasks?goal=${goalId}`} className={"tag-button " + btnClass}>
      فعالیت ها
    </NextLink>
  );
};

export default Link;
