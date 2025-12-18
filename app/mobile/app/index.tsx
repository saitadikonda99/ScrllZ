import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'

const index = () => {
    return (
        <SafeAreaView>
            <ThemedView style={styles.HomeComponent}>
                <ThemedText>index</ThemedText>
                <Link href={"/auth/login" as const}>
                    Login
                </Link>
            </ThemedView>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    HomeComponent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})