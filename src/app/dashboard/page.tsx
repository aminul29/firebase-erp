import { TaskBoard } from "@/components/dashboard/task-board";
import { Header } from "@/components/layout/header";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <Header title="Task Board" />
      <div className="p-4 md:p-8 pt-6">
        <TaskBoard />
      </div>
    </div>
  );
}
