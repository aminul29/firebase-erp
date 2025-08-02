import { Client, Employee, Project, Task, User } from './types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Doe',
  email: 'alex.doe@webwizflow.com',
  avatarUrl: 'https://placehold.co/100x100',
  role: 'Admin',
};

export const mockEmployees: Employee[] = [
  { id: 'emp-1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Teammate', avatarUrl: 'https://placehold.co/100x100', skills: ['React', 'TypeScript', 'CSS'], availability: 'Available' },
  { id: 'emp-2', name: 'Bob Williams', email: 'bob@example.com', role: 'Teammate', avatarUrl: 'https://placehold.co/100x100', skills: ['Node.js', 'Python', 'Databases'], availability: 'Busy' },
  { id: 'emp-3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Teammate', avatarUrl: 'https://placehold.co/100x100', skills: ['Figma', 'User Research', 'Prototyping'], availability: 'Available' },
  { id: 'emp-4', name: 'Diana Miller', email: 'diana@example.com', role: 'Admin', avatarUrl: 'https://placehold.co/100x100', skills: ['Agile', 'Scrum', 'JIRA'], availability: 'Available' },
  { id: 'emp-5', name: 'Ethan Garcia', email: 'ethan@example.com', role: 'HR', avatarUrl: 'https://placehold.co/100x100', skills: ['Docker', 'Kubernetes', 'CI/CD'], availability: 'On Leave' },
  { id: 'emp-6', name: 'Fiona Clark', email: 'fiona@example.com', role: 'CEO', avatarUrl: 'https://placehold.co/100x100', skills: ['Automated Testing', 'Selenium', 'Manual Testing'], availability: 'Busy' },
];

export const mockClients: Client[] = [
  { id: 'client-1', name: 'Innovate Inc.', contactPerson: 'John Smith', email: 'john@innovate.com', phone: '123-456-7890', projectIds: ['proj-1'] },
  { id: 'client-2', name: 'Solutions Co.', contactPerson: 'Jane Doe', email: 'jane@solutions.co', phone: '098-765-4321', projectIds: ['proj-2', 'proj-3'] },
  { id: 'client-3', name: 'Synergy Corp.', contactPerson: 'Peter Jones', email: 'peter@synergy.com', phone: '555-555-5555', projectIds: [] },
];

export const mockProjects: Project[] = [
  { id: 'proj-1', name: 'E-commerce Platform', clientId: 'client-1', status: 'In Progress', deadline: '2024-12-31' },
  { id: 'proj-2', name: 'Mobile App Redesign', clientId: 'client-2', status: 'Completed', deadline: '2024-08-15' },
  { id: 'proj-3', name: 'Cloud Migration', clientId: 'client-2', status: 'Planning', deadline: '2025-03-01' },
];

export const mockTasks: Task[] = [
  { id: 'task-1', projectId: 'proj-1', title: 'Setup database schema', description: 'Design and implement the initial database schema for products and users.', assigneeId: 'emp-2', status: 'Done', deadline: '2024-07-20', timeLogged: 8 },
  { id: 'task-2', projectId: 'proj-1', title: 'Develop homepage UI', description: 'Create the main landing page based on the Figma designs.', assigneeId: 'emp-1', status: 'In Progress', deadline: '2024-08-01', timeLogged: 12 },
  { id: 'task-3', projectId: 'proj-1', title: 'Implement user authentication', description: 'Build the login and registration flows for users.', assigneeId: 'emp-2', status: 'In Progress', deadline: '2024-08-05', timeLogged: 15 },
  { id: 'task-4', projectId: 'proj-1', title: 'Create product page mockups', description: 'Design the detailed product view and checkout process.', assigneeId: 'emp-3', status: 'In Progress', deadline: '2024-07-28', timeLogged: 20 },
  { id: 'task-5', projectId: 'proj-1', title: 'API for product catalog', description: 'Develop REST endpoints for fetching and managing products.', assigneeId: null, status: 'To Do', deadline: '2024-08-10', timeLogged: 0 },
  { id: 'task-6', projectId: 'proj-2', title: 'User research for new design', description: 'Conduct interviews and surveys with existing users.', assigneeId: 'emp-3', status: 'Done', deadline: '2024-06-30', timeLogged: 25 },
  { id: 'task-7', projectId: 'proj-3', title: 'Evaluate cloud providers', description: 'Compare AWS, GCP, and Azure for project needs.', assigneeId: 'emp-5', status: 'Done', deadline: '2024-07-15', timeLogged: 16 },
  { id: 'task-8', projectId: 'proj-1', title: 'Setup CI/CD pipeline', description: 'Automate the build, test, and deployment process.', assigneeId: null, status: 'To Do', deadline: '2024-08-12', timeLogged: 0 },
];
