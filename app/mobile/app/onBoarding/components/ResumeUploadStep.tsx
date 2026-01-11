import * as DocumentPicker from 'expo-document-picker'
import { Pressable, StyleSheet, useColorScheme } from 'react-native'
import { FileText, CheckCircle } from 'lucide-react-native'
import { ThemedText } from '@/components/themed-text'
import { Colors } from '@/constants/theme'
import { ThemedView } from '@/components/themed-view'

type Props = {
    resumeUrl: string | null
    setResumeUrl: (url: string) => void
}

const ResumeUploadStep = ({ resumeUrl, setResumeUrl }: Props) => {

    const theme = useColorScheme() ?? 'light';
    
    const pickResume = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['application/pdf'],
            copyToCacheDirectory: true,
        })

        if (result.canceled) return

        const file = result.assets[0]

        // Upload to Cloudinary (example)
        const data = new FormData()
        data.append('file', {
            uri: file.uri,
            name: file.name,
            type: 'application/pdf',
        } as any)
        data.append('upload_preset', 'resume_upload')

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload',
            {
                method: 'POST',
                body: data,
            }
        )

        const json = await res.json()
        setResumeUrl(json.secure_url)
    }

    return (
        <ThemedView style={styles.ResumeComponent}>
            <ThemedView style={styles.ResumeComponent_in}>
                <ThemedView
                    style={styles.resume_one}
                >
                    <ThemedText
                        lightColor={Colors.light.text}
                        darkColor={Colors.dark.text}
                        style={styles.resume_text_one}
                    >
                        Can we get your Resume, Please?
                    </ThemedText>
                    <ThemedText
                        lightColor={Colors.light.text}
                        darkColor={Colors.dark.text}
                        style={styles.resume_text_two}
                    >
                        We only your infomation to help you find the right jobs.
                    </ThemedText>
                </ThemedView>
                <Pressable 
                    onPress={pickResume} 
                    style={theme === 'light' ? [styles.uploadBox, { backgroundColor: Colors.light.backgroundSecondary, borderColor: 'black' }] : [styles.uploadBox, { backgroundColor: Colors.dark.backgroundSecondary, borderColor: 'white' }]}
                >
                    {resumeUrl ? (
                        <>
                            <CheckCircle color={theme === 'light' ? Colors.light.success : Colors.dark.success} size={32} />
                            <ThemedText style={styles.successText}>
                                Resume uploaded
                            </ThemedText>
                        </>
                    ) : (
                        <>
                            <FileText size={32}  color={theme === 'light' ? Colors.dark.background : Colors.light.background}/>
                            <ThemedText style={styles.uploadText}>
                                Upload Resume (PDF)
                            </ThemedText>
                        </>
                    )}
                </Pressable>
                <ThemedText 
                    style={styles.skipText}
                >
                    You can skip this for now
                </ThemedText>
            </ThemedView>
        </ThemedView>
    )
}

export default ResumeUploadStep

const styles = StyleSheet.create({
    ResumeComponent: {
        width: '100%',
    },
    ResumeComponent_in: {
        width: '100%',
    },
    resume_one: {
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    resume_text_one: {
        fontSize: 25,
        fontWeight: '600',
        lineHeight: 40,
    },
    resume_text_two: {
        fontSize: 16,
        lineHeight: 24,
        paddingTop: 10,
    },
    uploadBox: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 160,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#fafafa',
        borderBottomWidth: 8,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: '500',
    },
    successText: {
        fontSize: 16,
        fontWeight: '600',
    },
    skipText: {
        textAlign: 'center',
        marginTop: 10,
    },
})