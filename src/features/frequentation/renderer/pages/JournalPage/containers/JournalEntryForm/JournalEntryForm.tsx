import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Card } from '@ui/components/Card'
import { Button } from '@ui/components/Button'
import { Icon } from '@ui/components/Icon'
import { ActivityGrid } from '@frequentation/components/ActivityGrid'
import { useJournalEntryForm } from './hooks/useJournalEntryForm'
import { StudentMultiSelect } from './components/StudentMultiSelect'
import { TimeRow } from './components/TimeRow'

import { SECTION_LABEL_FONT_SIZE_PX, SECTION_LABEL_FONT_WEIGHT, FEEDBACK_AUTO_HIDE_MS } from './JournalEntryForm.styles'

interface JournalEntryFormProps {
  selectedDate: string
  onSubmitted?: () => void
}

export function JournalEntryForm({ selectedDate, onSubmitted }: JournalEntryFormProps) {
  const { t } = useTranslation('frequentation')
  const [timePickerOpen, setTimePickerOpen] = useState(false)
  const {
    form,
    handleSubmit,
    activityOptions,
    studentOptions,
    studentInputValue,
    setStudentInputValue,
    handleStudentSelect,
    handleStudentRemove,
    isStudentLoading,
    isSubmitting,
    submitError,
    submitSuccess,
    dismissFeedback
  } = useJournalEntryForm({ selectedDate, onSubmitted })

  const isDisabled = isSubmitting || !form.formState.isValid
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
      <Controller
        control={form.control}
        name="time"
        render={({ field }) => (
          <TimeRow
            value={field.value}
            onChange={field.onChange}
            ariaLabel={t('form.startsAt')}
            open={timePickerOpen}
            onOpen={() => setTimePickerOpen(true)}
            onClose={() => setTimePickerOpen(false)}
          />
        )}
      />
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
              inputValue={studentInputValue}
              onInputChange={setStudentInputValue}
              onSelect={(option) => handleStudentSelect(field.value, option.value)}
              onRemove={(id) => handleStudentRemove(field.value, id)}
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
