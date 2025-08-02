"use client";

import { mockEmployees, mockTasks } from "@/lib/mock-data";
import { Task } from "@/lib/types";
import { TaskCard } from "./task-card";

const TaskColumn = ({ title, tasks }: { title: string; tasks: Task[] }) => (
  <div className="flex-1 p-4 bg-card rounded-lg border min-w-[300px]">
    <h2 className="text-lg font-bold font-headline mb-4">{title}</h2>
    <div className="space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} allEmployees={mockEmployees} />
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No tasks here.</p>
      )}
    </div>
  </div>
);

export function TaskBoard() {
  const tasks = mockTasks;
  
  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      <TaskColumn title="To Do" tasks={todoTasks} />
      <TaskColumn title="In Progress" tasks={inProgressTasks} />
      <TaskColumn title="Done" tasks={doneTasks} />
    </div>
  );
}
