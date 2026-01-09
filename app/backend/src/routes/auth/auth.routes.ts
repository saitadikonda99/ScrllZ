import { Hono } from 'hono';
import { getCurrentUser, syncUser } from '../../controller/user/user.controller.js';


const auth = new Hono();
 
auth.post('/sync', syncUser);
auth.get('/getCurrentUser', getCurrentUser);

auth.post('/logout', async (c) => {
  return c.json({ success: true, message: 'Logged out successfully' });
});

export default auth;