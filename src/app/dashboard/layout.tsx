import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ReactNode } from "react";

// This is a placeholder, in a real app you'd get this from the route
const getTitleForRoute = (path: string) => {
  if (path.includes('/projects')) return 'Projects';
  if (path.includes('/tasks')) return 'Tasks';
  if (path.includes('/clients')) return 'Clients';
  if (path.includes('/employees')) return 'Employees';
  if (path.includes('/tracking')) return 'Time Tracking';
  return 'Dashboard';
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // In a real app, you would use usePathname() from next/navigation
  // but we are in a server component, so we can't.
  // This is a simplified approach for the scaffold.
  // A more robust solution might involve a context provider or passing props.
  const title = "Dashboard"; 

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
