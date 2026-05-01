import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
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
const TIME_INPUT_FONT_SIZE_PX = 14
const FEEDBACK_AUTO_HIDE_MS = 4000

export function JournalEntryForm({ selectedDate, onSubmitted }: JournalEntryFormProps) {
  const { t } = useTranslation('frequentation')
  const {
    form,
    handleSubmit,
    activityOptions,
    studentOptions,
    isStudentLoading,
    isSubmitting,
    submitError,
    submitSuccess,
    dismissFeedback
  } = useJournalEntryForm({ selectedDate, onSubmitted })

  const selectedStudentIds = form.watch('studentIds')
  const isDisabled = isSubmitting || selectedStudentIds.length === 0
  const showSuccess = submitSuccess && submitError === null

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
      <Box
        component="form"
        onSubmit={form.handleSubmit(handleSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Controller
          control={form.control}
          name="startsAt"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="datetime-local"
              size="small"
              fullWidth
              label={t('form.startsAt')}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <Icon
                      name="schedule"
                      style={{ fontSize: '18px', color: 'var(--text-dim)', marginRight: '8px' }}
                    />
                  ),
                  sx: {
                    fontFamily: MONO_FONT_FAMILY,
                    fontSize: `${TIME_INPUT_FONT_SIZE_PX}px`,
                    color: 'var(--accent)'
                  }
                }
              }}
            />
          )}
        />
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
      <Snackbar
        open={showSuccess}
        autoHideDuration={FEEDBACK_AUTO_HIDE_MS}
        onClose={dismissFeedback}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={dismissFeedback} variant="filled">
          {t('form.successMessage')}
        </Alert>
      </Snackbar>
      <Snackbar
        open={submitError !== null}
        autoHideDuration={FEEDBACK_AUTO_HIDE_MS}
        onClose={dismissFeedback}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={dismissFeedback} variant="filled">
          {submitError ?? ''}
        </Alert>
      </Snackbar>
    </Card>
  )
}
