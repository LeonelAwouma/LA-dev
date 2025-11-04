"use client";

import useGameStore from '@/lib/store/game-store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { difficulties, GameMode, Difficulty } from '@/types';
import { Users, Bot, RefreshCw, Play, Pause, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import AIDifficultySelector from './ai-difficulty-selector';


export function GameControls() {
  const {
    newGame,
    gameMode,
    setGameMode,
    playerColor,
    setPlayerColor,
    isThinking,
    isPaused,
    togglePause,
    gameState,
    setTimerDuration,
    timerDuration,
  } = useGameStore();

  const handleNewGame = () => {
    newGame();
  }
  
  const gameInProgress = gameState === 'ongoing';

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>New Game</CardTitle>
          <CardDescription>Select game mode and settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Game Mode</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={gameMode === 'pvp' ? 'secondary' : 'outline'}
                onClick={() => setGameMode('pvp')}
                disabled={gameInProgress}
                className={cn('h-16 flex-col', gameMode === 'pvp' && 'border-primary')}
              >
                <Users className="w-5 h-5 mb-1" />
                <span>Player vs Player</span>
              </Button>
              <Button
                variant={gameMode === 'pve' ? 'secondary' : 'outline'}
                onClick={() => setGameMode('pve')}
                disabled={gameInProgress}
                className={cn('h-16 flex-col', gameMode === 'pve' && 'border-primary')}
              >
                <Bot className="w-5 h-5 mb-1" />
                <span>Player vs AI</span>
              </Button>
            </div>
          </div>
          {gameMode === 'pve' && (
            <div className="space-y-2">
              <Label>Your Color</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={playerColor === 'w' ? 'secondary' : 'outline'}
                  className="flex-1"
                  onClick={() => setPlayerColor('w')}
                  disabled={gameInProgress}
                >
                  White
                </Button>
                <Button
                  variant={playerColor === 'b' ? 'secondary' : 'outline'}
                  className="flex-1"
                  onClick={() => setPlayerColor('b')}
                  disabled={gameInProgress}
                >
                  Black
                </Button>
              </div>
            </div>
          )}
          <Separator />
           <div className="space-y-2">
              <Label>Time Control</Label>
              <Select
                value={timerDuration === Infinity ? "0" : timerDuration.toString()}
                onValueChange={(value) => setTimerDuration(parseInt(value))}
                disabled={gameInProgress}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-muted-foreground" />
                    <SelectValue placeholder="Select time control" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="180">3 minutes</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                  <SelectItem value="600">10 minutes</SelectItem>
                  <SelectItem value="0">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          <Button onClick={handleNewGame} disabled={isThinking}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start New Game
          </Button>
        </CardContent>
      </Card>
      
      <AIDifficultySelector disabled={gameInProgress} />

      {gameInProgress && (
        <Card>
          <CardHeader>
            <CardTitle>Game Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2">
            <Button
              onClick={togglePause}
              disabled={gameState !== 'ongoing'}
              variant="outline"
            >
              {isPaused ? (
                <Play className="mr-2 h-4 w-4" />
              ) : (
                <Pause className="mr-2 h-4 w-4" />
              )}
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
