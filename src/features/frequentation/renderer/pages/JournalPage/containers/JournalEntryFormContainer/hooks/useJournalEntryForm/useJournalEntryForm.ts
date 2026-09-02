import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useToast } from '@ui/hooks/useToast'
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
  const { t } = useTranslation('frequentation')
  const { mutate, isPending } = useCreateFrequentationBatch()
  const { allActivities, getLabel } = useActivityLabels()
  const { data: students, isLoading: isStudentLoading } = useStudentList()
  const { toast, show, dismiss } = useToast()
  const [studentInputValue, setStudentInputValue] = useState('')

  const form = useForm<JournalEntryFormData>({
    resolver: zodResolver(journalEntryFormSchema),
    mode: 'onChange',
    defaultValues: buildDefaultValues()
  })

  const activityOptions = buildActivityOptions(allActivities, getLabel)

  const studentOptions = (students ?? []).map((student) => ({
    id: student.id,
    displayName: student.displayName,
    classe: student.classe
  }))

  function handleSubmit(values: JournalEntryFormData) {
    mutate(mapFormToBatchDto(values, selectedDate), {
      onSuccess: () => {
        form.reset(buildDefaultValues())
        show(t('form.successMessage'))
        if (onSubmitted) {
          onSubmitted()
        }
      },
      onError: (error: Error) => {
        show(error.message, 'error')
      }
    })
  }

  function handleStudentSelect(currentIds: number[], nextId: number) {
    if (currentIds.includes(nextId)) {
      return
    }
    setStudentInputValue('')
    form.setValue('studentIds', [...currentIds, nextId], { shouldValidate: true })
  }

  function handleStudentRemove(currentIds: number[], idToRemove: number) {
    form.setValue(
      'studentIds',
      currentIds.filter((id) => id !== idToRemove),
      { shouldValidate: true }
    )
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
    toast,
    dismissToast: dismiss
  } as const
}
