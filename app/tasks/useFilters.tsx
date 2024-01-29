import { useSearchParams } from "next/navigation";

const useFilters = () => {
  const goalId = useSearchParams().get("goal");
  const dayFilter = useSearchParams().get("day");
  const goalIdNum = goalId && !isNaN(+goalId) ? +goalId : undefined;
  let dayFilterNum = dayFilter && !isNaN(+dayFilter) ? +dayFilter : undefined;
  if (dayFilterNum === -1) dayFilterNum = undefined;
  return { dayFilterNum, goalIdNum };
};

export default useFilters;
