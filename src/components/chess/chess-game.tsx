"use client";

import { useEffect } from 'react';
import useGameStore from '@/lib/store/game-store';
import { suggestMoveWithAnalysis } from '@/lib/actions';

import { ChessBoard } from './chess-board';
import { GameControls } from './game-controls';
import { MoveHistory } from './move-history';
import { PlayerInfo } from './player-info';
import { GameOverDialog } from './game-over-dialog';
import { PromotionDialog } from './promotion-dialog';
import { ThemeGenerator } from './theme-generator';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
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
    history
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
            // Fallback for failed AI move generation
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
      // Add a small delay to make the AI's move feel more natural
      const timeoutId = setTimeout(performAiMove, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [fen, gameState, gameMode, aiDifficulty, isThinking, setIsThinking, makeMove, getCurrentPlayer, isPaused]);


  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-2 md:p-4">
              <div className="flex justify-between items-center mb-2 px-2">
                <PlayerInfo playerType={gameMode === 'pve' ? (useGameStore.getState().playerColor === 'b' ? 'ai' : 'human') : 'human'} color="black" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{gameState !== 'ongoing' ? 'Game Over' : `${useGameStore.getState().game.turn() === 'w' ? "White" : "Black"}'s turn`}</p>
                   {isThinking && <p className="text-xs text-accent animate-pulse">AI is thinking...</p>}
                </div>
                <PlayerInfo playerType={gameMode === 'pve' ? (useGameStore.getState().playerColor === 'w' ? 'human' : 'ai') : 'human'} color="white" />
              </div>
              <div className="relative">
                <ChessBoard />
                {isPaused && (
                  <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-4 z-10">
                    <Pause className="w-16 h-16 text-foreground" />
                    <h2 className="text-2xl font-bold text-foreground">Game Paused</h2>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <GameControls />
          <MoveHistory />
          <ThemeGenerator />
        </div>
      </div>
      <GameOverDialog />
      <PromotionDialog />
    </div>
  );
}
