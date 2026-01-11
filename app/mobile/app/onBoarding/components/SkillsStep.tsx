import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import { Search, Sparkles, X } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native'

const TOP_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Node.js',
  'Python',
  'Java',
  'Swift',
  'Kotlin',
  'Go',
  'Rust',
  'SQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'REST APIs',
  'Git',
  'CI/CD',
  'Machine Learning',
  'Data Analysis',
  'UI/UX Design',
  'Figma',
  'Agile',
  'Scrum',
  'Product Management',
  'Communication',
  'Leadership',
  'Problem Solving',
]

type Props = {
  skills: string[]
  setSkills: (skills: string[]) => void
}

const SkillsStep = ({ skills, setSkills }: Props) => {
  const theme = useColorScheme() ?? 'light'
  const [searchQuery, setSearchQuery] = useState('')

  const iconColor = theme === 'light' ? Colors.light.textSecondary : Colors.dark.textSecondary
  const placeholderColor = theme === 'light' ? Colors.light.textMuted : Colors.dark.textMuted

  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return []
    return TOP_SKILLS.filter(
      (skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !skills.includes(skill)
    ).slice(0, 6)
  }, [searchQuery, skills])

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill])
    }
    setSearchQuery('')
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleAddCustomSkill = () => {
    const trimmed = searchQuery.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed])
      setSearchQuery('')
    }
  }

  const availableTopSkills = TOP_SKILLS.filter((skill) => !skills.includes(skill)).slice(0, 10)

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
            What are your skills?
          </ThemedText>
          <ThemedText
            lightColor={Colors.light.textSecondary}
            darkColor={Colors.dark.textSecondary}
            style={styles.headerSubtitle}
          >
            Add skills to help employers find you for the right opportunities.
          </ThemedText>
        </ThemedView>

        {/* Search Input */}
        <ThemedView style={styles.searchContainer}>
          <ThemedView
            style={[
              styles.searchInputWrapper,
              {
                backgroundColor:
                  theme === 'light'
                    ? Colors.light.backgroundSecondary
                    : Colors.dark.backgroundSecondary,
                borderColor: theme === 'light' ? Colors.light.border : Colors.dark.border,
              },
            ]}
          >
            <Search size={20} color={iconColor} />
            <TextInput
              style={[
                styles.searchInput,
                { color: theme === 'light' ? Colors.light.text : Colors.dark.text },
              ]}
              placeholder="Search or add a skill..."
              placeholderTextColor={placeholderColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleAddCustomSkill}
              returnKeyType="done"
            />
          </ThemedView>
        </ThemedView>

        {/* Search Suggestions */}
        {filteredSkills.length > 0 && (
          <ThemedView style={styles.suggestionsContainer}>
            {filteredSkills.map((skill) => (
              <Pressable
                key={skill}
                onPress={() => addSkill(skill)}
                style={[
                  styles.suggestionChip,
                  {
                    backgroundColor:
                      theme === 'light'
                        ? Colors.light.backgroundSecondary
                        : Colors.dark.backgroundSecondary,
                    borderColor: theme === 'light' ? Colors.light.border : Colors.dark.border,
                  },
                ]}
              >
                <ThemedText style={styles.suggestionText}>{skill}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        )}

        {/* Selected Skills */}
        {skills.length > 0 && (
          <ThemedView style={styles.section}>
            <ThemedView style={styles.sectionHeader}>
              <Sparkles size={18} color={iconColor} />
              <ThemedText style={styles.sectionTitle}>Your Skills ({skills.length})</ThemedText>
            </ThemedView>
            <ThemedView style={styles.skillsGrid}>
              {skills.map((skill) => (
                <Pressable
                  key={skill}
                  onPress={() => removeSkill(skill)}
                  style={[
                    styles.skillChip,
                    styles.selectedSkillChip,
                    {
                      backgroundColor: theme === 'light' ? Colors.light.primary : Colors.dark.primary,
                    },
                  ]}
                >
                  <ThemedText style={[styles.skillText, styles.selectedSkillText]}>
                    {skill}
                  </ThemedText>
                  <X size={14} color="white" />
                </Pressable>
              ))}
            </ThemedView>
          </ThemedView>
        )}

        {/* Popular Skills */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Sparkles size={18} color={iconColor} />
            <ThemedText style={styles.sectionTitle}>Popular Skills</ThemedText>
          </ThemedView>
          <ThemedView style={styles.skillsGrid}>
            {availableTopSkills.map((skill) => (
              <Pressable
                key={skill}
                onPress={() => addSkill(skill)}
                style={[
                  styles.skillChip,
                  {
                    backgroundColor:
                      theme === 'light'
                        ? Colors.light.backgroundSecondary
                        : Colors.dark.backgroundSecondary,
                    borderColor: theme === 'light' ? 'black' : 'white',
                  },
                ]}
              >
                <ThemedText style={styles.skillText}>{skill}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedText style={styles.skipText}>Tap to add, tap again to remove</ThemedText>
      </ThemedView>
    </ScrollView>
  )
}

export default SkillsStep

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
  searchContainer: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomWidth: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
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
  skillsGrid: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderBottomWidth: 4,
  },
  selectedSkillChip: {
    borderColor: 'transparent',
  },
  skillText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedSkillText: {
    color: 'white',
  },
  skipText: {
    textAlign: 'center',
    marginTop: 24,
    opacity: 0.6,
  },
})
