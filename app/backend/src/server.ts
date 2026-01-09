import { Hono } from 'hono';
import 'dotenv/config';

import authRoutes from './routes/auth/auth.routes.ts';

const app = new Hono();

app.get('/', (c) => c.text('Hello from the backend!'));
app.route('/auth', authRoutes)



export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};