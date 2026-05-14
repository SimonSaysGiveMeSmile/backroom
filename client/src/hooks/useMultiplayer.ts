import { useEffect, useRef, useCallback, useState } from 'react';

export interface RemotePlayer {
  id: string;
  x: number;
  y: number;
  z: number;
  rotationY: number;
  level: number;
  isCrouching: boolean;
}

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

export function useMultiplayer(level: number) {
  const wsRef = useRef<WebSocket | null>(null);
  const [players, setPlayers] = useState<Map<string, RemotePlayer>>(new Map());
  const [myId, setMyId] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => {
      setConnected(false);
      setPlayers(new Map());
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case 'init':
            setMyId(msg.id);
            const initial = new Map<string, RemotePlayer>();
            for (const p of msg.players) {
              initial.set(p.id, p);
            }
            setPlayers(initial);
            break;
          case 'player_join':
            setPlayers(prev => {
              const next = new Map(prev);
              next.set(msg.player.id, msg.player);
              return next;
            });
            break;
          case 'player_move':
            setPlayers(prev => {
              const next = new Map(prev);
              next.set(msg.player.id, msg.player);
              return next;
            });
            break;
          case 'player_leave':
            setPlayers(prev => {
              const next = new Map(prev);
              next.delete(msg.id);
              return next;
            });
            break;
        }
      } catch {}
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []);

  const sendPosition = useCallback((x: number, y: number, z: number, rotationY: number, isCrouching: boolean) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'position', x, y, z, rotationY, level, isCrouching }));
    }
  }, [level]);

  const visiblePlayers = Array.from(players.values()).filter(p => p.level === level);

  return { players: visiblePlayers, myId, connected, sendPosition };
}
