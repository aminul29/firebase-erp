
"use client";

import { useState } from 'react';
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { mockUser } from '@/lib/mock-data';
import { User } from '@/lib/types';

const GeneralSettings = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Update your company's information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="WebWizFlow Inc." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company-email">Company Email</Label>
                    <Input id="company-email" type="email" defaultValue="contact@webwizflow.com" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="company-address">Address</Label>
                    <Input id="company-address" defaultValue="123 Innovation Drive, Tech City" />
                </div>
                <Button>Save Changes</Button>
            </CardContent>
        </Card>
    )
}

const FinancialSettings = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Financial Settings</CardTitle>
                <CardDescription>Manage currency and fiscal year settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="USD">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USD">USD - United States Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                     <Select defaultValue="january">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="january">January</SelectItem>
                            <SelectItem value="april">April</SelectItem>
                            <SelectItem value="july">July</SelectItem>
                            <SelectItem value="october">October</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 <Button>Save Changes</Button>
            </CardContent>
        </Card>
    )
}

const NotificationSettings = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                            Receive emails for important events.
                        </p>
                    </div>
                    <Switch defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <Label>Project Updates</Label>
                        <p className="text-xs text-muted-foreground">
                           Get notified about progress in your projects.
                        </p>
                    </div>
                    <Switch defaultChecked/>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <Label>Task Assignments</Label>
                        <p className="text-xs text-muted-foreground">
                           Notify users when they are assigned a task.
                        </p>
                    </div>
                    <Switch />
                </div>
                <Button>Save Changes</Button>
            </CardContent>
        </Card>
    )
}

export default function SettingsPage() {
  const [currentUser] = useState<User>(mockUser);

  if (currentUser.role !== 'CEO') {
    return (
      <div className="flex-1 space-y-4">
        <Header title="Settings" />
        <div className="p-4 md:p-8 pt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You do not have permission to view this page.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4">
      <Header title="ERP Settings" />
      <div className="p-4 md:p-8 pt-6">
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="financial">
            <FinancialSettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
