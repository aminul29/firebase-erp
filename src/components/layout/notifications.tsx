"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import { mockNotifications } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

export function Notifications() {
  const router = useRouter();

  const handleNotificationClick = (link: string) => {
    router.push(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {mockNotifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            onClick={() => handleNotificationClick(notification.link)}
            className={!notification.read ? "font-bold" : ""}
          >
            {notification.message}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
