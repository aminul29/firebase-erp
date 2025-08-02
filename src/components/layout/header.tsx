import { UserNav } from "@/components/layout/user-nav";
import { Notifications } from "@/components/layout/notifications";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur-sm">
      <div className="flex items-center h-16 px-4 md:px-8 border-b">
        <h1 className="text-2xl font-bold font-headline text-foreground">{title}</h1>
        <div className="ml-auto flex items-center space-x-4">
          <Notifications />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
