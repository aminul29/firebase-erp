
"use client";

import { useState } from "react";
import { TaskBoard } from "@/components/dashboard/task-board";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddTaskDialog } from "@/components/dashboard/add-task-dialog";
import { mockEmployees, mockProjects, mockTasks } from "@/lib/mock-data";
import { Task } from "@/lib/types";

export default function TasksPage() {
  const [isAddTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'status' | 'timeLogged'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${tasks.length + 1}`,
      status: 'To Do',
      timeLogged: 0,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <>
      <div className="flex-1 space-y-4">
        <Header title="Tasks" />
        <div className="p-4 md:p-8 pt-6">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setAddTaskDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
          <TaskBoard tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
      <AddTaskDialog
        isOpen={isAddTaskDialogOpen}
        onClose={() => setAddTaskDialogOpen(false)}
        onAddTask={handleAddTask}
        projects={mockProjects}
        employees={mockEmployees}
      />
    </>
  );
}
