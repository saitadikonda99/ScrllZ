import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { api, setupAxiosAuth } from '@/lib/api';

export const unstable_settings = {
  anchor: '(tabs)',
};


const tokenCache =
  Platform.OS !== 'web'
    ? {
        async getToken(key: string) {
          try {
            return await SecureStore.getItemAsync(key);
          } catch {
            return null;
          }
        },
        async saveToken(key: string, value: string) {
          try {
            await SecureStore.setItemAsync(key, value);
          } catch {}
        },
      }
    : undefined;


const syncedUsersCache = new Set<string>();
const isUserSynced = (id: string) => syncedUsersCache.has(id);
const markUserSynced = (id: string) => syncedUsersCache.add(id);


function AppGate() {
  const { isSignedIn, getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const colorScheme = useColorScheme();

  const syncingRef = useRef(false);

  useEffect(() => {
    setupAxiosAuth(getToken);
  }, []);

  useEffect(() => {
    const initUser = async () => {
      if (!isLoaded || !isSignedIn || !user || syncingRef.current) return;
      if (isUserSynced(user.id)) return;

      syncingRef.current = true;

      try {
        await api.post('/auth/sync', {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
        markUserSynced(user.id);
      } catch (e) {
        console.log('Init user failed:', e);
      } finally {
        syncingRef.current = false;
      }
    };

    initUser();
  }, [isLoaded, isSignedIn, user?.id]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="onBoarding" />
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
        <AppGate />
      </ClerkProvider>
    </SafeAreaProvider>
  );
}