
"use client";

import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockEmployees } from "@/lib/mock-data";
import { Employee } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { AddTeammateDialog } from "@/components/dashboard/add-teammate-dialog";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isAddTeammateDialogOpen, setAddTeammateDialogOpen] = useState(false);

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

  const handleAddTeammate = (newTeammate: Omit<Employee, 'id' | 'avatarUrl' | 'availability' | 'skills'>) => {
    const newEmployee: Employee = {
      ...newTeammate,
      id: `emp-${employees.length + 1}`,
      avatarUrl: 'https://placehold.co/100x100',
      availability: 'Available',
      skills: [],
    }
    setEmployees(prev => [...prev, newEmployee]);
  };


  return (
    <>
    <div className="flex-1 space-y-4">
      <Header title="Employees" />
      <div className="p-4 md:p-8 pt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Employee Directory</CardTitle>
            <Button onClick={() => setAddTeammateDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Teammate
            </Button>
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
    <AddTeammateDialog 
        isOpen={isAddTeammateDialogOpen}
        onClose={() => setAddTeammateDialogOpen(false)}
        onAddTeammate={handleAddTeammate}
    />
    </>
  );
}
