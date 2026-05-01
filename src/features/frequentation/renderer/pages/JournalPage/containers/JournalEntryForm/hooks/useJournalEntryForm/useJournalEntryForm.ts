import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { useCreateFrequentationBatch } from '@frequentation/api/useFrequentationMutations'
import { useActivityLabels } from '@frequentation/hooks/useActivityLabels'
import { useStudentList } from '@student/api/useStudentQueries'
import { buildActivityOptions } from '@frequentation/helpers/buildActivityOptions'
import { ActivityType } from '@types'
import { journalEntryFormSchema } from '../../validations/journalEntryFormSchema'
import { mapFormToBatchDto } from '../../helpers/mapFormToBatchDto'
import type { JournalEntryFormData } from '../../types/JournalEntryFormData'

interface UseJournalEntryFormOptions {
  selectedDate: string
  onSubmitted?: () => void
}

const TIME_FORMAT = 'HH:mm'
const NOON_HOUR = 12

function buildDefaultTime(): string {
  return dayjs().format(TIME_FORMAT)
}

function buildDefaultValues(): JournalEntryFormData {
  return {
    studentIds: [],
    activity: ActivityType.WORK,
    time: buildDefaultTime()
  }
}

function periodFromTime(time: string): 'matin' | 'aprem' {
  const [hourPart] = time.split(':')
  const hour = Number.parseInt(hourPart ?? '', 10)
  if (!Number.isFinite(hour) || hour < NOON_HOUR) {
    return 'matin'
  }
  return 'aprem'
}

export function useJournalEntryForm({ selectedDate, onSubmitted }: UseJournalEntryFormOptions) {
  const { t } = useTranslation('frequentation')
  const { mutate, isPending } = useCreateFrequentationBatch()
  const { allActivities, getLabel } = useActivityLabels()
  const { data: students, isLoading: isStudentLoading } = useStudentList()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

  const form = useForm<JournalEntryFormData>({
    resolver: zodResolver(journalEntryFormSchema),
    defaultValues: buildDefaultValues()
  })

  const studentIds = useWatch({ control: form.control, name: 'studentIds' })
  const time = useWatch({ control: form.control, name: 'time' })
  const period = periodFromTime(time)
  const periodLabel = period === 'matin' ? t('period.matin') : t('period.aprem')

  const activityOptions = buildActivityOptions(allActivities, getLabel)

  const studentOptions = (students ?? []).map((student) => ({
    id: student.id,
    displayName: student.displayName,
    classe: student.classe
  }))

  function dismissFeedback() {
    setSubmitError(null)
    setSubmitSuccess(false)
  }

  function handleSubmit(values: JournalEntryFormData) {
    setSubmitError(null)
    setSubmitSuccess(false)
    mutate(mapFormToBatchDto(values, selectedDate), {
      onSuccess: () => {
        form.reset(buildDefaultValues())
        setSubmitSuccess(true)
        if (onSubmitted) {
          onSubmitted()
        }
      },
      onError: (error: Error) => {
        setSubmitError(error.message)
      }
    })
  }

  return {
    form,
    handleSubmit,
    activityOptions,
    studentOptions,
    studentIds,
    isStudentLoading,
    isSubmitting: isPending,
    time,
    periodLabel,
    submitError,
    submitSuccess,
    dismissFeedback
  } as const
}
