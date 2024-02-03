import Filters from "./ui/Filters";
import TaskList from "./ui/TaskList";

const TasksPage = () => {
  return (
    <div className="page-container ">
      <div className="flex flex-col w-full gap-y-3">
        <Filters />
        <TaskList />
      </div>
    </div>
  );
};

export default TasksPage;
