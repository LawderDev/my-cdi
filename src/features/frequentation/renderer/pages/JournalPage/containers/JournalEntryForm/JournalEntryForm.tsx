import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import { Card } from '@ui/components/Card'
import { Button } from '@ui/components/Button'
import { Icon } from '@ui/components/Icon'
import { ActivityGrid } from '@frequentation/components/ActivityGrid'
import { useJournalEntryForm } from './hooks/useJournalEntryForm'
import { StudentMultiSelect } from './components/StudentMultiSelect'

interface JournalEntryFormProps {
  selectedDate: string
  onSubmitted?: () => void
}

const SECTION_LABEL_CLASSES =
  'text-[11px] font-semibold uppercase tracking-wider text-text-dim mb-2.5'

const TIME_ROW_CLASSES = 'flex items-center gap-2 mb-4'
const TIME_ICON_CLASSES = 'text-text-dim text-lg'
const TIME_DISPLAY_CLASSES = 'font-mono text-xl font-semibold text-accent tracking-wider'
const TIME_PERIOD_CLASSES =
  'text-[11px] text-text-dim font-medium px-2 py-0.5 bg-surface rounded-xs'

const FORM_CLASSES = 'space-y-4'

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
      <div className={SECTION_LABEL_CLASSES}>{t('form.newEntry')}</div>
      <div className={TIME_ROW_CLASSES}>
        <Icon name="schedule" className={TIME_ICON_CLASSES} />
        <span className={TIME_DISPLAY_CLASSES}>{time}</span>
        <span className={TIME_PERIOD_CLASSES}>{periodLabel}</span>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={FORM_CLASSES}>
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
      </form>
    </Card>
  )
}
