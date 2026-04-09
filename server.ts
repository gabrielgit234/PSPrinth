import express from 'express';
import { createServer as createViteServer } from 'vite';
import { MOCK_MODS } from './constants';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATS_FILE = path.join(__dirname, 'stats.json');

// Helper to read stats
function readStats() {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const data = fs.readFileSync(STATS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading stats:', err);
  }
  return {};
}

// Helper to write stats
function writeStats(stats: any) {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  } catch (err) {
    console.error('Error writing stats:', err);
  }
}

// Initialize stats in memory
let savedStats = readStats();
let mods = MOCK_MODS.map(mod => ({
  ...mod,
  downloads: savedStats[mod.id]?.downloads || 0,
  follows: savedStats[mod.id]?.follows || 0
}));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/mods', (req, res) => {
    res.json(mods);
  });

  app.post('/api/mods/:id/download', (req, res) => {
    const { id } = req.params;
    const modIndex = mods.findIndex(m => m.id === id);
    if (modIndex !== -1) {
      mods[modIndex].downloads += 1;
      
      // Save to file
      const stats = readStats();
      if (!stats[id]) stats[id] = { downloads: 0, follows: 0 };
      stats[id].downloads = mods[modIndex].downloads;
      writeStats(stats);

      res.json({ success: true, downloads: mods[modIndex].downloads });
    } else {
      res.status(404).json({ error: 'Mod not found' });
    }
  });

  app.post('/api/mods/:id/like', (req, res) => {
    const { id } = req.params;
    const { isFollowing } = req.body;
    const modIndex = mods.findIndex(m => m.id === id);
    if (modIndex !== -1) {
      if (isFollowing) {
        mods[modIndex].follows += 1;
      } else {
        mods[modIndex].follows = Math.max(0, mods[modIndex].follows - 1);
      }
      
      // Save to file
      const stats = readStats();
      if (!stats[id]) stats[id] = { downloads: 0, follows: 0 };
      stats[id].follows = mods[modIndex].follows;
      writeStats(stats);

      res.json({ success: true, follows: mods[modIndex].follows });
    } else {
      res.status(404).json({ error: 'Mod not found' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
