"use client";

import { useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TIME_CONTROLS,
  TimeControl,
  TimeControlType,
} from "@/lib/time-controls";
import useGameStore from "@/lib/store/game-store";

interface TimeControlSelectorProps {
  gameStarted?: boolean;
}

export default function TimeControlSelector({
  gameStarted = false,
}: TimeControlSelectorProps) {
  const [open, setOpen] = useState(false);
  const { timeControl, setTimeControl } = useGameStore();

  const handleSelectTimeControl = (timeControl: TimeControl) => {
    setTimeControl(timeControl);
    setOpen(false);
  };

  // Grouper les contrôles par type
  const groupedControls: Record<TimeControlType, TimeControl[]> = {
    none: [],
    bullet: [],
    blitz: [],
    rapid: [],
    classical: [],
  };

  TIME_CONTROLS.forEach((control) => {
    groupedControls[control.type].push(control);
  });

  const typeLabels: Record<TimeControlType, string> = {
    none: "No Time",
    bullet: "Bullet",
    blitz: "Blitz",
    rapid: "Rapid",
    classical: "Classical",
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (gameStarted && isOpen) {
          return;
        }
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start"
          disabled={gameStarted}
          title={gameStarted ? "Cannot change time control during a game" : ""}
        >
          <Clock className="w-4 h-4 mr-2" />
          <span>
            Time Control: <span className="font-semibold">{timeControl.name}</span>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Select Time Control
          </DialogTitle>
          {gameStarted ? (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md mt-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <p className="text-sm text-amber-800">Cannot change time control during a game.</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">
              Currently:{" "}
              <span className="font-semibold">
                {timeControl.name}
              </span>
            </p>
          )}
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 py-4">
            {(Object.keys(groupedControls) as TimeControlType[]).map((type) => {
              const controls = groupedControls[type];
              if (controls.length === 0) return null;

              return (
                <div key={type} className="space-y-3">
                  <h3 className="text-lg font-semibold text-card-foreground border-b pb-2">
                    {typeLabels[type]}
                  </h3>
                  <div className="grid gap-2">
                    {controls.map((control, index) => {
                      const isSelected =
                        timeControl.name === control.name;

                      return (
                        <button
                          key={`${control.type}-${index}`}
                          onClick={() => handleSelectTimeControl(control)}
                          className={`text-left p-4 rounded-lg border-2 transition-all hover:border-primary/80 ${
                            isSelected
                              ? "border-primary bg-accent/50"
                              : "border-border hover:bg-accent/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-card-foreground">
                                {control.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {control.description}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
                                <svg
                                  className="w-4 h-4 text-primary-foreground"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
