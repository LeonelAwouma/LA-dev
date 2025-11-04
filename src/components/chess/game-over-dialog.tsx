"use client";

import useGameStore from '@/lib/store/game-store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trophy, Users, Timer } from 'lucide-react';

export function GameOverDialog() {
  const { gameState, newGame, game, getMaterialAdvantage } = useGameStore();
  const isOpen = gameState !== 'ongoing' && gameState !== 'stopped';

  const getTitleAndDescription = () => {
    const turn = game.turn();
    const winner = turn === 'b' ? 'White' : 'Black';
    switch (gameState) {
      case 'checkmate':
        return {
          title: 'Checkmate!',
          description: `${winner} wins by checkmate.`,
          Icon: Trophy,
        };
       case 'timeout':
        const advantage = getMaterialAdvantage();
        const timeoutWinner = advantage > 0 ? 'White' : advantage < 0 ? 'Black' : null;
        if (timeoutWinner) {
          return {
            title: 'Timeout!',
            description: `${winner} ran out of time. ${timeoutWinner} wins on material advantage (${Math.abs(advantage)}).`,
            Icon: Trophy,
          };
        }
        return {
            title: 'Timeout!',
            description: `${winner} ran out of time. The game is a draw.`,
            Icon: Users,
        }
      case 'stalemate':
        return {
          title: 'Stalemate!',
          description: 'The game is a draw by stalemate.',
          Icon: Users,
        };
      case 'draw_repetition':
        return {
          title: 'Draw!',
          description: 'The game is a draw by threefold repetition.',
          Icon: Users,
        };
      case 'draw_insufficient':
        return {
          title: 'Draw!',
          description: 'The game is a draw due to insufficient material.',
          Icon: Users,
        };
      case 'draw_50move':
        return {
          title: 'Draw!',
          description: 'The game is a draw by the 50-move rule.',
          Icon: Users,
        };
      default:
        return { title: '', description: '', Icon: Users };
    }
  };
  
  const { title, description, Icon } = getTitleAndDescription();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4">
              <Icon className="w-8 h-8 text-blue-500"/>
          </div>
          <AlertDialogTitle className="text-center text-2xl font-headline">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={newGame} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Play Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
