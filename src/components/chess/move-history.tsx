"use client";

import { useEffect, useRef } from 'react';
import useGameStore from '@/lib/store/game-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function MoveHistory() {
  const { history } = useGameStore();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [history]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Move History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 w-full rounded-md border" ref={scrollAreaRef}>
          {history.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No moves yet.</div>
          ) : (
            <div className="p-4 text-sm font-mono">
              <ol className="grid grid-cols-[auto_1fr_1fr] gap-x-4 gap-y-1">
                {Array.from({ length: Math.ceil(history.length / 2) }).map((_, i) => {
                  const whiteMove = history[i * 2];
                  const blackMove = history[i * 2 + 1];
                  return (
                    <li key={i} className="contents">
                      <span className="text-muted-foreground text-right">{i + 1}.</span>
                      <span className={whiteMove?.color === 'w' ? '' : 'text-muted-foreground'}>{whiteMove?.san || '...'}</span>
                      <span className={blackMove?.color === 'b' ? '' : 'text-muted-foreground'}>{blackMove?.san || '...'}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
