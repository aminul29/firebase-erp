
"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockClients, mockProjects } from "@/lib/mock-data";
import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddProjectDialog } from "@/components/dashboard/add-project-dialog";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isAddProjectDialogOpen, setAddProjectDialogOpen] = useState(false);

  const getClientName = (clientId: string) => {
    return mockClients.find(c => c.id === clientId)?.name || "N/A";
  }

  const getStatusVariant = (status: Project['status']) => {
    switch (status) {
      case 'In Progress': return 'default';
      case 'Planning': return 'secondary';
      case 'On Hold': return 'destructive';
      case 'Completed': return 'outline';
      default: return 'outline';
    }
  }

  const handleAddProject = (newProjectData: Omit<Project, 'id' | 'status'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: `proj-${projects.length + 1}`,
      status: 'Planning',
    };
    setProjects(prev => [...prev, newProject]);
  };

  return (
    <>
      <div className="flex-1 space-y-4">
        <Header title="Projects" />
        <div className="p-4 md:p-8 pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Project Overview</CardTitle>
              <Button onClick={() => setAddProjectDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deadline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{getClientName(project.clientId)}</TableCell>
                      <TableCell>
                          <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                      </TableCell>
                      <TableCell>{project.deadline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <AddProjectDialog
        isOpen={isAddProjectDialogOpen}
        onClose={() => setAddProjectDialogOpen(false)}
        onAddProject={handleAddProject}
        clients={mockClients}
      />
    </>
  );
}
