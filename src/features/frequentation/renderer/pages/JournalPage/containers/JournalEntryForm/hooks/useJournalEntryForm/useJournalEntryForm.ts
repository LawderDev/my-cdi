import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCreateFrequentationBatch } from '@frequentation/api/useFrequentationMutations'
import { useActivityLabels } from '@frequentation/hooks/useActivityLabels'
import { useStudentList } from '@student/api/useStudentQueries'
import { buildActivityOptions } from '@frequentation/helpers/buildActivityOptions'
import { useClock } from '@ui/components/Header/hooks/useClock'
import { ActivityType } from '@types'
import { journalEntryFormSchema } from '../../validations/journalEntryFormSchema'
import { mapFormToBatchDto } from '../../helpers/mapFormToBatchDto'
import type { JournalEntryFormData } from '../../types/JournalEntryFormData'

interface UseJournalEntryFormOptions {
  selectedDate: string
  onSubmitted?: () => void
}

const DEFAULT_VALUES: JournalEntryFormData = {
  studentIds: [],
  activity: ActivityType.WORK
}

export function useJournalEntryForm({ selectedDate, onSubmitted }: UseJournalEntryFormOptions) {
  const { t } = useTranslation('frequentation')
  const { mutate, isPending } = useCreateFrequentationBatch()
  const { allActivities, getLabel } = useActivityLabels()
  const { data: students, isLoading: isStudentLoading } = useStudentList()
  const { time, period } = useClock()

  const form = useForm<JournalEntryFormData>({
    resolver: zodResolver(journalEntryFormSchema),
    defaultValues: DEFAULT_VALUES
  })

  const activityOptions = buildActivityOptions(allActivities, getLabel)

  const studentOptions = (students ?? []).map((student) => ({
    id: student.id,
    displayName: student.displayName,
    classe: student.classe
  }))

  const periodLabel = period === 'matin' ? t('period.matin') : t('period.aprem')

  function handleSubmit(values: JournalEntryFormData) {
    mutate(mapFormToBatchDto(values, selectedDate), {
      onSuccess: () => {
        form.reset(DEFAULT_VALUES)
        if (onSubmitted) {
          onSubmitted()
        }
      }
    })
  }

  return {
    form,
    handleSubmit,
    activityOptions,
    studentOptions,
    isStudentLoading,
    isSubmitting: isPending,
    time,
    period,
    periodLabel
  } as const
}
