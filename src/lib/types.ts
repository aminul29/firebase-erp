export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'CEO' | 'Admin' | 'HR' | 'Teammate';
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  role: 'CEO' | 'Admin' | 'HR' | 'Teammate';
  avatarUrl: string;
  skills: string[];
  availability: 'Available' | 'Busy' | 'On Leave';
};

export type Client = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  projectIds: string[];
};

export type Project = {
  id: string;
  name:string;
  clientId: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  deadline: string;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId: string | null;
  status: 'To Do' | 'In Progress' | 'Done';
  deadline: string;
  timeLogged: number; // in hours
};
