import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import { Building2, Calendar, GraduationCap, Mail, User } from 'lucide-react-native'
import { ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native'

type EducationDetails = {
  collegeName: string
  major: string
  fromMonth: string
  fromYear: string
  toMonth: string
  toYear: string
}

type Props = {
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  education: EducationDetails
  setEducation: (education: EducationDetails) => void
}

const Details = ({ name, setName, email, setEmail, education, setEducation }: Props) => {
  const theme = useColorScheme() ?? 'light'

  const inputStyle = [
    styles.input,
    {
      backgroundColor: theme === 'light' ? Colors.light.backgroundSecondary : Colors.dark.backgroundSecondary,
      borderColor: theme === 'light' ? Colors.light.border : Colors.dark.border,
      color: theme === 'light' ? Colors.light.text : Colors.dark.text,
    },
  ]

  const iconColor = theme === 'light' ? Colors.light.textSecondary : Colors.dark.textSecondary
  const placeholderColor = theme === 'light' ? Colors.light.textMuted : Colors.dark.textMuted

  const updateEducation = (field: keyof EducationDetails, value: string) => {
    setEducation({ ...education, [field]: value })
  }

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
            Let's get to know you
          </ThemedText>
          <ThemedText
            lightColor={Colors.light.textSecondary}
            darkColor={Colors.dark.textSecondary}
            style={styles.headerSubtitle}
          >
            Tell us a bit about yourself to personalize your experience.
          </ThemedText>
        </ThemedView>

        {/* Name Field */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedView style={styles.labelRow}>
            <User size={18} color={iconColor} />
            <ThemedText style={styles.label}>Full Name</ThemedText>
          </ThemedView>
          <TextInput
            style={inputStyle}
            placeholder="Enter your full name"
            placeholderTextColor={placeholderColor}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </ThemedView>

        {/* Email Field */}
        <ThemedView style={styles.fieldContainer}>
          <ThemedView style={styles.labelRow}>
            <Mail size={18} color={iconColor} />
            <ThemedText style={styles.label}>Email</ThemedText>
          </ThemedView>
          <TextInput
            style={inputStyle}
            placeholder="Enter your email"
            placeholderTextColor={placeholderColor}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </ThemedView>

        {/* Education Section */}
        <ThemedView style={styles.sectionContainer}>
           
          {/* College Name */}
          <ThemedView style={styles.fieldContainer}>
            <ThemedView style={styles.labelRow}>
              <Building2 size={18} color={iconColor} />
              <ThemedText style={styles.label}>College/University</ThemedText>
            </ThemedView>
            <TextInput
              style={inputStyle}
              placeholder="Enter your college name"
              placeholderTextColor={placeholderColor}
              value={education.collegeName}
              onChangeText={(value) => updateEducation('collegeName', value)}
              autoCapitalize="words"
            />
          </ThemedView>

          {/* Major */}
          <ThemedView style={styles.fieldContainer}>
            <ThemedView style={styles.labelRow}>
              <GraduationCap size={18} color={iconColor} />
              <ThemedText style={styles.label}>Major</ThemedText>
            </ThemedView>
            <TextInput
              style={inputStyle}
              placeholder="e.g. Computer Science"
              placeholderTextColor={placeholderColor}
              value={education.major}
              onChangeText={(value) => updateEducation('major', value)}
              autoCapitalize="words"
            />
          </ThemedView>

          {/* Duration */}
          <ThemedView style={styles.fieldContainer}>
            <ThemedView style={styles.labelRow}>
              <Calendar size={18} color={iconColor} />
              <ThemedText style={styles.label}>Duration</ThemedText>
            </ThemedView>

            {/* From Date */}
            <ThemedText style={styles.subLabel}>From</ThemedText>
            <ThemedView style={styles.dateRow}>
              <TextInput
                style={[inputStyle, styles.dateInput]}
                placeholder="MM"
                placeholderTextColor={placeholderColor}
                value={education.fromMonth}
                onChangeText={(value) => updateEducation('fromMonth', value)}
                keyboardType="number-pad"
                maxLength={2}
              />
              <TextInput
                style={[inputStyle, styles.yearInput]}
                placeholder="YYYY"
                placeholderTextColor={placeholderColor}
                value={education.fromYear}
                onChangeText={(value) => updateEducation('fromYear', value)}
                keyboardType="number-pad"
                maxLength={4}
              />
            </ThemedView>

            {/* To Date */}
            <ThemedText style={styles.subLabel}>To</ThemedText>
            <ThemedView style={styles.dateRow}>
              <TextInput
                style={[inputStyle, styles.dateInput]}
                placeholder="MM"
                placeholderTextColor={placeholderColor}
                value={education.toMonth}
                onChangeText={(value) => updateEducation('toMonth', value)}
                keyboardType="number-pad"
                maxLength={2}
              />
              <TextInput
                style={[inputStyle, styles.yearInput]}
                placeholder="YYYY"
                placeholderTextColor={placeholderColor}
                value={education.toYear}
                onChangeText={(value) => updateEducation('toYear', value)}
                keyboardType="number-pad"
                maxLength={4}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedText style={styles.skipText}>
          You can update these details later
        </ThemedText>
      </ThemedView>
    </ScrollView>
  )
}

export default Details

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
  fieldContainer: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 8,
    opacity: 0.7,
  },
  input: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    borderBlockColor: 'black',
    borderBottomWidth: 5,
  },
  sectionContainer: {
    width: '100%',
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 1,
    maxWidth: 80,
  },
  yearInput: {
    flex: 1,
    maxWidth: 120,
  },
  skipText: {
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.6,
  },
})