import express from 'express';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'The Backrooms server is running...' });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

interface PlayerState {
  id: string;
  x: number;
  y: number;
  z: number;
  rotationY: number;
  level: number;
  isCrouching: boolean;
}

const players = new Map<WebSocket, PlayerState>();
let nextPlayerId = 1;

wss.on('connection', (ws) => {
  const playerId = `player-${nextPlayerId++}`;
  const initialState: PlayerState = { id: playerId, x: 0, y: 1.6, z: 0, rotationY: 0, level: 0, isCrouching: false };
  players.set(ws, initialState);

  ws.send(JSON.stringify({ type: 'init', id: playerId, players: Array.from(players.values()).filter(p => p.id !== playerId) }));

  broadcast({ type: 'player_join', player: initialState }, ws);

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === 'position') {
        const state = players.get(ws);
        if (state) {
          state.x = msg.x;
          state.y = msg.y;
          state.z = msg.z;
          state.rotationY = msg.rotationY;
          state.level = msg.level;
          state.isCrouching = msg.isCrouching;
          broadcast({ type: 'player_move', player: state }, ws);
        }
      }
    } catch {}
  });

  ws.on('close', () => {
    const state = players.get(ws);
    if (state) {
      broadcast({ type: 'player_leave', id: state.id }, ws);
    }
    players.delete(ws);
  });
});

function broadcast(msg: object, exclude?: WebSocket) {
  const data = JSON.stringify(msg);
  wss.clients.forEach(client => {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Backrooms server running on port ${PORT} (HTTP + WebSocket)`);
});
