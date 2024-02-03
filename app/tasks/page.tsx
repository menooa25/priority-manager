import Filters from "./Filters";
import TaskList from "./TaskList";

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
