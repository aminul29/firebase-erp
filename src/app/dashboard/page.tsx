
"use client"

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockProjects, mockTasks, mockUser, mockEmployees } from "@/lib/mock-data";
import { Project, Task } from "@/lib/types";
import { Activity, Briefcase, CheckCircle, Clock, ListTodo, Users, AlertCircle, FileCheck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { differenceInDays, format, parseISO, subDays } from 'date-fns';

const StatCard = ({ title, value, icon: Icon, description }: { title: string; value: string | number; icon: React.ElementType, description: string }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
);

const WeeklyTimeChart = ({ tasks }: { tasks: Task[] }) => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(today, i)).reverse();

    const data = last7Days.map(date => {
        const dateString = format(date, 'yyyy-MM-dd');
        const tasksOnDay = tasks.filter(task => task.deadline === dateString && task.status === 'Done');
        const totalHours = tasksOnDay.reduce((sum, task) => sum + task.timeLogged, 0);
        return {
            name: format(date, 'EEE'),
            hours: totalHours
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Weekly Time Contribution (Hours)</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                color: "hsl(var(--foreground))"
                            }}
                            cursor={{ fill: 'hsl(var(--accent))' }}
                        />
                        <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

const ProjectsNearingDeadline = ({ projects }: { projects: Project[] }) => {
    const today = new Date();
    const nearingDeadlineProjects = projects.filter(p => {
        const deadline = parseISO(p.deadline);
        const daysUntilDeadline = differenceInDays(deadline, today);
        return daysUntilDeadline >= 0 && daysUntilDeadline <= 30 && p.status !== 'Completed';
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive"/>
                    Projects Nearing Deadline
                </CardTitle>
            </CardHeader>
            <CardContent>
                {nearingDeadlineProjects.length > 0 ? (
                    <div className="space-y-4">
                        {nearingDeadlineProjects.map(project => (
                             <div key={project.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                               <div>
                                 <p className="font-medium">{project.name}</p>
                                 <p className="text-sm text-muted-foreground">Due: {project.deadline}</p>
                               </div>
                               <Badge variant="destructive">{differenceInDays(parseISO(project.deadline), today)} days left</Badge>
                             </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No projects due within 30 days.</p>
                )}

            </CardContent>
        </Card>
    )
}

const ActivityLog = ({ tasks, projects }: { tasks: Task[], projects: Project[] }) => {
    const recentActivities = [
        ...tasks.map(t => ({ type: 'Task', ...t, date: t.deadline })),
        ...projects.map(p => ({ type: 'Project', ...p, date: p.deadline, title: p.name }))
    ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary"/>
                    Activity Log
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentActivities.map(activity => (
                        <div key={`${activity.type}-${activity.id}`} className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                {activity.type === 'Task' ? <CheckCircle className="h-5 w-5 text-green-500 mt-1" /> : <Briefcase className="h-5 w-5 text-blue-500 mt-1" />}
                            </div>
                           <div>
                             <p className="font-medium">{activity.title}</p>
                             <p className="text-sm text-muted-foreground">
                                {activity.type === 'Task' ? `Task completed` : `Project status: ${activity.status}`} - {format(parseISO(activity.date), 'PP')}
                             </p>
                           </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

const RecentCompletions = ({ tasks }: { tasks: Task[] }) => {
    const completedTasks = tasks.filter(t => t.status === 'Done').slice(0,5);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-secondary"/>
                    Recent Completions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {completedTasks.length > 0 ? completedTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                           <div>
                             <p className="font-medium">{task.title}</p>
                             <p className="text-sm text-muted-foreground">Completed: {task.deadline}</p>
                           </div>
                           <Badge variant="outline">Done</Badge>
                        </div>
                    )) : (
                        <p className="text-muted-foreground">No recent completions.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}


export default function DashboardPage() {
    const user = mockUser;
    const projects = mockProjects;
    const tasks = mockTasks;
    const employees = mockEmployees;

    const ongoingProjects = projects.filter(p => p.status === 'In Progress').length;
    const pendingTasks = tasks.filter(t => t.status === 'To Do' || t.status === 'In Progress').length;
    const teamSize = employees.length;
    const myOpenTasks = tasks.filter(t => t.assigneeId === user.id && t.status !== 'Done').length;

  return (
    <div className="flex-1 space-y-4">
        <Header title="Dashboard" />
        <div className="p-4 md:p-8 pt-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Projects"
                    value={projects.length}
                    icon={Briefcase}
                    description={`${ongoingProjects} Ongoing`}
                />
                <StatCard
                    title="Total Tasks"
                    value={tasks.length}
                    icon={ListTodo}
                    description={`${pendingTasks} Pending`}
                />
                <StatCard
                    title="Team Size"
                    value={teamSize}
                    icon={Users}
                    description="Active Members"
                />
                <StatCard
                    title="My Open Tasks"
                    value={myOpenTasks}
                    icon={CheckCircle}
                    description="Assigned to you"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2">
                     <WeeklyTimeChart tasks={tasks} />
                </div>
                <div>
                    <ProjectsNearingDeadline projects={projects} />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                <div>
                    <ActivityLog tasks={tasks} projects={projects} />
                </div>
                <div>
                    <RecentCompletions tasks={tasks} />
                </div>
            </div>

        </div>
    </div>
  );
}
