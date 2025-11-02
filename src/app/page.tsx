import ChessGame from '@/components/chess/chess-game';
import { GameControls } from '@/components/chess/game-controls';
import { MoveHistory } from '@/components/chess/move-history';
import { Button } from '@/components/ui/button';
import { Github, Languages, Settings } from 'lucide-react';
import { PlayerInfo } from '@/components/chess/player-info';
import useGameStore from '@/lib/store/game-store';


export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold font-headline">Chess Game</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Languages className="w-4 h-4 mr-2" />EN</Button>
          <Button variant="outline" size="sm">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </header>
      <main className="flex-1 w-full p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <ChessGame />
          </div>
          <div className="flex flex-col gap-6">
            <GameControls />
            <MoveHistory />
          </div>
        </div>
      </main>
    </div>
  );
}
