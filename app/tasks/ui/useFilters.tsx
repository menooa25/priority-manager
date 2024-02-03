import { getNearestDayOfWeek } from "@/app/lib/utils";
import { useSearchParams } from "next/navigation";

const useFilters = () => {
  const goalId = useSearchParams().get("goal");
  const dayFilter = useSearchParams().get("day");
  const goalIdNum = goalId && !isNaN(+goalId) ? +goalId : undefined;
  let dayFilterNum = dayFilter && !isNaN(+dayFilter) ? +dayFilter : undefined;
  let dayFilterDate: Date | undefined = undefined;
  if (dayFilterNum === -1) dayFilterDate = undefined;
  else if (dayFilterNum !== undefined) {
    dayFilterDate = getNearestDayOfWeek(dayFilterNum);
  }
  return { dayFilterDate, goalIdNum, dayFilter };
};

export default useFilters;
