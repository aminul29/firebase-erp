
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
  const [columns, setColumns] = useState<Columns>({});
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
    
    if (source.droppableId === destination.droppableId) {
        // Reordering within the same column
        const column = columns[source.droppableId];
        const newItems = Array.from(column);
        const [reorderedItem] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, reorderedItem);

        setColumns({
            ...columns,
            [source.droppableId]: newItems
        });

    } else {
        // Moving from one column to another
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = Array.from(sourceColumn);
        const destItems = Array.from(destColumn);
        const [movedItem] = sourceItems.splice(source.index, 1);
        
        // Update status of the moved item
        movedItem.status = destination.droppableId as Task['status'];

        destItems.splice(destination.index, 0, movedItem);

        setColumns({
            ...columns,
            [source.droppableId]: sourceItems,
            [destination.droppableId]: destItems
        });
    }
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
