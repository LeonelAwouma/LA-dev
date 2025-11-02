"use client";

import type { Piece as PieceType } from '@/types';
import { BlackBishop, BlackKing, BlackKnight, BlackPawn, BlackQueen, BlackRook, WhiteBishop, WhiteKing, WhiteKnight, WhitePawn, WhiteQueen, WhiteRook } from './pieces';

const pieceMap = {
  w: { p: WhitePawn, r: WhiteRook, n: WhiteKnight, b: WhiteBishop, q: WhiteQueen, k: WhiteKing },
  b: { p: BlackPawn, r: BlackRook, n: BlackKnight, b: BlackBishop, q: BlackQueen, k: BlackKing },
};

interface PieceProps {
  piece: PieceType;
}

export function Piece({ piece }: PieceProps) {
  const PieceComponent = pieceMap[piece.color][piece.type];
  
  if (!PieceComponent) return null;

  return (
    <div className="w-full h-full p-1 drop-shadow-lg">
      <PieceComponent className="w-full h-full" />
    </div>
  );
}
