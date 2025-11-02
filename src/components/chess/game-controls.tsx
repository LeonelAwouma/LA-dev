"use client";

import useGameStore from '@/lib/store/game-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { difficulties } from '@/types';
import type { GameMode, Difficulty } from '@/types';
import { Users, Bot, RefreshCw, Play, Pause, Palette, Puzzle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GameControls() {
  const { newGame, gameMode, setGameMode, playerColor, setPlayerColor, aiDifficulty, setAiDifficulty, isThinking, isPaused, togglePause, gameState } = useGameStore();

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Game Mode</CardTitle>
          <CardDescription>Choose your game mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={gameMode === 'pvp' ? 'secondary' : 'outline'} 
              onClick={() => setGameMode('pvp')}
              disabled={isThinking || isPaused}
              className={cn("flex-col h-20", gameMode === 'pvp' && 'border-blue-500 border-2')}
            >
              <Users className="w-6 h-6 mb-1" />
              <span className="font-semibold">Player vs Player</span>
              <span className="text-xs text-muted-foreground">Local two-player game</span>
            </Button>
            <Button 
              variant={gameMode === 'pve' ? 'secondary' : 'outline'} 
              onClick={() => setGameMode('pve')}
              disabled={isThinking || isPaused}
              className={cn("flex-col h-20", gameMode === 'pve' && 'border-blue-500 border-2')}
            >
              <Bot className="w-6 h-6 mb-1" />
              <span className="font-semibold">Player vs AI</span>
              <span className="text-xs text-muted-foreground">Play against the computer</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {gameMode === 'pve' && (
        <Card>
          <CardHeader>
            <CardTitle>AI Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-2 block">Your Color</Label>
              <div className="grid grid-cols-2 gap-2">
                  <Button variant={playerColor === 'w' ? 'secondary' : 'outline'} className="flex-1" onClick={() => setPlayerColor('w')} disabled={isThinking || isPaused}>White</Button>
                  <Button variant={playerColor === 'b' ? 'secondary' : 'outline'} className="flex-1" onClick={() => setPlayerColor('b')} disabled={isThinking || isPaused}>Black</Button>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">AI Difficulty</Label>
              <Select
                value={aiDifficulty.toString()}
                onValueChange={(value) => setAiDifficulty(parseInt(value) as Difficulty)}
                disabled={isThinking || isPaused}
              >
                <SelectTrigger>
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
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Game Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
           <Button onClick={newGame} disabled={isThinking}>
            <RefreshCw className="mr-2 h-4 w-4" />
            New Game
          </Button>
          <Button onClick={togglePause} disabled={isThinking || gameState !== 'ongoing'} variant="outline">
            {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </CardContent>
      </Card>
      
    </div>
  );
}
