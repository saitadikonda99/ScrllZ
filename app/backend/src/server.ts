import { Hono } from 'hono';
import { cors } from 'hono/cors';
import 'dotenv/config';

import authRoutes from './routes/auth/auth.routes.js';
import { serve } from 'bun';

import { verifyClerkToken } from './lib/clerk.js';

const app = new Hono();

// CORS middleware
app.use('/*', cors({
  origin: '*', 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (c) => c.text('Hello from the backend!'));

app.use('/api/*', async (c, next) => {
  const authHeader:any = c.req.header('Authorization');
  await verifyClerkToken(authHeader);
  await next();
});

app.route('/api/auth', authRoutes);


serve({
  fetch: app.fetch, 
  port: 3000,
  hostname: "0.0.0.0",
});
