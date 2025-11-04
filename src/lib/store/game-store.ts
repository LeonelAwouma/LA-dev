import { create } from 'zustand';
import { Chess, Piece, Square } from 'chess.js';
import type { GameState, GameStore, Move, PieceStyle, GameMode, Player, Difficulty, Theme } from '@/types';
import { soundManager } from '@/lib/chess-sounds';

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const DEFAULT_TIMER_DURATION = 300; // 5 minutes

const pieceValues: { [key: string]: number } = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };


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
  timerDuration: DEFAULT_TIMER_DURATION,
  timers: { w: DEFAULT_TIMER_DURATION, b: DEFAULT_TIMER_DURATION },
  theme: 'theme-default',
  soundEnabled: true,
  soundVolume: 0.5,

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
  setTimerDuration: (duration: number) => {
     const newDuration = duration === 0 ? Infinity : duration;
    set({ timerDuration: newDuration, timers: { w: newDuration, b: newDuration } });
    get().newGame();
  },
  setTheme: (theme: Theme) => set({ theme }),
  setSoundEnabled: (enabled: boolean) => {
    set({ soundEnabled: enabled });
    soundManager.toggleMute();
  },
  setSoundVolume: (volume: number) => {
    set({ soundVolume: volume });
    soundManager.setVolume(volume);
  },

  newGame: () => {
    const newGame = new Chess();
    const duration = get().timerDuration;
    soundManager.play('new-game');
    set({
      game: newGame,
      fen: newGame.fen(),
      history: [],
      gameState: 'ongoing',
      isPaused: false,
      lastMove: null,
      promotionDialogOpen: false,
      timers: { w: duration, b: duration },
    });
  },

  makeMove: (move: string | { from: Square; to: Square; promotion?: string }) => {
    const game = get().game;
    
    const legalMoves = game.moves({ verbose: true });
    const isMoveLegal = legalMoves.some(legalMove => {
      if (typeof move === 'string') {
        return legalMove.san === move || `${legalMove.from}${legalMove.to}` === move;
      }
      return legalMove.from === move.from && legalMove.to === move.to;
    });

    if (!isMoveLegal) {
        console.warn("Illegal move attempted:", move);
        if (typeof move !== 'string' && get().isPromotion(move)) {
            get().openPromotionDialog(move.from, move.to);
        }
        return null;
    }
    
    const result = game.move(move);
    
    if (result) {
        const newGameState = get().getGameState(game);
        set({
            fen: game.fen(),
            history: game.history({ verbose: true }) as Move[],
            gameState: newGameState,
            lastMove: { from: result.from, to: result.to },
            promotionDialogOpen: false,
            promotionMove: null,
        });

        if (get().soundEnabled) {
            if (newGameState === 'checkmate') {
                setTimeout(() => soundManager.play('victory'), 300);
            } else if (result.san.includes('+')) {
                soundManager.play('check');
            } else if (result.captured) {
                soundManager.play('capture');
            } else {
                soundManager.play('move');
            }
        }
    }
    return result;
  },
  
  tick: () => {
    if (get().timerDuration === Infinity) return;
    
    set((state) => {
        if (state.isPaused || state.gameState !== 'ongoing') return {};
        
        const turn = state.game.turn();
        const newTime = state.timers[turn] - 1;

        if (newTime <= 0) {
            return {
                timers: { ...state.timers, [turn]: 0 },
                gameState: 'timeout',
            };
        }
        return { timers: { ...state.timers, [turn]: newTime } };
    });
  },

  getGameState: (game: Chess): GameState => {
    if (game.isCheckmate()) return 'checkmate';
    if (game.isStalemate()) return 'stalemate';
    if (game.isThreefoldRepetition()) return 'draw_repetition';
    if (game.isInsufficientMaterial()) return 'draw_insufficient';
    if (game.isDraw()) return 'draw_50move';
    return 'ongoing';
  },
  
  getMaterialAdvantage: () => {
    const game = get().game;
    const board = game.board();
    let advantage = 0;
    board.forEach(row => {
        row.forEach(square => {
            if (square) {
                const value = pieceValues[square.type];
                advantage += square.color === 'w' ? value : -value;
            }
        });
    });
    return advantage;
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
