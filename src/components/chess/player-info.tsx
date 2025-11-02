"use client";

import useGameStore from '@/lib/store/game-store';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';
import { BlackKing, WhiteKing } from './pieces';
import { PlayerType } from '@/types';

interface PlayerInfoProps {
  playerType: PlayerType;
  color: 'white' | 'black';
}

export function PlayerInfo({ playerType, color }: PlayerInfoProps) {
  const { game } = useGameStore();
  const isTurn = (color === 'white' && game.turn() === 'w') || (color === 'black' && game.turn() === 'b');

  const Icon = playerType === 'human' ? User : Bot;
  const PieceIcon = color === 'white' ? WhiteKing : BlackKing;

  return (
    <div className={cn(
      "flex items-center gap-3 p-2 rounded-lg transition-all",
      isTurn ? "bg-accent/20" : ""
    )}>
      <div className="relative">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-card">
          <PieceIcon className="w-8 h-8" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-background p-0.5 rounded-full">
            <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      <div>
        <p className="font-semibold capitalize">{color}</p>
        <p className="text-xs text-muted-foreground capitalize">{playerType}</p>
      </div>
    </div>
  );
}
