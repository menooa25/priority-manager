import classNames from "classnames";
import Link from "next/link";
import React from "react";

interface Props {
  goalIsDone: boolean;
  goalId: number;
}

const LinkToTask = ({ goalIsDone, goalId }: Props) => {
  const btnClass = classNames({
    "!bg-base-300 !border-base-300": goalIsDone,
  });
  return (
    <Link href={`/tasks?goal=${goalId}`} className={"tag-button " + btnClass}>
      فعالیت ها
    </Link>
  );
};

export default LinkToTask;
