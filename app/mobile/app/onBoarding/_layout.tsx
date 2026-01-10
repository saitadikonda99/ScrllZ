import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;  

  if (isSignedIn) {
    return <Redirect href="/onBoarding/create-profile" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
