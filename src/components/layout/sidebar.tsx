"use client";

import {
  Briefcase,
  CheckSquare,
  Clock,
  LayoutGrid,
  LogIn,
  Users,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/dashboard/projects", icon: Briefcase, label: "Projects" },
  { href: "/dashboard/tasks", icon: CheckSquare, label: "Tasks" },
  { href: "/dashboard/clients", icon: Users, label: "Clients" },
  { href: "/dashboard/employees", icon: Users, label: "Employees" },
  { href: "/dashboard/tracking", icon: Clock, label: "Time Tracking" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-card h-screen sticky top-0">
      <div className="flex items-center h-16 border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline">
          <Workflow className="h-6 w-6 text-primary" />
          <span className="text-lg">WebWizFlow</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <Link href="/login">
            <Button variant="outline" className="w-full justify-start gap-2">
                <LogIn className="h-4 w-4" />
                Logout
            </Button>
        </Link>
      </div>
    </aside>
  );
}
