import { useCallback } from 'react'

import type { Dayjs } from 'dayjs'
import type { Student } from '../types/student'

interface UseJournalDateManagementParams {
  selectedStudents: Student[]
  selectedFrequentations: number[]
  onSelectionClear: () => void
  onFrequentationsClear: () => void
  fetchDailyDataAt: (date: Dayjs) => void
}

export const useJournalDateManagement = ({
  selectedStudents,
  selectedFrequentations,
  onSelectionClear,
  onFrequentationsClear,
  fetchDailyDataAt
}: UseJournalDateManagementParams): { handleDateChange: (newValue: Dayjs | null) => void } => {
  const handleDateChange = useCallback(
    (newValue: Dayjs | null): void => {
      if (newValue) {
        // Clear selections when date changes
        if (selectedStudents.length > 0) {
          onSelectionClear()
        }
        if (selectedFrequentations.length > 0) {
          onFrequentationsClear()
        }
        fetchDailyDataAt(newValue)
      }
    },
    [
      selectedStudents,
      selectedFrequentations,
      onSelectionClear,
      onFrequentationsClear,
      fetchDailyDataAt
    ]
  )

  return {
    handleDateChange
  }
}
