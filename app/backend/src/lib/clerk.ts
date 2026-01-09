import { verifyToken } from '@clerk/backend';

export async function verifyClerkToken(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  
  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!
    });
    
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}