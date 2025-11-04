"use client";

import { useState, useEffect } from "react";
import { soundManager } from "@/lib/chess-sounds";
import { Volume1, Volume2, VolumeX } from "lucide-react";

export default function SoundControl() {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    // Initialize state from the sound manager
    setIsMuted(soundManager.getIsMuted());
    setVolume(soundManager.getVolume());
  }, []);

  const handleToggleMute = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundManager.setVolume(newVolume);
    if (isMuted && newVolume > 0) {
        setIsMuted(soundManager.toggleMute());
    }
  };
  
  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;


  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Sound</label>
            <button
                onClick={handleToggleMute}
                className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm bg-secondary hover:bg-muted text-secondary-foreground rounded-lg transition-colors"
                >
                {isMuted ? 'Enable' : 'Disable'}
            </button>
        </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="volume"
            className="text-sm font-medium"
          >
            Volume
          </label>
          <span className="text-sm text-muted-foreground">
            {Math.round(volume * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
            <VolumeIcon className="w-5 h-5 text-muted-foreground" onClick={handleToggleMute}/>
            <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                style={{
                background: isMuted
                    ? undefined
                    : `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                        volume * 100
                    }%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`,
                }}
            />
        </div>
      </div>
    </div>
  );
}
