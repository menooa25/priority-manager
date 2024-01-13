import { Task as TaskSchema } from "@prisma/client";
import Task from "./Task";
import { hrtime } from "process";

const TaskList = () => {
  const taskList: TaskSchema[] = [
    { title: "some", id: 1 },
    { title: "hi", id: 2 },
    { title: "سلام", id: 3 },
    { title: "سام", id: 4 },
  ];
  return (
    <div className="flex  w-full md:w-96 flex-col gap-y-3">
      {taskList.map((t, i) => (
        <div key={t.id}>
          <Task title={t.title} />
          {taskList.length - 1 !== i && <hr className="mt-2" />}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
