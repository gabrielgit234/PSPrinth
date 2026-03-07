import express from 'express';
import { createServer as createViteServer } from 'vite';
import { MOCK_MODS } from './constants';

// Initialize stats in memory
let mods = MOCK_MODS.map(mod => ({
  ...mod,
  downloads: 0, // Reset to 0 for "real" counting
  follows: 0
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
      res.json({ success: true, downloads: mods[modIndex].downloads });
    } else {
      res.status(404).json({ error: 'Mod not found' });
    }
  });

  app.post('/api/mods/:id/like', (req, res) => {
    const { id } = req.params;
    const modIndex = mods.findIndex(m => m.id === id);
    if (modIndex !== -1) {
      mods[modIndex].follows += 1;
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
    // Production static file serving would go here
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
