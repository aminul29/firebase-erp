
"use client";

import { useEffect, useState } from "react";
import { mockEmployees, mockTasks } from "@/lib/mock-data";
import { Task } from "@/lib/types";
import { TaskCard } from "./task-card";

type TaskColumnProps = {
  title: string;
  tasks: Task[];
};

const TaskColumn = ({ title, tasks }: TaskColumnProps) => (
  <div
    className={`flex-1 p-4 bg-card rounded-lg border min-w-[300px]`}
  >
    <h2 className="text-lg font-bold font-headline mb-4">{title}</h2>
    <div className="space-y-4">
      {tasks.map((task) => (
          <TaskCard key={task.id} task={task} allEmployees={mockEmployees} />
      ))}
    </div>
  </div>
);


type Columns = {
    [key: string]: Task[]
}

export function TaskBoard() {
  const [columns, setColumns] = useState<Columns | null>(null);

  useEffect(() => {
    const todoTasks = mockTasks.filter((task) => task.status === "To Do");
    const inProgressTasks = mockTasks.filter((task) => task.status === "In Progress");
    const doneTasks = mockTasks.filter((task) => task.status === "Done");
    setColumns({
        "To Do": todoTasks,
        "In Progress": inProgressTasks,
        "Done": doneTasks
    });
  }, []);

  if (!columns) {
    return (
        <div className="flex gap-6 overflow-x-auto pb-4">
            <div className="flex-1 p-4 bg-card rounded-lg border min-w-[300px]">
                <h2 className="text-lg font-bold font-headline mb-4">To Do</h2>
            </div>
            <div className="flex-1 p-4 bg-card rounded-lg border min-w-[300px]">
                <h2 className="text-lg font-bold font-headline mb-4">In Progress</h2>
            </div>
            <div className="flex-1 p-4 bg-card rounded-lg border min-w-[300px]">
                <h2 className="text-lg font-bold font-headline mb-4">Done</h2>
            </div>
        </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
        {Object.entries(columns).map(([columnId, tasks]) => (
             <TaskColumn key={columnId} title={columnId} tasks={tasks} />
        ))}
    </div>
  );
}
