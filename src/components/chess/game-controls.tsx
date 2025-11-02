"use client";

import useGameStore from '@/lib/store/game-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { difficulties } from '@/types';
import type { GameMode, Difficulty } from '@/types';
import { Users, Bot, RefreshCw, Replace } from 'lucide-react';

export function GameControls() {
  const { newGame, gameMode, setGameMode, playerColor, setPlayerColor, aiDifficulty, setAiDifficulty, isThinking } = useGameStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={newGame} disabled={isThinking} className="w-full">
          <RefreshCw />
          New Game
        </Button>

        <div className="space-y-2">
          <Label>Game Mode</Label>
          <Select
            value={gameMode}
            onValueChange={(value) => setGameMode(value as GameMode)}
            disabled={isThinking}
          >
            <SelectTrigger>
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
            <div className="space-y-2">
              <Label>Your Color</Label>
              <div className="flex gap-2">
                  <Button variant={playerColor === 'w' ? 'secondary' : 'outline'} className="flex-1" onClick={() => setPlayerColor('w')} disabled={isThinking}>White</Button>
                  <Button variant={playerColor === 'b' ? 'secondary' : 'outline'} className="flex-1" onClick={() => setPlayerColor('b')} disabled={isThinking}>Black</Button>
              </div>
               <Button variant="outline" size="sm" onClick={() => setPlayerColor(playerColor === 'w' ? 'b' : 'w')} disabled={isThinking} className="w-full">
                <Replace /> Switch Sides
              </Button>
            </div>
            <div className="space-y-2">
              <Label>AI Difficulty</Label>
              <Select
                value={aiDifficulty.toString()}
                onValueChange={(value) => setAiDifficulty(parseInt(value) as Difficulty)}
                disabled={isThinking}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
