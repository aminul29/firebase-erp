import { TaskBoard } from "@/components/dashboard/task-board";
import { Header } from "@/components/layout/header";

export default function TasksPage() {
  return (
    <div className="flex-1 space-y-4">
      <Header title="Tasks" />
      <div className="p-4 md:p-8 pt-6">
        <TaskBoard />
      </div>
    </div>
  );
}
