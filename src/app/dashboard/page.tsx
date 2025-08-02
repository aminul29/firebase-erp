
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProjects, mockTasks, mockUser } from "@/lib/mock-data";
import { Project, Task } from "@/lib/types";
import { Activity, Briefcase, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


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

const RecentProjects = ({ projects }: { projects: Project[] }) => {
    const getStatusVariant = (status: Project['status']) => {
        switch (status) {
          case 'In Progress': return 'default';
          case 'Planning': return 'secondary';
          case 'On Hold': return 'destructive';
          case 'Completed': return 'outline';
          default: return 'outline';
        }
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Deadline</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.slice(0, 5).map(project => (
                             <TableRow key={project.id}>
                                <TableCell>
                                    <div className="font-medium">{project.name}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">{project.deadline}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

const MyTasks = ({ tasks }: { tasks: Task[] }) => {

    const getStatusVariant = (status: Task['status']) => {
        switch(status) {
          case 'To Do': return 'secondary';
          case 'In Progress': return 'default';
          case 'Done': return 'outline';
          default: return 'secondary';
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Assigned to Me</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                           <div>
                             <p className="font-medium">{task.title}</p>
                             <p className="text-sm text-muted-foreground">Due: {task.deadline}</p>
                           </div>
                           <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default function DashboardPage() {
    const user = mockUser;
    const projects = mockProjects;
    const tasks = mockTasks;

    const activeProjects = projects.filter(p => p.status === 'In Progress').length;
    const pendingTasks = tasks.filter(t => t.status === 'To Do' || t.status === 'In Progress').length;
    const totalHoursTracked = tasks.reduce((acc, task) => acc + task.timeLogged, 0);
    const completedTasks = tasks.filter(t => t.status === 'Done').length;
    const myTasks = tasks.filter(t => t.assigneeId === user.id && t.status !== 'Done');

  return (
    <div className="flex-1 space-y-4">
        <Header title="Dashboard" />
        <div className="p-4 md:p-8 pt-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Welcome back, {user.name.split(' ')[0]}!</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Active Projects" 
                    value={activeProjects} 
                    icon={Briefcase}
                    description="Projects currently in progress"
                />
                <StatCard 
                    title="Pending Tasks" 
                    value={pendingTasks} 
                    icon={Activity}
                    description="Tasks that are not yet completed"
                />
                <StatCard 
                    title="Hours Tracked" 
                    value={`${totalHoursTracked}h`} 
                    icon={Clock}
                    description="Total hours logged on all tasks"
                />
                <StatCard 
                    title="Completed Tasks" 
                    value={completedTasks} 
                    icon={CheckCircle}
                    description="Tasks marked as done this month"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <RecentProjects projects={projects} />
                </div>
                <div className="lg:col-span-3">
                    <MyTasks tasks={myTasks} />
                </div>
            </div>

        </div>
    </div>
  );
}
