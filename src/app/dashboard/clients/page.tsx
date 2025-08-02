import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockClients, mockProjects } from "@/lib/mock-data";

export default function ClientsPage() {
  const clients = mockClients;

  return (
    <div className="flex-1 space-y-4">
      <Header title="Clients" />
      <div className="p-4 md:p-8 pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Active Projects</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => {
                    const projectCount = mockProjects.filter(p => p.clientId === client.id && p.status !== 'Completed').length;
                    return (
                        <TableRow key={client.id}>
                            <TableCell className="font-medium">{client.name}</TableCell>
                            <TableCell>{client.contactPerson}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>{projectCount}</TableCell>
                        </TableRow>
                    )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
