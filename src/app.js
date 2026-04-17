import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.get('/health', (req, res) => {
    res.status(200).json({ ok: true });
  });
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
