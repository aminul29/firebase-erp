'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered task assignment suggestions.
 *
 * - taskAssignmentSuggestions - A function that generates task assignment suggestions based on employee skills and availability.
 * - TaskAssignmentInput - The input type for the taskAssignmentSuggestions function.
 * - TaskAssignmentOutput - The return type for the taskAssignmentSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskAssignmentInputSchema = z.object({
  taskDescription: z.string().describe('Description of the task to be assigned.'),
  employeeSkills: z.array(z.string()).describe('List of skills required for the task.'),
  employeeAvailability: z.record(z.string(), z.string()).describe('Availability of employees, with employee ID as key and availability as value (e.g., available, busy).'),
  employeeProfiles: z.array(z.object({
    employeeId: z.string().describe('Unique identifier for the employee.'),
    skills: z.array(z.string()).describe('List of skills possessed by the employee.'),
  })).describe('Profiles of employees, including their skills.'),
});
export type TaskAssignmentInput = z.infer<typeof TaskAssignmentInputSchema>;

const TaskAssignmentOutputSchema = z.object({
  suggestedAssignments: z.array(z.object({
    employeeId: z.string().describe('The ID of the employee suggested for the task.'),
    reason: z.string().describe('The reason for suggesting this employee.'),
  })).describe('Suggested task assignments with reasons.'),
});
export type TaskAssignmentOutput = z.infer<typeof TaskAssignmentOutputSchema>;

export async function taskAssignmentSuggestions(input: TaskAssignmentInput): Promise<TaskAssignmentOutput> {
  return taskAssignmentFlow(input);
}

const taskAssignmentPrompt = ai.definePrompt({
  name: 'taskAssignmentPrompt',
  input: {schema: TaskAssignmentInputSchema},
  output: {schema: TaskAssignmentOutputSchema},
  prompt: `You are an AI assistant helping project managers to assign tasks to employees based on their skills and availability.\n\nTask Description: {{{taskDescription}}}\nRequired Skills: {{#each employeeSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\n\nEmployee Profiles:\n{{#each employeeProfiles}}\n- Employee ID: {{{employeeId}}}\n  Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\n  Availability: {{{../employeeAvailability.[employeeId]}}}\n{{/each}}\n\nBased on the task description, required skills, employee profiles, and employee availability, suggest the best employee(s) to assign to the task. Provide a reason for each suggestion.\n\nFormat your response as a JSON array of objects, where each object has an employeeId and a reason.`, // Ensure correct Handlebars usage
});

const taskAssignmentFlow = ai.defineFlow(
  {
    name: 'taskAssignmentFlow',
    inputSchema: TaskAssignmentInputSchema,
    outputSchema: TaskAssignmentOutputSchema,
  },
  async input => {
    const {output} = await taskAssignmentPrompt(input);
    return output!;
  }
);
