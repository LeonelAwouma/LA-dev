import { create } from 'zustand';
import { Chess, Piece, Square } from 'chess.js';
import type { GameState, GameStore, Move, PieceStyle, GameMode, Player, Difficulty } from '@/types';

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const useGameStore = create<GameStore>((set, get) => ({
  game: new Chess(),
  fen: INITIAL_FEN,
  history: [],
  gameState: 'ongoing',
  isPaused: false,
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
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  newGame: () => {
    const newGame = new Chess();
    set({
      game: newGame,
      fen: newGame.fen(),
      history: [],
      gameState: 'ongoing',
      isPaused: false,
      lastMove: null,
      promotionDialogOpen: false,
    });
  },

  makeMove: (move: string | { from: Square; to: Square; promotion?: string }) => {
    const game = get().game;
    
    // Validate the move before making it
    const legalMoves = game.moves({ verbose: true });
    const isMoveLegal = legalMoves.some(legalMove => {
      if (typeof move === 'string') {
        // This handles both SAN ("Nf3") and UCI ("g1f3")
        return legalMove.san === move || `${legalMove.from}${legalMove.to}` === move;
      }
      // This handles the object notation for moves
      return legalMove.from === move.from && legalMove.to === move.to;
    });

    if (!isMoveLegal) {
        console.warn("Illegal move attempted:", move);
        // This specific check is to handle cases where chess.js doesn't automatically detect pawn promotions
        // in its standard .moves() output, requiring us to manage the promotion UI flow.
        if (typeof move !== 'string' && get().isPromotion(move)) {
            get().openPromotionDialog(move.from, move.to);
        }
        return null;
    }
    
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
    }
    return result;
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
    const promotionRank = piece.color === 'w' ? '8' : '1';
    const startRank = piece.color === 'w' ? '7' : '2';

    if (move.from[1] === startRank && move.to[1] === promotionRank) {
       // Also check if the move is generally legal (ignoring promotion piece)
       const legalMoves = get().game.moves({square: move.from, verbose: true});
       return legalMoves.some(m => m.to === move.to);
    }
    return false;
  },

  openPromotionDialog: (from: Square, to: Square) => {
    set({ promotionDialogOpen: true, promotionMove: { from, to } });
  },

  closePromotionDialog: () => {
    set({ promotionDialogOpen: false, promotionMove: null });
  },

  handlePromotion: (promotionPiece: 'q' | 'r' | 'b' | 'n') => {
    const { promotionMove, makeMove } = get();
    if (promotionMove) {
      makeMove({ ...promotionMove, promotion: promotionPiece });
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
