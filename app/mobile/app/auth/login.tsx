import { ThemedSafeAreaView } from '@/components/themed-safe-area-view'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import React, { useCallback, useEffect } from 'react'
import { Image, Platform, Pressable, StyleSheet } from 'react-native'

import { useSignIn, useSSO } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'

// Required to complete the OAuth redirect on web
if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

// Warm up browser for native OAuth (improves UX)
const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }
  }, [])
}

const Login = () => {
  useWarmUpBrowser()
  
  const { signIn, isLoaded } = useSignIn()
  const { startSSOFlow } = useSSO()
  const router = useRouter()
  const redirectUrl = Linking.createURL('/')


  // For web: use redirect-based OAuth (no popup issues)
  const handleWebOAuth = useCallback(async (strategy: 'oauth_google' | 'oauth_apple') => {
    if (!isLoaded || !signIn) return
    
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: Linking.createURL('/auth/sso-callback'),
        redirectUrlComplete: Linking.createURL('/auth/sso-callback'),
      })
    } catch (err) {
      // Error handled silently - user can retry
    }
  }, [isLoaded, signIn])

  // For native: use popup-based SSO flow
  const handleNativeOAuth = useCallback(async (strategy: 'oauth_google' | 'oauth_apple') => {
    try {
      const result = await startSSOFlow({
        strategy,
        redirectUrl,
      });
      
      const { createdSessionId, signIn: ssoSignIn, signUp: ssoSignUp, setActive } = result;
      
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace('/(tabs)/home');
      } else if (ssoSignUp?.status === 'complete') {
        await setActive!({ session: ssoSignUp.createdSessionId });
        router.replace('/(tabs)/home');
      } else if (ssoSignIn?.status === 'complete') {
        await setActive!({ session: ssoSignIn.createdSessionId });
        router.replace('/(tabs)/home');
      }
    } catch (err) {
      // Error handled silently - user can retry
    }
  }, [startSSOFlow, redirectUrl, router]);

  const onGooglePress = useCallback(async () => {
    if (Platform.OS === 'web') {
      await handleWebOAuth('oauth_google');
    } else {
      await handleNativeOAuth('oauth_google');
    }
  }, [handleWebOAuth, handleNativeOAuth]);

  const onApplePress = useCallback(async () => {
    if (Platform.OS === 'web') {
      await handleWebOAuth('oauth_apple');
    } else {
      await handleNativeOAuth('oauth_apple');
    }
  }, [handleWebOAuth, handleNativeOAuth]);

  return (
    <ThemedSafeAreaView lightColor="white" darkColor="white">
      <ThemedView style={styles.LoginComponent} lightColor="white" darkColor="white">
        <ThemedView style={styles.LoginComponent_in} lightColor="white" darkColor="white">
          <ThemedView style={styles.login_one} lightColor="white" darkColor="white">
            <Image
              source={require('@/assets/images/Logo.png')}
              style={styles.logo}
            />
          </ThemedView>
          <ThemedView style={styles.login_two} lightColor="white" darkColor="white">
            <ThemedText
              style={styles.login_two_text_one}
              lightColor={Colors.light.text}
              darkColor={Colors.light.text}
            >
              Your Friend in Job Search.
            </ThemedText>
            <ThemedText
              style={styles.login_two_text_two}
              lightColor={Colors.light.textSecondary}
              darkColor={Colors.light.textSecondary}
            >
              Login to your Scrllz Account
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.login_three} lightColor="white" darkColor="white">
            <Image
              source={require('@/assets/images/Login.png')}
              style={styles.login_image}
              resizeMode="contain"
            />
          </ThemedView>
          <ThemedView style={styles.login_four} lightColor="white" darkColor="white">
            <Pressable onPress={onGooglePress} style={styles.login_four_one}>
              <Image
                source={require('@/assets/icons/Google.png')}
                style={styles.login_icon_image}
              />
              <ThemedText
                style={styles.login_four_text}
                lightColor={Colors.light.text}
                darkColor={Colors.light.text}
              >
                Login with Google
              </ThemedText>
            </Pressable>
            <Pressable onPress={onApplePress} style={styles.login_four_one}>
              <Image
                source={require('@/assets/icons/Apple.png')}
                style={styles.login_icon_image}
              />
                <ThemedText
                  style={styles.login_four_text}
                  lightColor={Colors.light.text}
                  darkColor={Colors.light.text}
                >
                  Login with apple
                </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedSafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  LoginComponent: {
    width: '100%',
    height: '100%',
  },

  LoginComponent_in: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 60,
  },

  login_one: {
    width: '100%',
  },

  logo: {
    width: 80,
    height: 80,
  },

  login_two: {
    paddingBottom: 15,
  },

  login_two_text_one: {
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 5,
  },

  login_two_text_two: {
    fontSize: 22,
    fontWeight: '600',
  },

  login_three: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  login_image: {
    width: '100%',
    height: 300,
  },

  login_four: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 20,
  },

  login_four_one: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },

  login_icon_image: {
    width: 25,
    height: 25,
  },

  login_four_text: {
    width: '80%',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
})
