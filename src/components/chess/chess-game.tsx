"use client";

import { useEffect } from 'react';
import useGameStore from '@/lib/store/game-store';
import { suggestMoveWithAnalysis } from '@/lib/actions';

import { ChessBoard } from './chess-board';
import { PlayerInfo } from './player-info';
import { GameOverDialog } from './game-over-dialog';
import { PromotionDialog } from './promotion-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Pause } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';

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
  } = useGameStore();

  useEffect(() => {
    const currentPlayer = getCurrentPlayer();
    if (currentPlayer.type === 'ai' && gameState === 'ongoing' && !isThinking && !isPaused) {
      const performAiMove = async () => {
        setIsThinking(true);
        try {
          const response = await suggestMoveWithAnalysis({ fen, difficulty: aiDifficulty });
          if (response.success && response.data) {
            makeMove(response.data.move);
          } else {
            console.error("AI move failed:", response.error);
            const game = useGameStore.getState().game;
            const moves = game.moves();
            if (moves.length > 0) {
              const randomMove = moves[Math.floor(Math.random() * moves.length)];
              makeMove(randomMove);
            }
          }
        } catch (error) {
          console.error("Error during AI move:", error);
        } finally {
          setIsThinking(false);
        }
      };
      const timeoutId = setTimeout(performAiMove, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [fen, gameState, gameMode, aiDifficulty, isThinking, setIsThinking, makeMove, getCurrentPlayer, isPaused]);


  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="hidden md:flex justify-between items-center w-full">
            <PlayerInfo playerType={gameMode === 'pve' ? (useGameStore.getState().playerColor === 'b' ? 'ai' : 'human') : 'human'} color="black" />
            <div className="text-center">
                <p className="text-lg font-semibold">{gameState !== 'ongoing' ? 'Game Over' : `${useGameStore.getState().game.turn() === 'w' ? "White" : "Black"}'s turn`}</p>
                {isThinking && <p className="text-sm text-accent animate-pulse">AI is thinking...</p>}
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
      
        <div className="md:hidden flex justify-between items-center w-full">
            <PlayerInfo playerType={gameMode === 'pve' ? (useGameStore.getState().playerColor === 'b' ? 'ai' : 'human') : 'human'} color="black" />
            <div className="text-center">
                <p className="text-lg font-semibold">{gameState !== 'ongoing' ? 'Game Over' : `${useGameStore.getState().game.turn() === 'w' ? "White" : "Black"}'s turn`}</p>
                {isThinking && <p className="text-sm text-accent animate-pulse">AI is thinking...</p>}
            </div>
            <PlayerInfo playerType={gameMode === 'pve' ? (useGameStore.getState().playerColor === 'w' ? 'human' : 'ai') : 'human'} color="white" />
        </div>

      <GameOverDialog />
      <PromotionDialog />
    </div>
  );
}
