import prisma from "@/prisma/client";
import Task from "./task/Task";
import AddTask from "./AddTask";

const TaskList = async () => {
  const taskList = await prisma.task.findMany({ orderBy: { done: "asc" } });
  return (
    <div className="flex  w-full md:w-96 flex-col gap-y-3">
      {taskList.map((t, i) => (
        <div key={t.id}>
          <Task done={t.done} id={t.id} title={t.title} />
          {taskList.length - 1 !== i && <hr className="mt-2" />}
        </div>
      ))}
      <AddTask />
    </div>
  );
};

export default TaskList;
