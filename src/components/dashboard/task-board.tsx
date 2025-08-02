
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTasks(mockTasks);
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
    
    setTasks(currentTasks => {
        const newTasks = Array.from(currentTasks);
        const taskToMove = newTasks.find(t => t.id === draggableId);

        if (!taskToMove) return currentTasks;

        const updatedTask = { ...taskToMove, status: newStatus };
        
        const taskIndex = newTasks.findIndex(t => t.id === draggableId);
        newTasks.splice(taskIndex, 1);

        // This is a simplified logic. A real app might need more complex logic
        // to reorder items within the same list.
        const destinationTasks = newTasks.filter(t => t.status === newStatus);
        let insertAtIndex = newTasks.filter(t => t.status === destination.droppableId).length;

        // Find the correct global index to insert the task
        const lastTaskInDestinationColumn = newTasks
            .slice()
            .reverse()
            .find(t => t.status === newStatus);
        
        if (lastTaskInDestinationColumn) {
            insertAtIndex = newTasks.indexOf(lastTaskInDestinationColumn) + 1;
        } else {
            // Find the first task of the next status column
            const columnOrder: Task['status'][] = ['To Do', 'In Progress', 'Done'];
            const currentColumnIndex = columnOrder.indexOf(newStatus);
            let nextColumnTaskIndex = -1;
            for(let i = currentColumnIndex + 1; i < columnOrder.length; i++) {
                const nextStatus = columnOrder[i];
                const firstTaskOfNextColumn = newTasks.find(t => t.status === nextStatus);
                if (firstTaskOfNextColumn) {
                    nextColumnTaskIndex = newTasks.indexOf(firstTaskOfNextColumn);
                    break;
                }
            }
            if(nextColumnTaskIndex !== -1) {
                insertAtIndex = nextColumnTaskIndex;
            } else {
                insertAtIndex = newTasks.length;
            }
        }
        
        newTasks.splice(destination.index, 0, updatedTask);

        const reorderedTasks = newTasks.map(t => (t.id === draggableId ? updatedTask : t));

        // In this simple case, we can just update the status.
        // For reordering within a column, a more complex logic would be needed.
        return tasks.map(task => 
          task.id === draggableId ? { ...task, status: newStatus } : task
        );
    });
  };
  
  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

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
            <TaskColumn title="To Do" tasks={todoTasks} columnId="To Do" />
            <TaskColumn title="In Progress" tasks={inProgressTasks} columnId="In Progress" />
            <TaskColumn title="Done" tasks={doneTasks} columnId="Done" />
        </div>
    </DragDropContext>
  );
}
