import type { Chess, Piece as ChessJSPiece, Square, Move as ChessJSMove } from 'chess.js';

export type Piece = ChessJSPiece;
export type { Square };

export type PieceStyle = 'classic' | 'modern' | 'colorful';

export type GameState = 'ongoing' | 'checkmate' | 'stalemate' | 'draw_repetition' | 'draw_insufficient' | 'draw_50move';

export type Move = ChessJSMove;

export type GameMode = 'pvp' | 'pve';

export type PlayerType = 'human' | 'ai';

export type Player = {
  type: PlayerType;
  color: 'w' | 'b';
};

export const difficulties = [400, 800, 1200, 1600, 2000, 2500] as const;
export type Difficulty = typeof difficulties[number];

export interface GameStore {
  game: Chess;
  fen: string;
  history: Move[];
  gameState: GameState;
  isPaused: boolean;
  gameMode: GameMode;
  playerColor: 'w' | 'b';
  aiDifficulty: Difficulty;
  isThinking: boolean;
  pieceStyle: PieceStyle;
  lastMove: { from: Square; to: Square } | null;
  promotionDialogOpen: boolean;
  promotionMove: { from: Square; to: Square } | null;

  setGameMode: (mode: GameMode) => void;
  setPlayerColor: (color: 'w' | 'b') => void;
  setAiDifficulty: (difficulty: Difficulty) => void;
  setPieceStyle: (style: PieceStyle) => void;
  setIsThinking: (isThinking: boolean) => void;
  togglePause: () => void;
  
  newGame: () => void;
  makeMove: (move: string | { from: Square, to: Square, promotion?: string }) => Move | null;
  getGameState: (game: Chess) => GameState;
  getLegalMoves: (square: Square) => ChessJSMove[];
  getPiece: (square: Square) => Piece | null;
  isPromotion: (move: { from: Square; to: Square }) => boolean;
  openPromotionDialog: (from: Square, to: Square) => void;
  closePromotionDialog: () => void;
  handlePromotion: (promotionPiece: 'q' | 'r' | 'b' | 'n') => void;
  getCurrentPlayer: () => Player;
}
