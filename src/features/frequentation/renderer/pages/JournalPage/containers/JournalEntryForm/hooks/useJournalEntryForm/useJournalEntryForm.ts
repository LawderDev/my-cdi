import { useState } from 'react'
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

const TIME_FORMAT = 'HH:mm'

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

export function useJournalEntryForm({ selectedDate, onSubmitted }: UseJournalEntryFormOptions) {
  const { mutate, isPending } = useCreateFrequentationBatch()
  const { allActivities, getLabel } = useActivityLabels()
  const { data: students, isLoading: isStudentLoading } = useStudentList()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [studentInputValue, setStudentInputValue] = useState('')

  const form = useForm<JournalEntryFormData>({
    resolver: zodResolver(journalEntryFormSchema),
    defaultValues: buildDefaultValues()
  })

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

  function handleStudentSelect(currentIds: number[], nextId: number) {
    if (currentIds.includes(nextId)) {
      return
    }
    setStudentInputValue('')
    form.setValue('studentIds', [...currentIds, nextId])
  }

  function handleStudentRemove(currentIds: number[], idToRemove: number) {
    form.setValue('studentIds', currentIds.filter((id) => id !== idToRemove))
  }

  return {
    form,
    handleSubmit,
    activityOptions,
    studentOptions,
    studentInputValue,
    setStudentInputValue,
    handleStudentSelect,
    handleStudentRemove,
    isStudentLoading,
    isSubmitting: isPending,
    submitError,
    submitSuccess,
    dismissFeedback
  } as const
}
