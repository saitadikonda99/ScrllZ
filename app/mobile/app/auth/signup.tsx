import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Colors } from '@/constants/theme'

import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

const Signup = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <ThemedText>Verify your email</ThemedText>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <ThemedText>Verify</ThemedText>
        </TouchableOpacity>
      </>
    )
  }

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


/*
    <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity onPress={onSignUpPress}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text>Sign in</Text>
          </Link>
        </View>
*/