import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

const DATETIME_LOCAL_FORMAT = 'YYYY-MM-DDTHH:mm'

function buildDefaultStartsAt(selectedDate: string): string {
  const now = dayjs()
  return dayjs(selectedDate).hour(now.hour()).minute(now.minute()).format(DATETIME_LOCAL_FORMAT)
}

function buildDefaultValues(selectedDate: string): JournalEntryFormData {
  return {
    studentIds: [],
    activity: ActivityType.WORK,
    startsAt: buildDefaultStartsAt(selectedDate)
  }
}

export function useJournalEntryForm({ selectedDate, onSubmitted }: UseJournalEntryFormOptions) {
  const { mutate, isPending } = useCreateFrequentationBatch()
  const { allActivities, getLabel } = useActivityLabels()
  const { data: students, isLoading: isStudentLoading } = useStudentList()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

  const form = useForm<JournalEntryFormData>({
    resolver: zodResolver(journalEntryFormSchema),
    defaultValues: buildDefaultValues(selectedDate)
  })

  useEffect(() => {
    form.setValue('startsAt', buildDefaultStartsAt(selectedDate), { shouldDirty: false })
  }, [selectedDate, form])

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
    mutate(mapFormToBatchDto(values), {
      onSuccess: () => {
        form.reset(buildDefaultValues(selectedDate))
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
    isStudentLoading,
    isSubmitting: isPending,
    submitError,
    submitSuccess,
    dismissFeedback
  } as const
}
