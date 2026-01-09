import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

export default function SSOCallbackScreen() {
  const { handleRedirectCallback } = useClerk()
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback({
          afterSignInUrl: '/(tabs)/home',
          afterSignUpUrl: '/(tabs)/home',
        })
        router.replace('/(tabs)/home')
      } catch (err) {
        console.error('SSO callback error:', err)
        router.replace('/auth/login')
      }
    }

    handleCallback()
  }, [handleRedirectCallback, router])

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <ThemedText style={styles.text}>Completing sign in...</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
  },
})
