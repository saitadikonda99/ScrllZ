import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function SSOCallback() {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if the sign-in is complete after OAuth redirect
        if (signIn?.status === 'complete' && signIn.createdSessionId) {
          // Set the active session
          await setActive?.({ session: signIn.createdSessionId });
          
          // Clean redirect to home without tokens in URL
          router.replace('/(tabs)/home');
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        // Redirect back to login on error
        router.replace('/auth/login');
      }
    };

    handleCallback();
  }, [signIn, setActive, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
