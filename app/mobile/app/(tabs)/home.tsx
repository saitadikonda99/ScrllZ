import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'

const Home = () => {
  return (
        <SafeAreaView>
            <ThemedView>
                <ThemedText>
                    Home Screen
                </ThemedText>
            </ThemedView>
        </SafeAreaView>
  )
}

export default Home