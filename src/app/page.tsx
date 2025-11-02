import ChessGame from '@/components/chess/chess-game';
import { AppLogo } from '@/components/icons';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 md:p-8">
      <div className="flex items-center gap-4 mb-4 md:mb-8">
        <AppLogo className="h-10 w-10 md:h-12 md:w-12 text-accent" />
        <h1 className="font-headline text-3xl md:text-5xl font-bold text-center text-foreground">
          Stockfish Champion
        </h1>
      </div>
      <ChessGame />
    </main>
  );
}
