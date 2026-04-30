import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { activityTypeSchema } from '@frequentation/validations/activityTypeSchema'
import type { ActivityType } from '@types'

interface ActivityOption {
  value: ActivityType
  label: string
}

interface ActivityRadioGroupProps {
  activities: ActivityOption[]
  value: ActivityType
  onChange: (next: ActivityType) => void
}

export function ActivityRadioGroup({ activities, value, onChange }: ActivityRadioGroupProps) {
  const { t } = useTranslation('frequentation')

  function handleChange(rawValue: string) {
    const parsed = activityTypeSchema.safeParse(rawValue)
    if (parsed.success) {
      onChange(parsed.data)
    }
  }

  return (
    <FormControl>
      <FormLabel>{t('form.selectActivity')}</FormLabel>
      <RadioGroup row value={value} onChange={(event) => handleChange(event.target.value)}>
        {activities.map((activity) => (
          <FormControlLabel
            key={activity.value}
            value={activity.value}
            control={<Radio />}
            label={activity.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
