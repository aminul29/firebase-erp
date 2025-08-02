
"use server";

import { mockEmployees } from "@/lib/mock-data";
import { Task } from "@/lib/types";
import { taskAssignmentSuggestions } from "./flows/task-assignment-suggestions";

export async function getTaskAssignmentSuggestions(task: Task) {
  try {
    const allEmployees = mockEmployees;

    // A real app would get required skills from task properties or user input
    const requiredSkills = ['React', 'Node.js', 'Databases', 'TypeScript', 'CSS', 'Figma'];

    const employeeAvailability = allEmployees.reduce((acc, emp) => {
      acc[emp.id] = emp.availability;
      return acc;
    }, {} as Record<string, string>);

    const employeeProfiles = allEmployees.map(emp => ({
      employeeId: emp.id,
      skills: emp.skills,
    }));

    const suggestions = await taskAssignmentSuggestions({
      taskDescription: task.description,
      employeeSkills: requiredSkills,
      employeeAvailability,
      employeeProfiles,
    });
    
    return { success: true, data: suggestions };
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    return { success: false, error: "Failed to get AI suggestions." };
  }
}
