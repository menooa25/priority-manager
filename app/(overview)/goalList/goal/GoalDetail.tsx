"use client";

import Collapse from "@/app/components/Collapse";

const GoalDetail = () => {
  return (
    <div>
      <Collapse
        title={
          <span className="bg-base-200 rounded-b-lg rounded-t-none px-7 ">
            جزئیات
          </span>
        }
      >
        <span>this is detail</span>
      </Collapse>
    </div>
  );
};

export default GoalDetail;
