
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
  <Droppable droppableId={columnId}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`flex-1 p-4 bg-card rounded-lg border min-w-[300px] ${snapshot.isDraggingOver ? 'bg-accent' : ''}`}
      >
        <h2 className="text-lg font-bold font-headline mb-4">{title}</h2>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`${snapshot.isDragging ? 'shadow-2xl' : ''}`}
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


type Columns = {
    [key: string]: Task[]
}

export function TaskBoard() {
  const [columns, setColumns] = useState<Columns>({
    "To Do": [],
    "In Progress": [],
    "Done": [],
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const todoTasks = mockTasks.filter((task) => task.status === "To Do");
    const inProgressTasks = mockTasks.filter((task) => task.status === "In Progress");
    const doneTasks = mockTasks.filter((task) => task.status === "Done");
    setColumns({
        "To Do": todoTasks,
        "In Progress": inProgressTasks,
        "Done": doneTasks
    });
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    
    setColumns(prevColumns => {
        const newColumns = { ...prevColumns };
        const sourceColumn = newColumns[source.droppableId];
        const destColumn = newColumns[destination.droppableId];

        if (source.droppableId === destination.droppableId) {
            const newItems = Array.from(sourceColumn);
            const [reorderedItem] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, reorderedItem);
            newColumns[source.droppableId] = newItems;
        } else {
            const sourceItems = Array.from(sourceColumn);
            const destItems = Array.from(destColumn);
            const [movedItem] = sourceItems.splice(source.index, 1);
            
            movedItem.status = destination.droppableId as Task['status'];
            destItems.splice(destination.index, 0, movedItem);

            newColumns[source.droppableId] = sourceItems;
            newColumns[destination.droppableId] = destItems;
        }
        return newColumns;
    });
  };
  
  if (!isClient) {
    // Render a skeleton or null on the server to avoid hydration errors
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
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
            {Object.entries(columns).map(([columnId, tasks]) => (
                 <TaskColumn key={columnId} title={columnId} tasks={tasks} columnId={columnId} />
            ))}
        </div>
    </DragDropContext>
  );
}
