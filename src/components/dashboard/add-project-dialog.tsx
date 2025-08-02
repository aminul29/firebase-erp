
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client, Project } from "@/lib/types";
import { Textarea } from "../ui/textarea";

type AddProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Omit<Project, 'id' | 'status'>) => void;
  clients: Client[];
};

export function AddProjectDialog({ isOpen, onClose, onAddProject, clients }: AddProjectDialogProps) {
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState<string>("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = () => {
    if (name && clientId && deadline) {
      onAddProject({ name, clientId, deadline });
      onClose();
      // Reset fields
      setName('');
      setClientId('');
      setDeadline('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="e.g. E-commerce Website"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="client" className="text-right">
              Client
            </Label>
            <Select onValueChange={setClientId} value={clientId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">
              Deadline
            </Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
