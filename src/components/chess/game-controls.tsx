"use client";

import useGameStore from '@/lib/store/game-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { difficulties } from '@/types';
import type { GameMode, Difficulty } from '@/types';
import { Users, Bot, RefreshCw, Replace, Play, Pause } from 'lucide-react';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '../ui/sidebar';

export function GameControls() {
  const { newGame, gameMode, setGameMode, playerColor, setPlayerColor, aiDifficulty, setAiDifficulty, isThinking, isPaused, togglePause, gameState } = useGameStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Game Controls</SidebarGroupLabel>
      <SidebarGroupContent className="grid grid-cols-1 gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={newGame} disabled={isThinking} size="sm">
            <RefreshCw />
            New Game
          </Button>
          <Button onClick={togglePause} disabled={isThinking || gameState !== 'ongoing'} variant="outline" size="sm">
            {isPaused ? <Play /> : <Pause />}
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </div>

        <div className="space-y-1">
          <Label className="text-xs px-1">Game Mode</Label>
          <Select
            value={gameMode}
            onValueChange={(value) => setGameMode(value as GameMode)}
            disabled={isThinking || isPaused}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pve"><Bot className="inline-block mr-2 h-4 w-4" />Player vs AI</SelectItem>
              <SelectItem value="pvp"><Users className="inline-block mr-2 h-4 w-4" />Player vs Player</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {gameMode === 'pve' && (
          <>
            <div className="space-y-1">
              <Label className="text-xs px-1">Your Color</Label>
              <div className="grid grid-cols-2 gap-2">
                  <Button variant={playerColor === 'w' ? 'secondary' : 'outline'} size="sm" className="flex-1" onClick={() => setPlayerColor('w')} disabled={isThinking || isPaused}>White</Button>
                  <Button variant={playerColor === 'b' ? 'secondary' : 'outline'} size="sm" className="flex-1" onClick={() => setPlayerColor('b')} disabled={isThinking || isPaused}>Black</Button>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs px-1">AI Difficulty</Label>
              <Select
                value={aiDifficulty.toString()}
                onValueChange={(value) => setAiDifficulty(parseInt(value) as Difficulty)}
                disabled={isThinking || isPaused}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(level => (
                    <SelectItem key={level} value={level.toString()}>
                      Elo {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
