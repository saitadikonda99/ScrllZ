import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'

import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

const Home = () => {
   const { signOut } = useClerk()
   const router = useRouter()
    
  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/auth/login')
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
        <SafeAreaView>
            <ThemedView>
                <ThemedText>
                    Home Screen
                </ThemedText>
                <Pressable onPress={handleSignOut}>
                    <Text onPress={handleSignOut}>Sign Out</Text>
                </Pressable>
            </ThemedView>
        </SafeAreaView>
  )
}

export default Home