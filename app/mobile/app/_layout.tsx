import { useColorScheme } from '@/hooks/use-color-scheme';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import axios from 'axios';

export const unstable_settings = {
  anchor: '(tabs)',
};

const API_BASE = "https://unhorizoned-nonimpedimental-kylah.ngrok-free.dev";

// SecureStore is not available on web, so we only use tokenCache on native
const tokenCache = Platform.OS !== 'web' ? {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch {}
  },
} : undefined;

// In-memory cache for synced users (persists during app session)
const syncedUsersCache = new Set<string>();

// Helper to check if user was already synced this session
const isUserSynced = (userId: string): boolean => syncedUsersCache.has(userId);

// Mark user as synced in memory
const markUserAsSynced = (userId: string): void => {
  syncedUsersCache.add(userId);
};

// Inner component that has access to Clerk hooks
function AppContent() {
  const { isSignedIn, getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const isSyncingRef = useRef(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const syncUser = async () => {
      // Guard clauses - exit early if conditions not met
      if (!isLoaded || !isSignedIn || !user || isSyncingRef.current) return;
      
      // Skip if already synced this session
      if (isUserSynced(user.id)) return;

      isSyncingRef.current = true;

      try {
        const token = await getToken();
        if (!token) {
          isSyncingRef.current = false;
          return;
        }

        await axios.post(
          `${API_BASE}/auth/sync`,
          {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            timeout: 8000,
          }
        );

        markUserAsSynced(user.id);
      } catch (error: any) {
        // Mark as synced if user already exists (409 conflict)
        if (error.response?.status === 409) {
          markUserAsSynced(user.id);
        }
      } finally {
        isSyncingRef.current = false;
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user?.id, getToken]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <AppContent />
      </ClerkProvider>
    </SafeAreaProvider>
  );
}