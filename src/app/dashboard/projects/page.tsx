import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockClients, mockProjects } from "@/lib/mock-data";
import { Project } from "@/lib/types";

export default function ProjectsPage() {
  const projects = mockProjects;

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

  return (
    <div className="flex-1 space-y-4">
      <Header title="Projects" />
      <div className="p-4 md:p-8 pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
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
  );
}
