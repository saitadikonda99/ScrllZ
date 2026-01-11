import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import { Briefcase, Plus, X } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native'

const JOB_ROLES = [
  'Software Development Engineer',
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Machine Learning Engineer',
  'AI Engineer',
  'Data Scientist',
  'Data Analyst',
  'Data Engineer',
  'DevOps Engineer',
  'Cloud Engineer',
  'Mobile Developer',
  'iOS Developer',
  'Android Developer',
  'React Native Developer',
  'Product Manager',
  'Technical Program Manager',
  'Engineering Manager',
  'Site Reliability Engineer',
  'Security Engineer',
  'QA Engineer',
  'UI/UX Designer',
  'Solutions Architect',
  'Systems Engineer',
  'Embedded Systems Engineer',
  'Blockchain Developer',
  'Game Developer',
  'Research Scientist',
  'Technical Writer',
]

type Props = {
  preferredJobs: string[]
  setPreferredJobs: (jobs: string[]) => void
}

const PreferredJobsStep = ({ preferredJobs, setPreferredJobs }: Props) => {
  const theme = useColorScheme() ?? 'light'
  const [searchQuery, setSearchQuery] = useState('')

  const iconColor = theme === 'light' ? Colors.light.textSecondary : Colors.dark.textSecondary
  const placeholderColor = theme === 'light' ? Colors.light.textMuted : Colors.dark.textMuted

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return []
    return JOB_ROLES.filter(
      (job) =>
        job.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !preferredJobs.includes(job)
    ).slice(0, 6)
  }, [searchQuery, preferredJobs])

  const addJob = (job: string) => {
    if (!preferredJobs.includes(job) && preferredJobs.length < 5) {
      setPreferredJobs([...preferredJobs, job])
    }
    setSearchQuery('')
  }

  const removeJob = (job: string) => {
    setPreferredJobs(preferredJobs.filter((j) => j !== job))
  }

  const handleAddCustomJob = () => {
    const trimmed = searchQuery.trim()
    if (trimmed && !preferredJobs.includes(trimmed) && preferredJobs.length < 5) {
      setPreferredJobs([...preferredJobs, trimmed])
      setSearchQuery('')
    }
  }

  const availableJobs = JOB_ROLES.filter((job) => !preferredJobs.includes(job)).slice(0, 10)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.content}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
            style={styles.headerTitle}
          >
            What roles are you looking for?
          </ThemedText>
          <ThemedText
            lightColor={Colors.light.textSecondary}
            darkColor={Colors.dark.textSecondary}
            style={styles.headerSubtitle}
          >
            Select up to 5 job roles you're interested in.
          </ThemedText>
        </ThemedView>

        {/* Your Jobs Input Box */}
        <ThemedView style={styles.inputSection}>
          <ThemedText style={styles.sectionLabel}>Your preferred roles</ThemedText>
          <Pressable
            style={[
              styles.inputBox,
              {
                backgroundColor:
                  theme === 'light'
                    ? Colors.light.backgroundSecondary
                    : Colors.dark.backgroundSecondary,
                borderColor: theme === 'light' ? 'black' : 'white',
              },
            ]}
          >
            <ThemedView style={styles.selectedJobsRow}>
              {preferredJobs.map((job) => (
                <Pressable
                  key={job}
                  onPress={() => removeJob(job)}
                  style={[
                    styles.selectedJobChip,
                    {
                      backgroundColor:
                        theme === 'light' ? Colors.light.text : Colors.dark.text,
                    },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.selectedJobText,
                      { color: theme === 'light' ? Colors.light.background : Colors.dark.background },
                    ]}
                  >
                    {job}
                  </ThemedText>
                  <X size={14} color={theme === 'light' ? Colors.light.background : Colors.dark.background} />
                </Pressable>
              ))}
              <TextInput
                style={[
                  styles.inlineInput,
                  { color: theme === 'light' ? Colors.light.text : Colors.dark.text },
                ]}
                placeholder={preferredJobs.length === 0 ? 'Enter roles here' : ''}
                placeholderTextColor={placeholderColor}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleAddCustomJob}
                returnKeyType="done"
              />
            </ThemedView>
          </Pressable>
          <ThemedText
            style={[
              styles.maxText,
              { color: theme === 'light' ? Colors.light.textMuted : Colors.dark.textMuted },
            ]}
          >
            Max 5 roles
          </ThemedText>
        </ThemedView>

        {/* Search Suggestions */}
        {filteredJobs.length > 0 && (
          <ThemedView style={styles.suggestionsContainer}>
            {filteredJobs.map((job) => (
              <Pressable
                key={job}
                onPress={() => addJob(job)}
                style={[
                  styles.suggestionChip,
                  {
                    borderColor: theme === 'light' ? Colors.light.border : Colors.dark.border,
                  },
                ]}
              >
                <Plus size={16} color={iconColor} />
                <ThemedText style={styles.suggestionText}>{job}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        )}

        {/* Suggested Jobs */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Briefcase size={18} color={iconColor} />
            <ThemedText style={styles.sectionTitle}>Suggested roles</ThemedText>
          </ThemedView>
          <ThemedView style={styles.jobsGrid}>
            {availableJobs.map((job) => (
              <Pressable
                key={job}
                onPress={() => addJob(job)}
                style={[
                  styles.jobChip,
                  {
                    borderColor: theme === 'light' ? Colors.light.border : Colors.dark.border,
                  },
                ]}
              >
                <Plus size={16} color={iconColor} />
                <ThemedText style={styles.jobText}>{job}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedText style={styles.skipText}>Tap + to add a role</ThemedText>
      </ThemedView>
    </ScrollView>
  )
}

export default PreferredJobsStep

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    width: '100%',
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 40,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 10,
  },
  inputSection: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  inputBox: {
    width: '100%',
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomWidth: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectedJobsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  selectedJobChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedJobText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inlineInput: {
    flex: 1,
    minWidth: 120,
    fontSize: 16,
    paddingVertical: 4,
  },
  maxText: {
    textAlign: 'right',
    fontSize: 13,
    marginTop: 6,
  },
  suggestionsContainer: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    width: '100%',
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  jobsGrid: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  jobChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
  },
  jobText: {
    fontSize: 14,
    fontWeight: '500',
  },
  skipText: {
    textAlign: 'center',
    marginTop: 24,
    opacity: 0.6,
  },
})
