
"use client";

import { useEffect, useState } from "react";
import { mockEmployees, mockTasks } from "@/lib/mock-data";
import { Task } from "@/lib/types";
import { TaskCard } from "./task-card";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  columnId: string;
};

const TaskColumn = ({ title, tasks, columnId }: TaskColumnProps) => (
  <Droppable droppableId={columnId} isDropDisabled={false}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="flex-1 p-4 bg-card rounded-lg border min-w-[300px]"
      >
        <h2 className="text-lg font-bold font-headline mb-4">{title}</h2>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard task={task} allEmployees={mockEmployees} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
);

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    
    const newStatus = destination.droppableId as Task['status'];
    
    const updatedTasks = tasks.map(task => 
      task.id === draggableId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };
  
  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  if (!isClient) {
    return null; // Don't render on the server
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
            <TaskColumn title="To Do" tasks={todoTasks} columnId="To Do" />
            <TaskColumn title="In Progress" tasks={inProgressTasks} columnId="In Progress" />
            <TaskColumn title="Done" tasks={doneTasks} columnId="Done" />
        </div>
    </DragDropContext>
  );
}
