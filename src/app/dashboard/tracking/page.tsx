import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function TimeTrackingPage() {
  return (
    <div className="flex-1 space-y-4">
      <Header title="Time Tracking" />
      <div className="p-4 md:p-8 pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Time Tracking</CardTitle>
            <CardDescription>
              This section is under development. Track time spent on tasks and projects here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <Clock className="w-16 h-16 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Time tracking feature coming soon!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
