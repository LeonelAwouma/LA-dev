"use client";

import useGameStore from '@/lib/store/game-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { WhiteQueen, WhiteRook, WhiteBishop, WhiteKnight, BlackQueen, BlackRook, BlackBishop, BlackKnight } from './pieces';
import { cn } from '@/lib/utils';

const promotionPieces = {
  w: { q: WhiteQueen, r: WhiteRook, b: WhiteBishop, n: WhiteKnight },
  b: { q: BlackQueen, r: BlackRook, b: BlackBishop, n: BlackKnight },
};

export function PromotionDialog() {
  const { promotionDialogOpen, closePromotionDialog, handlePromotion, game } = useGameStore();
  const turn = game.turn();
  const pieces = promotionPieces[turn];

  const onSelect = (piece: 'q' | 'r' | 'b' | 'n') => {
    handlePromotion(piece);
    closePromotionDialog();
  };

  return (
    <Dialog open={promotionDialogOpen} onOpenChange={closePromotionDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Promote Pawn</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          {Object.entries(pieces).map(([key, PieceComponent]) => (
            <Button
              key={key}
              variant="outline"
              className="h-20 w-20 p-2"
              onClick={() => onSelect(key as 'q' | 'r' | 'b' | 'n')}
            >
              <PieceComponent className="w-full h-full" />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
