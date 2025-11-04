"use client";

import useGameStore from '@/lib/store/game-store';
import { cn } from '@/lib/utils';
import { User, Bot, Timer } from 'lucide-react';
import { BlackKing, WhiteKing } from './pieces';
import { PlayerType } from '@/types';

interface PlayerInfoProps {
  playerType: PlayerType;
  color: 'white' | 'black';
}

function formatTime(seconds: number): string {
    if (seconds === Infinity) return '∞';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function PlayerInfo({ playerType, color }: PlayerInfoProps) {
  const { game, isThinking, timers } = useGameStore();
  const isTurn = (color === 'white' && game.turn() === 'w') || (color === 'black' && game.turn() === 'b');
  const currentPlayer = useGameStore.getState().getCurrentPlayer();
  const isPlayerThinking = isThinking && currentPlayer.color === color;

  const Icon = playerType === 'human' ? User : Bot;
  const PieceIcon = color === 'white' ? WhiteKing : BlackKing;
  const time = timers[color === 'white' ? 'w' : 'b'];


  return (
    <div className={cn(
      "flex items-center gap-3 p-2 rounded-lg transition-all w-full",
      isTurn ? "bg-card" : "opacity-70"
    )}>
      <div className="relative">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary">
          <PieceIcon className="w-8 h-8" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-background p-0.5 rounded-full ring-2 ring-background">
            <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      <div className='w-full'>
        <div className="flex justify-between items-baseline">
            <p className="font-semibold capitalize">{playerType === 'ai' ? `AI (${useGameStore.getState().aiDifficulty})` : 'You'}</p>
            <div className={cn("text-lg font-semibold tabular-nums", time < 60 && time > 0 && "text-destructive")}>
                {formatTime(time)}
            </div>
        </div>
        <p className={cn("text-xs text-muted-foreground capitalize", isPlayerThinking && "text-blue-500 animate-pulse")}>
          { isPlayerThinking ? 'Thinking...' : color }
        </p>
      </div>
    </div>
  );
}
