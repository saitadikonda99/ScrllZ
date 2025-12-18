import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Colors } from '@/constants/theme'

const Signup = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ThemedView style={styles.signupComponent}>
        <ThemedView style={styles.signupComponent_in}>
          <ThemedView style={styles.signup_one}>
            <Image
              source={require('@/assets/images/favicon.png')}
              style={styles.logo}
            />
          </ThemedView>
          <ThemedView style={styles.signup_two}>
            <ThemedText 
              style={styles.signup_two_text_one}
              lightColor={Colors.light.text}
              darkColor={Colors.dark.text}
            >
              Join Scrllz Today
            </ThemedText>
            <ThemedText 
              style={styles.signup_two_text_two}
              lightColor={Colors.light.textSecondary}
              darkColor={Colors.dark.textSecondary}
            >
              Create your account and start your journey
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  signupComponent: {
    width: '100%',
    height: '100%',
  },

  signupComponent_in: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 60,
  },

  signup_one: {  
    width: '100%',
  },

  logo: {
    width: 50,
    height: 50,
  },

  signup_two: {
    paddingVertical: 15,
  },

  signup_two_text_one: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 5,
  },

  signup_two_text_two: {
    fontSize: 22,
    fontWeight: '600',
  }
})
