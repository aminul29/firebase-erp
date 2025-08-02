"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee, Task } from "@/lib/types";
import { Bot, Calendar, Clock } from "lucide-react";
import { TaskSuggestionModal } from "./task-suggestion-modal";

type TaskCardProps = {
  task: Task;
  allEmployees: Employee[];
};

export function TaskCard({ task, allEmployees }: TaskCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const assignee = allEmployees.find((emp) => emp.id === task.assigneeId);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return names[0][0];
  }

  const getBadgeVariant = (status: Task['status']) => {
    switch(status) {
      case 'To Do': return 'secondary';
      case 'In Progress': return 'default';
      case 'Done': return 'outline';
      default: return 'secondary';
    }
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-base">{task.title}</CardTitle>
          <CardDescription className="text-xs">{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{task.deadline}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{task.timeLogged}h</span>
            </div>
          </div>
          <Badge variant={getBadgeVariant(task.status)}>{task.status}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => setModalOpen(true)}>
            <Bot className="mr-2 h-4 w-4" />
            Suggest Assignee
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{assignee?.name ?? 'Unassigned'}</span>
            <Avatar className="h-8 w-8" data-ai-hint="employee avatar">
              {assignee && <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />}
              <AvatarFallback>{assignee ? getInitials(assignee.name) : '?'}</AvatarFallback>
            </Avatar>
          </div>
        </CardFooter>
      </Card>
      {isModalOpen && (
        <TaskSuggestionModal
          task={task}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
