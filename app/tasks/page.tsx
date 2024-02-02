import PageContainer from "../ui/PageContainer";
import Filters from "./Filters";
import TaskList from "./TaskList";

const TasksPage = () => {
  return (
    <PageContainer>
      <div className="flex flex-col w-full gap-y-3">
        <Filters />
        <TaskList />
      </div>
    </PageContainer>
  );
};

export default TasksPage;
