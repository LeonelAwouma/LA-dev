"use client";

import { useState, useMemo } from 'react';
import type { Square } from 'chess.js';
import { motion } from 'framer-motion';

import useGameStore from '@/lib/store/game-store';
import { cn } from '@/lib/utils';
import { Piece } from './piece';

const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export function ChessBoard() {
  const { fen, makeMove, getPiece, getLegalMoves, isPromotion, openPromotionDialog, lastMove, playerColor, getCurrentPlayer } = useGameStore();
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  const board = useMemo(() => {
    const boardState = fen.split(' ')[0];
    const rows = boardState.split('/');
    const boardLayout: (ReturnType<typeof getPiece> | null)[][] = [];

    rows.forEach(row => {
      const boardRow: (ReturnType<typeof getPiece> | null)[] = [];
      for (const char of row) {
        if (isNaN(parseInt(char))) {
          boardRow.push({ type: char.toLowerCase() as any, color: char === char.toUpperCase() ? 'w' : 'b' });
        } else {
          for (let i = 0; i < parseInt(char); i++) {
            boardRow.push(null);
          }
        }
      }
      boardLayout.push(boardRow);
    });
    return boardLayout;
  }, [fen]);
  
  const orientedRanks = playerColor === 'w' ? ranks : [...ranks].reverse();
  const orientedFiles = playerColor === 'w' ? files : [...files].reverse();
  
  const legalMovesForSelected = useMemo(() => {
    if (!selectedSquare) return new Set();
    return new Set(getLegalMoves(selectedSquare).map(move => move.to));
  }, [selectedSquare, getLegalMoves]);

  const handleSquareClick = (square: Square) => {
    if (getCurrentPlayer().type === 'ai') return;
    
    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        return;
      }
      
      const isLegalMove = getLegalMoves(selectedSquare).some(move => move.to === square);

      if (isLegalMove) {
        if (isPromotion({ from: selectedSquare, to: square })) {
          openPromotionDialog(selectedSquare, square);
        } else {
          makeMove({ from: selectedSquare, to: square });
        }
        setSelectedSquare(null);
      } else {
        const piece = getPiece(square);
        if (piece && piece.color === getCurrentPlayer().color) {
          setSelectedSquare(square);
        } else {
          setSelectedSquare(null);
        }
      }
    } else {
      const piece = getPiece(square);
      if (piece && piece.color === getCurrentPlayer().color) {
        setSelectedSquare(square);
      }
    }
  };

  return (
    <div className="relative aspect-square w-full max-w-[calc(100vh-12rem)] mx-auto shadow-2xl rounded-md overflow-hidden border-4 border-card">
      {orientedRanks.map((rank, rowIndex) => (
        <div key={rank} className="flex">
          {orientedFiles.map((file, colIndex) => {
            const square = `${file}${rank}` as Square;
            const piece = getPiece(square);
            const isLight = (rowIndex + colIndex) % 2 !== 0;
            const isSelected = selectedSquare === square;
            const isLegal = legalMovesForSelected.has(square);
            const isLastMove = lastMove?.from === square || lastMove?.to === square;

            return (
              <div
                key={square}
                onClick={() => handleSquareClick(square)}
                className={cn(
                  'relative flex h-[12.5%] w-[12.5%] items-center justify-center aspect-square cursor-pointer',
                  isLight ? 'bg-board-light-square' : 'bg-board-dark-square',
                  isSelected && 'bg-accent/70',
                  isLastMove && 'bg-accent/40'
                )}
              >
                {piece && <Piece piece={piece} />}
                {isLegal && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className={cn(
                      "rounded-full",
                      getPiece(square) ? 'w-full h-full border-8 border-accent/50' : 'w-1/3 h-1/3 bg-accent/50'
                    )}></div>
                  </motion.div>
                )}
                {(rowIndex === 7) && <span className={cn("absolute bottom-1 left-1 text-xs font-bold", isLight ? "text-board-dark-square" : "text-board-light-square")}>{file}</span>}
                {(colIndex === 0) && <span className={cn("absolute top-1 right-1 text-xs font-bold", isLight ? "text-board-dark-square" : "text-board-light-square")}>{rank}</span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
