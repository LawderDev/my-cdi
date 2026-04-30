import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import { useJournalEntryForm } from './hooks/useJournalEntryForm'
import { StudentMultiSelect } from './components/StudentMultiSelect'
import { ActivityRadioGroup } from './components/ActivityRadioGroup'
import { JournalEntryFormActions } from './components/JournalEntryFormActions'

interface JournalEntryFormProps {
  open: boolean
  selectedDate: string
  onClose: () => void
}

export function JournalEntryForm({ open, selectedDate, onClose }: JournalEntryFormProps) {
  const { t } = useTranslation('frequentation')
  const { form, handleSubmit, activityOptions, studentOptions, isStudentLoading, isSubmitting } =
    useJournalEntryForm({ selectedDate, onSubmitted: onClose })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('addEntries')}</DialogTitle>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
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
                <ActivityRadioGroup
                  activities={activityOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <JournalEntryFormActions isSubmitting={isSubmitting} onCancel={onClose} />
      </form>
    </Dialog>
  )
}
