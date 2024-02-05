import FilterAsDay from "./ui/FilterAsDay";
import FilterAsGoal from "./ui/FilterAsGoal";
import TaskContextProvider from "./ui/TaskContextProvider";
import TaskList from "./ui/TaskList";

const TasksPage = () => {
  return (
    <div className="page-container ">
      <div className="flex flex-col w-full gap-y-3">
        <FilterAsGoal />
        <FilterAsDay />
        <TaskContextProvider>
          <div>
            <TaskList />
          </div>
        </TaskContextProvider>
      </div>
    </div>
  );
};

export default TasksPage;
