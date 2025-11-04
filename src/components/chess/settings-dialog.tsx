"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import SoundControl from "./sound-control";

export default function SettingsDialog() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4">
            <SoundControl />
        </div>
      </DialogContent>
    </Dialog>
  );
}
