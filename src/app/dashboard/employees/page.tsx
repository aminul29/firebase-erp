import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockEmployees } from "@/lib/mock-data";
import { Employee } from "@/lib/types";

export default function EmployeesPage() {
  const employees = mockEmployees;

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return names[0][0];
  }

  const getAvailabilityVariant = (availability: Employee['availability']) => {
    switch (availability) {
      case 'Available': return 'default';
      case 'Busy': return 'secondary';
      case 'On Leave': return 'destructive';
      default: return 'outline';
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <Header title="Employees" />
      <div className="p-4 md:p-8 pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9" data-ai-hint="employee avatar">
                          <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                          <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                            <p className="font-semibold">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {employee.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={getAvailabilityVariant(employee.availability)}>{employee.availability}</Badge>
                    </TableCell>
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
