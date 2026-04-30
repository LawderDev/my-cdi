import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import { Card } from '@ui/components/Card'
import { Button } from '@ui/components/Button'
import { Icon } from '@ui/components/Icon'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { ActivityGrid } from '@frequentation/components/ActivityGrid'
import { useJournalEntryForm } from './hooks/useJournalEntryForm'
import { StudentMultiSelect } from './components/StudentMultiSelect'

interface JournalEntryFormProps {
  selectedDate: string
  onSubmitted?: () => void
}

const SECTION_LABEL_FONT_SIZE_PX = 11
const SECTION_LABEL_FONT_WEIGHT = 600

const TIME_ICON_FONT_SIZE_PX = 18
const TIME_DISPLAY_FONT_SIZE_PX = 20
const TIME_DISPLAY_FONT_WEIGHT = 600
const TIME_PERIOD_FONT_SIZE_PX = 11
const TIME_PERIOD_FONT_WEIGHT = 500

export function JournalEntryForm({ selectedDate, onSubmitted }: JournalEntryFormProps) {
  const { t } = useTranslation('frequentation')
  const {
    form,
    handleSubmit,
    activityOptions,
    studentOptions,
    isStudentLoading,
    isSubmitting,
    time,
    periodLabel
  } = useJournalEntryForm({ selectedDate, onSubmitted })

  const selectedStudentIds = form.watch('studentIds')
  const isDisabled = isSubmitting || selectedStudentIds.length === 0

  return (
    <Card>
      <Box
        sx={{
          fontSize: `${SECTION_LABEL_FONT_SIZE_PX}px`,
          fontWeight: SECTION_LABEL_FONT_WEIGHT,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          color: 'var(--text-dim)',
          mb: 1.25
        }}
      >
        {t('form.newEntry')}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Icon
          name="schedule"
          style={{ fontSize: `${TIME_ICON_FONT_SIZE_PX}px`, color: 'var(--text-dim)' }}
        />
        <Box
          component="span"
          sx={{
            fontFamily: MONO_FONT_FAMILY,
            fontSize: `${TIME_DISPLAY_FONT_SIZE_PX}px`,
            fontWeight: TIME_DISPLAY_FONT_WEIGHT,
            color: 'var(--accent)',
            letterSpacing: '1px'
          }}
        >
          {time}
        </Box>
        <Box
          component="span"
          sx={{
            fontSize: `${TIME_PERIOD_FONT_SIZE_PX}px`,
            color: 'var(--text-dim)',
            fontWeight: TIME_PERIOD_FONT_WEIGHT,
            px: 1,
            py: 0.25,
            bgcolor: 'var(--surface)',
            borderRadius: 'var(--radius-xs)'
          }}
        >
          {periodLabel}
        </Box>
      </Box>
      <Box
        component="form"
        onSubmit={form.handleSubmit(handleSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Controller
          control={form.control}
          name="studentIds"
          render={({ field }) => (
            <StudentMultiSelect
              students={studentOptions}
              selectedIds={field.value}
              onChange={field.onChange}
              loading={isStudentLoading}
            />
          )}
        />
        <Controller
          control={form.control}
          name="activity"
          render={({ field }) => (
            <ActivityGrid options={activityOptions} value={field.value} onChange={field.onChange} />
          )}
        />
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isDisabled}
          iconLeft={<Icon name="check_circle" />}
        >
          {t('form.submit')}
        </Button>
      </Box>
    </Card>
  )
}
