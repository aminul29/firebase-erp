"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getTaskAssignmentSuggestions } from "@/ai/actions";
import { Employee, Task } from "@/lib/types";
import { TaskAssignmentOutput } from "@/ai/flows/task-assignment-suggestions";
import { Lightbulb, UserCheck } from "lucide-react";
import { mockEmployees } from "@/lib/mock-data";

type TaskSuggestionModalProps = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
};

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return names[0][0];
  }

export function TaskSuggestionModal({ task, isOpen, onClose }: TaskSuggestionModalProps) {
  const [suggestions, setSuggestions] = useState<TaskAssignmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getTaskAssignmentSuggestions(task)
        .then((result) => {
          if (result.success && result.data) {
            setSuggestions(result.data);
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: result.error,
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, task, toast]);

  const findEmployee = (id: string): Employee | undefined => {
    return mockEmployees.find(emp => emp.id === id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="text-primary"/>
            AI-Powered Suggestions
            </DialogTitle>
          <DialogDescription>
            Smart recommendations for assigning "{task.title}".
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 p-2">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))
          ) : suggestions && suggestions.suggestedAssignments.length > 0 ? (
            suggestions.suggestedAssignments.map(({ employeeId, reason }) => {
              const employee = findEmployee(employeeId);
              if (!employee) return null;

              return (
              <div key={employeeId} className="flex items-start gap-4 p-4 rounded-lg border bg-accent/50">
                <Avatar className="h-10 w-10 border-2 border-primary" data-ai-hint="employee avatar">
                  <AvatarImage src={employee.avatarUrl} />
                  <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                    <Button size="sm">
                        <UserCheck className="mr-2 h-4 w-4"/>
                        Assign
                    </Button>
                  </div>
                  <p className="text-sm mt-2 text-muted-foreground font-code bg-background/50 p-2 rounded-md">{reason}</p>
                </div>
              </div>
            )})
          ) : (
            <p className="text-center text-muted-foreground">No suggestions available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
