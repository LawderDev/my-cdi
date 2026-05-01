import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ButtonBase from '@mui/material/ButtonBase'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
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
const FEEDBACK_AUTO_HIDE_MS = 4000
const TIME_FORMAT = 'HH:mm'

export function JournalEntryForm({ selectedDate, onSubmitted }: JournalEntryFormProps) {
  const { t } = useTranslation('frequentation')
  const {
    form,
    handleSubmit,
    activityOptions,
    studentOptions,
    studentIds,
    isStudentLoading,
    isSubmitting,
    periodLabel,
    submitError,
    submitSuccess,
    dismissFeedback
  } = useJournalEntryForm({ selectedDate, onSubmitted })

  const isDisabled = isSubmitting || studentIds.length === 0
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
            periodLabel={periodLabel}
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

interface TimeRowProps {
  value: string
  onChange: (next: string) => void
  ariaLabel: string
  periodLabel: string
}

function TimeRow({ value, onChange, ariaLabel, periodLabel }: TimeRowProps) {
  const [open, setOpen] = useState<boolean>(false)
  const dateValue = dayjs(`2000-01-01T${value}`)

  function handleAccept(next: Dayjs | null): void {
    if (next === null) {
      return
    }
    onChange(next.format(TIME_FORMAT))
  }

  function handleOpen(): void {
    setOpen(true)
  }

  function handleClose(): void {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <ButtonBase
        onClick={handleOpen}
        aria-label={ariaLabel}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          borderRadius: 'var(--radius-xs)',
          px: 0.5,
          py: 0.25,
          transition: 'background 0.15s',
          '&:hover': { bgcolor: 'var(--surface)' },
          '&:focus-visible': { outline: '2px solid var(--accent-border)', outlineOffset: '2px' }
        }}
      >
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
          {value}
        </Box>
      </ButtonBase>
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
      <MobileTimePicker
        open={open}
        value={dateValue}
        onAccept={handleAccept}
        onClose={handleClose}
        ampm={false}
        slotProps={{
          textField: { sx: { display: 'none' } },
          dialog: { 'aria-label': ariaLabel }
        }}
      />
    </Box>
  )
}
