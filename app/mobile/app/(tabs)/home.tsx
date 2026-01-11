import { ThemedSafeAreaView } from '@/components/themed-safe-area-view'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import React from 'react'
import { Pressable } from 'react-native'

import { useClerk, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

const Home = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const { user, isLoaded } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/auth/login')
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <ThemedSafeAreaView>
      <ThemedView>
        <ThemedText>

        </ThemedText>
        <Pressable onPress={handleSignOut}>
          <ThemedText
            onPress={handleSignOut}
            lightColor={Colors.light.textSecondary}
            darkColor={Colors.dark.textSecondary}
          >Sign Out</ThemedText>

          <Pressable onPress={() => router.push('/onBoarding/create-profile')}>
            <ThemedText
              lightColor={Colors.light.textSecondary}
              darkColor={Colors.dark.textSecondary}
            >onBoarding</ThemedText>
          </Pressable>
        </Pressable>
      </ThemedView>
    </ThemedSafeAreaView>
  )
}

export default Home