
"use client";

import { useState, useEffect, RefObject } from "react";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullscreenButtonProps {
  boardRef?: RefObject<HTMLDivElement | null>;
}

export default function FullscreenButton({ boardRef }: FullscreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // If we have a board ref, make only that fullscreen
        if (boardRef?.current) {
          await boardRef.current.requestFullscreen();
        } else {
          // Otherwise, make the whole page fullscreen
          await document.documentElement.requestFullscreen();
        }
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  return (
    <Button
      onClick={toggleFullscreen}
      variant="outline"
      size="icon"
      title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
    >
      {isFullscreen ? (
        <Minimize className="w-4 h-4" />
      ) : (
        <Maximize className="w-4 h-4" />
      )}
    </Button>
  );
}
