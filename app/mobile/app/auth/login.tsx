import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { Mail } from 'lucide-react-native';

const login = () => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: 'white' }]}>
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
            />
          </ThemedView>
          <ThemedView style={styles.login_four} lightColor="white" darkColor="white">
            <ThemedView style={styles.login_four_one} lightColor="white" darkColor="white">
              <Image
                source={require('@/assets/icons/Google.png')}
                style={styles.login_icon_image}
              />
              <ThemedText
                style={styles.login_four_text}
                lightColor={Colors.light.text}
                darkColor={Colors.light.text}
              >Login with Google</ThemedText>
            </ThemedView>
            <ThemedView style={styles.login_four_one} lightColor="white" darkColor="white">
              <Mail />
              <ThemedText
                style={styles.login_four_text}
                lightColor={Colors.light.text}
                darkColor={Colors.light.text}
              >Login with Email</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

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
    resizeMode: 'contain',
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
    width: 20,
    height: 20,
  },

  login_four_text: {
    width: '80%',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
})
