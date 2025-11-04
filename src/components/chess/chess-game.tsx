"use client";

import { useEffect } from 'react';
import useGameStore from '@/lib/store/game-store';
import { suggestMoveWithAnalysis } from '@/ai/flows/suggest-move-with-analysis';

import { ChessBoard } from './chess-board';
import { PlayerInfo } from './player-info';
import { GameOverDialog } from './game-over-dialog';
import { PromotionDialog } from './promotion-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Pause } from 'lucide-react';

export default function ChessGame() {
  const {
    gameState,
    isPaused,
    gameMode,
    isThinking,
    setIsThinking,
    makeMove,
    fen,
    aiDifficulty,
    getCurrentPlayer,
    tick,
    timers,
    game,
  } = useGameStore();

  useEffect(() => {
    const currentPlayer = getCurrentPlayer();
    if (currentPlayer.type === 'ai' && gameState === 'ongoing' && !isThinking && !isPaused) {
      const performAiMove = async () => {
        setIsThinking(true);
        try {
          const response = await suggestMoveWithAnalysis({ fen, difficulty: aiDifficulty });
          makeMove(response.move);
        } catch (error) {
          console.error("Error during AI move:", error);
           const game = useGameStore.getState().game;
           const moves = game.moves();
           if (moves.length > 0) {
             const randomMove = moves[Math.floor(Math.random() * moves.length)];
             makeMove(randomMove);
           }
        } finally {
          setIsThinking(false);
        }
      };
      const timeoutId = setTimeout(performAiMove, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [fen, gameState, gameMode, aiDifficulty, isThinking, setIsThinking, makeMove, getCurrentPlayer, isPaused]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (gameState === 'ongoing' && !isPaused) {
      timerId = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [gameState, isPaused, tick]);

  const turn = game.turn();

  return (
    <div className="w-full mx-auto flex flex-col items-center gap-4">
        <div className="flex justify-between items-center w-full">
            <PlayerInfo playerType={gameMode === 'pve' ? (useGameStore.getState().playerColor === 'b' ? 'ai' : 'human') : 'human'} color="black" />
             <div className="text-center">
                <p className="text-lg font-semibold">{gameState !== 'ongoing' ? 'Game Over' : `${turn === 'w' ? "White" : "Black"}'s turn`}</p>
                {isThinking && <p className="text-sm text-blue-500 animate-pulse">AI is thinking...</p>}
            </div>
            <PlayerInfo playerType={gameMode === 'pve' ? (useGameStore.getState().playerColor === 'w' ? 'human' : 'ai') : 'human'} color="white" />
        </div>
      
        <div className="relative w-full">
            <ChessBoard />
            {isPaused && (
              <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-4 z-10 rounded-md">
                <Pause className="w-16 h-16 text-foreground" />
                <h2 className="text-2xl font-bold text-foreground">Game Paused</h2>
              </div>
            )}
        </div>
      
      <GameOverDialog />
      <PromotionDialog />
    </div>
  );
}
