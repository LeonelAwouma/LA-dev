import { create } from 'zustand';
import { Chess, Piece, Square } from 'chess.js';
import type { GameState, GameStore, Move, PieceStyle, GameMode, Player, Difficulty } from '@/types';

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const useGameStore = create<GameStore>((set, get) => ({
  game: new Chess(),
  fen: INITIAL_FEN,
  history: [],
  gameState: 'ongoing',
  gameMode: 'pve',
  playerColor: 'w',
  aiDifficulty: 800,
  isThinking: false,
  pieceStyle: 'classic',
  lastMove: null,
  promotionDialogOpen: false,
  promotionMove: null,

  setGameMode: (mode: GameMode) => {
    set({ gameMode: mode });
    get().newGame();
  },

  setPlayerColor: (color: 'w' | 'b') => {
    set({ playerColor: color });
    get().newGame();
  },

  setAiDifficulty: (difficulty: Difficulty) => set({ aiDifficulty: difficulty }),
  setPieceStyle: (style: PieceStyle) => set({ pieceStyle: style }),
  setIsThinking: (isThinking: boolean) => set({ isThinking }),

  newGame: () => {
    const newGame = new Chess();
    set({
      game: newGame,
      fen: newGame.fen(),
      history: [],
      gameState: 'ongoing',
      lastMove: null,
      promotionDialogOpen: false,
    });
  },

  makeMove: (move: string | { from: Square; to: Square; promotion?: string }) => {
    const game = get().game;
    const currentFen = game.fen();
    
    try {
      const result = game.move(move);
      if (result) {
        set({
          fen: game.fen(),
          history: game.history({ verbose: true }) as Move[],
          gameState: get().getGameState(game),
          lastMove: { from: result.from, to: result.to },
          promotionDialogOpen: false,
          promotionMove: null,
        });
        return result;
      }
    } catch (error) {
      console.warn("Invalid move attempted:", move);
      game.load(currentFen); // Revert to previous state
      set({ fen: currentFen }); // Ensure store is in sync
    }
    return null;
  },

  getGameState: (game: Chess): GameState => {
    if (game.isCheckmate()) return 'checkmate';
    if (game.isStalemate()) return 'stalemate';
    if (game.isThreefoldRepetition()) return 'draw_repetition';
    if (game.isInsufficientMaterial()) return 'draw_insufficient';
    if (game.isDraw()) return 'draw_50move';
    return 'ongoing';
  },

  getLegalMoves: (square: Square) => {
    return get().game.moves({ square, verbose: true });
  },

  getPiece: (square: Square): Piece | null => {
    return get().game.get(square);
  },

  isPromotion: (move: { from: Square, to: Square }): boolean => {
    const piece = get().game.get(move.from);
    if (!piece) return false;
    if (piece.type !== 'p') return false;
    if (piece.color === 'w' && move.from[1] === '7' && move.to[1] === '8') return true;
    if (piece.color === 'b' && move.from[1] === '2' && move.to[1] === '1') return true;
    return false;
  },

  openPromotionDialog: (from: Square, to: Square) => {
    set({ promotionDialogOpen: true, promotionMove: { from, to } });
  },

  closePromotionDialog: () => {
    set({ promotionDialogOpen: false, promotionMove: null });
  },

  handlePromotion: (promotionPiece: 'q' | 'r' | 'b' | 'n') => {
    const { promotionMove } = get();
    if (promotionMove) {
      get().makeMove({ ...promotionMove, promotion: promotionPiece });
    }
  },

  getCurrentPlayer: (): Player => {
    const turn = get().game.turn();
    const { gameMode, playerColor } = get();

    if (gameMode === 'pvp') {
      return turn === 'w' ? { type: 'human', color: 'w' } : { type: 'human', color: 'b' };
    } else { // pve
      return playerColor === turn ? { type: 'human', color: playerColor } : { type: 'ai', color: turn };
    }
  },
}));

export default useGameStore;
