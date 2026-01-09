import { Hono } from 'hono';

const auth = new Hono();

auth.post('/login', async (c) => {
    return c.json({ message: 'Login route' });
});

auth.post('/refresh', async (c) => {
    return c.json({ message: 'Refresh route' });
})

auth.get('/logout', async (c) => {
    return c.json({ message: 'Logout route' });
});

export default auth;