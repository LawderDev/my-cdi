// Activity types enum - stored in English in database, translated to French in UI
export enum ActivityType {
  WORK = 'work',
  READING = 'reading',
  COMPUTER = 'computer',
  RELAXATION = 'relaxation',
  OTHER = 'other'
}

// French translations for UI display
export const ACTIVITY_TRANSLATIONS: Record<ActivityType, string> = {
  [ActivityType.WORK]: 'Travail',
  [ActivityType.READING]: 'Lecture',
  [ActivityType.COMPUTER]: 'Ordinateur',
  [ActivityType.RELAXATION]: 'Détente',
  [ActivityType.OTHER]: 'Autre'
}

// Activity options for autocomplete (French labels)
export const ACTIVITY_OPTIONS = Object.values(ACTIVITY_TRANSLATIONS)

// Translation utility functions
export const translateActivityToFrench = (englishValue: string): string => {
  const activityType = Object.values(ActivityType).find((value) => value === englishValue)
  return activityType ? ACTIVITY_TRANSLATIONS[activityType] : englishValue
}

export const translateActivityToEnglish = (frenchValue: string): string => {
  const entry = Object.entries(ACTIVITY_TRANSLATIONS).find(([, fr]) => fr === frenchValue)
  return entry ? entry[0] : ActivityType.OTHER
}
