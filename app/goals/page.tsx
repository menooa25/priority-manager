import GoalContextProvider from "./ui/goals/GoalContextProvider";
import GoalList from "./ui/goals/goalList/GoalList";

const GoalsPage = async () => {
  return (
    <div className="page-container ">
      <GoalContextProvider>
        <GoalList />
      </GoalContextProvider>
    </div>
  );
};

export default GoalsPage;
