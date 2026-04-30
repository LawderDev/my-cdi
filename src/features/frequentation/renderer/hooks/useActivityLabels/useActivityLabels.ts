import { useTranslation } from 'react-i18next'
import { ActivityType } from '@types'

export function useActivityLabels() {
  const { t } = useTranslation('frequentation')

  function getLabel(activity: ActivityType): string {
    return t(`activity.${activity}`)
  }

  const allActivities = Object.values(ActivityType)

  return { getLabel, allActivities } as const
}
