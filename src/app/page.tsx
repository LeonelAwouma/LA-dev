import ChessGame from '@/components/chess/chess-game';
import { AppLogo } from '@/components/icons';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { GameControls } from '@/components/chess/game-controls';
import { MoveHistory } from '@/components/chess/move-history';
import { ThemeGenerator } from '@/components/chess/theme-generator';

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <AppLogo className="w-8 h-8 text-accent" />
            <h2 className="text-lg font-headline font-semibold">Stockfish Champion</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-4">
            <GameControls />
            <MoveHistory />
            <ThemeGenerator />
          </div>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-8 relative">
            <div className="absolute top-4 left-4 md:hidden">
              <SidebarTrigger />
            </div>
            <ChessGame />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
