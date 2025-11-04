
"use client";

import { useRef } from 'react';
import ChessGame from '@/components/chess/chess-game';
import { GameControls } from '@/components/chess/game-controls';
import { MoveHistory } from '@/components/chess/move-history';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import SettingsDialog from '@/components/chess/settings-dialog';
import FullscreenButton from '@/components/chess/fullscreen-button';

export default function Home() {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="flex items-center justify-between p-4 border-b shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold font-headline">Chess</h1>
        </div>
        <div className="flex items-center gap-2">
          <FullscreenButton boardRef={boardRef} />
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com/firebase/studio-stockfish-champion-web" target="_blank">
              <Github className="w-4 h-4" />
            </a>
          </Button>
          <SettingsDialog />
        </div>
      </header>
      <main className="flex-1 w-full p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <ChessGame boardRef={boardRef} />
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
