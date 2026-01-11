import { ThemedSafeAreaView } from '@/components/themed-safe-area-view'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { ChevronLeft, ChevronRight } from 'lucide-react-native'
import { useState } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, useColorScheme } from 'react-native'
import Details from './components/details'
import PreferredJobsStep from './components/PreferredJobsStep'
import ResumeUploadStep from './components/ResumeUploadStep'
import SkillsStep from './components/SkillsStep'


const CreateProfile = () => {

  const router = useRouter()

  const theme = useColorScheme() ?? 'light';
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [education, setEducation] = useState({
    collegeName: '',
    major: '',
    fromMonth: '',
    fromYear: '',
    toMonth: '',
    toYear: '',
  })
  const [skills, setSkills] = useState<string[]>([])
  const [preferredJobs, setPreferredJobs] = useState<string[]>([])
   

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
    else {
      router.back()
    }
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <ThemedSafeAreaView
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ThemedView style={styles.container}>

          {/* NAV — TOP */}
          <ThemedView style={styles.nav}>
            <Pressable onPress={handlePrev}>
              <ChevronLeft
                size={35}
                color={theme === 'light' ? Colors.light.text : Colors.dark.text}
              />
            </Pressable>
          </ThemedView>

          {/* CONTENT — MIDDLE (STARTS FROM TOP) */}
          <ThemedView style={styles.content}>
            {currentStep === 1 && (
              <ResumeUploadStep resumeUrl={resumeUrl} setResumeUrl={setResumeUrl} />
            )}
            {currentStep === 2 && (
              <Details 
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                education={education}
                setEducation={setEducation}
              />
            )}
            {currentStep === 3 && (
              <SkillsStep skills={skills} setSkills={setSkills} />
            )}
            {currentStep === 4 && (
              <PreferredJobsStep preferredJobs={preferredJobs} setPreferredJobs={setPreferredJobs} />
            )}
          </ThemedView>

          {/* FOOTER — BOTTOM */}
          <ThemedView style={styles.footer}>
            <Pressable onPress={handleNext} style={[styles.createProfile_button, { backgroundColor: theme === 'light' ? Colors.light.backgroundSecondary : Colors.dark.backgroundSecondary, borderColor: theme === 'light' ? 'black' : 'white' }]}>
              <ChevronRight
                size={35}
                color={theme === 'light' ? Colors.light.text : Colors.dark.text}
              />
            </Pressable>
          </ThemedView>

        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  )
}

export default CreateProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 12,
    justifyContent: 'space-between',  
  },

  nav: {
    width: '100%',
    paddingVertical: 5,
    alignItems: 'flex-start',
  },

  content: {
    width: '100%',
    flex: 1,                 
    justifyContent: 'flex-start',
  },

  footer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },  

  createProfile_button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    padding: 10,
  }
});