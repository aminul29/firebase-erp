"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockUser } from "@/lib/mock-data";
import { User, Employee } from "@/lib/types";

export default function ProfilePage() {
  const { toast } = useToast();
  const [user, setUser] = useState<User>(mockUser);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [newRole, setNewRole] = useState<Employee["role"]>(user.role);

  const handleProfileUpdate = () => {
    // In a real app, you would make an API call here.
    setUser({ ...user, name, email });
    toast({
      title: "Success",
      description: "Your profile has been updated.",
    });
  };

  const handlePasswordChange = () => {
    // In a real app, you would make an API call here.
    toast({
      title: "Success",
      description: "Your password has been changed.",
    });
  };

  const handleRoleChangeRequest = () => {
    // In a real app, this would trigger an approval flow.
    toast({
      title: "Request Sent",
      description: `Role change to ${newRole} has been requested for approval.`,
    });
  };

  return (
    <div className="flex-1 space-y-4">
      <Header title="My Profile" />
      <div className="p-4 md:p-8 pt-6 space-y-4">
        {/* Profile Picture Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
            <Input type="file" className="max-w-xs" />
            <Button>Upload</Button>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleProfileUpdate}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-password" cla ssName="text-right">
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-password" cla ssName="text-right">
                New Password
              </Label>
              <Input id="new-password" type="password" className="col-span-3" />
            </div>
            <div className="flex justify-end">
              <Button onClick={handlePasswordChange}>Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Role Management Card */}
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Current Role</Label>
              <p className="col-span-3 font-medium">{user.role}</p>
            </div>
            {user.role !== "CEO" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Request New Role
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewRole(value as Employee["role"])
                    }
                    defaultValue={newRole}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a new role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Teammate">Teammate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleRoleChangeRequest}>
                    Request Change
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
