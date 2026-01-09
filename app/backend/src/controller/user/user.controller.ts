import type { Context } from 'hono';
import prisma from '../../lib/prisma.js';

/**
 * Sync User Controller
 * Creates or updates user in database after Clerk authentication
 * Called from mobile app after successful login
 * Uses JWT claims only - no Clerk API calls
 */
export const syncUser = async (c: Context) => {
  try {

    const body = await c.req.json();    
    const authUser = {
      clerkUserId: body.clerkId,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
    };

    if (!authUser?.clerkUserId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Build name from JWT claims
    const name = authUser.firstName && authUser.lastName
      ? `${authUser.firstName} ${authUser.lastName}`.trim()
      : authUser.firstName || authUser.lastName || null;

    // Upsert user in database - create if not exists, update if exists
    const user = await prisma.user.upsert({
      where: { clerkUserId: authUser.clerkUserId },
      update: {
        email: authUser.email,
        name,
      },
      create: {
        clerkUserId: authUser.clerkUserId,
        email: authUser.email,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileCompleted: true,
        createdAt: true,
      },
    });

    // Never expose clerkUserId to frontend
    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profileCompleted: user.profileCompleted,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return c.json({ error: 'Failed to sync user' }, 500);
  }
};

/**
 * Get Current User Controller
 * Returns the current authenticated user from context (already fetched in middleware)
 * No additional DB query needed - uses data from middleware
 */
export const getCurrentUser = async (c: Context) => {
  try {
    const authUser = c.get('user');

    if (!authUser?.dbUserId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Fetch full user data for response (middleware only fetches minimal data)
    const user = await prisma.user.findUnique({
      where: { id: authUser.dbUserId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileCompleted: true,
        createdAt: true,
      },
    });

    if (!user) {
      return c.json({ error: 'User not found in database' }, 404);
    }

    // Never expose clerkUserId to frontend
    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profileCompleted: user.profileCompleted,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return c.json({ error: 'Failed to get user' }, 500);
  }
};