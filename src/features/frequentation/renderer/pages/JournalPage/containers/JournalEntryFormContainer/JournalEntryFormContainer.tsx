import { useState } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Card } from '@ui/components/Card'
import { Button } from '@ui/components/Button'
import { Icon } from '@ui/components/Icon'
import { ActivityGridPresenter } from '@frequentation/components/ActivityGridPresenter'
import { buildActivityTiles } from '@frequentation/components/ActivityGridPresenter/helpers/buildActivityTiles'
import { buildActivityTileNodes } from '@frequentation/components/ActivityGridPresenter/helpers/buildActivityTileNodes'
import { useJournalEntryForm } from './hooks/useJournalEntryForm'
import { StudentMultiSelectPresenter } from './components/StudentMultiSelectPresenter'
import { Chip } from '@ui/components/Chip'
import type { AutocompleteOption } from '@ui/components/Autocomplete'
import { TimeRowPresenter } from './components/TimeRowPresenter'
import { periodFromTime } from './components/TimeRowPresenter/helpers/periodFromTime'

import {
  SECTION_LABEL_FONT_SIZE_PX,
  SECTION_LABEL_FONT_WEIGHT,
  FEEDBACK_AUTO_HIDE_MS
} from './JournalEntryFormContainer.styles'

const TIME_FORMAT = 'HH:mm'

interface StudentChip {
  id: number
  label: string
  onRemove: () => void
}

interface JournalEntryFormContainerProps {
  selectedDate: string
  onSubmitted?: () => void
}

export function JournalEntryFormContainer({
  selectedDate,
  onSubmitted
}: JournalEntryFormContainerProps) {
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

  function buildStudentChips(selectedIds: number[]): StudentChip[] {
    return studentOptions
      .filter((student) => selectedIds.includes(student.id))
      .map((student) => ({
        id: student.id,
        label: student.displayName,
        onRemove: () => {
          handleStudentRemove(selectedIds, student.id)
        }
      }))
  }

  function buildStudentOptions(): AutocompleteOption<number>[] {
    return studentOptions.map((student) => ({
      value: student.id,
      label: student.displayName,
      badge: student.classe
    }))
  }

  function buildStudentChipNodes(selectedIds: number[]): ReactNode[] {
    return buildStudentChips(selectedIds).map((chip) => (
      <Chip key={chip.id} label={chip.label} onRemove={chip.onRemove} />
    ))
  }

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
        render={({ field }) => {
          const dateValue = dayjs(`2000-01-01T${field.value}`)
          const period = periodFromTime(field.value)
          return (
            <TimeRowPresenter
              value={field.value}
              dateValue={dateValue}
              periodLabel={period === 'morning' ? t('period.morning') : t('period.afternoon')}
              onCommit={(next) => {
                if (next !== null) {
                  field.onChange(next.format(TIME_FORMAT))
                }
              }}
              ariaLabel={t('form.startsAt')}
              open={timePickerOpen}
              onOpen={() => setTimePickerOpen(true)}
              onClose={() => setTimePickerOpen(false)}
            />
          )
        }}
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
            <StudentMultiSelectPresenter
              options={buildStudentOptions()}
              selectedIds={field.value}
              chipNodes={buildStudentChipNodes(field.value)}
              inputValue={studentInputValue}
              onInputChange={setStudentInputValue}
              onSelect={(option) => handleStudentSelect(field.value, option.value)}
              loading={isStudentLoading}
            />
          )}
        />
        <Controller
          control={form.control}
          name="activity"
          render={({ field }) => (
            <ActivityGridPresenter
              tileNodes={buildActivityTileNodes(
                buildActivityTiles(activityOptions, field.value, field.onChange)
              )}
            />
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
