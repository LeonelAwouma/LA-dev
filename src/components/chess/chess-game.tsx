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

export default function ChessGame() {
  const {
    gameState,
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
    if (currentPlayer.type === 'ai' && gameState === 'ongoing' && !isThinking) {
      const performAiMove = async () => {
        setIsThinking(true);
        try {
          const response = await suggestMoveWithAnalysis({ fen, difficulty: aiDifficulty });
          if (response.success && response.data) {
            makeMove(response.data.move);
          } else {
            console.error("AI move failed:", response.error);
          }
        } catch (error) {
          console.error("Error during AI move:", error);
        } finally {
          setIsThinking(false);
        }
      };
      performAiMove();
    }
  }, [fen, gameState, gameMode, aiDifficulty, isThinking, setIsThinking, makeMove, getCurrentPlayer]);


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
              <ChessBoard />
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
