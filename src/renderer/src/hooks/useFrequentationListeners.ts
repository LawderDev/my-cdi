import { useEffect } from 'react'
import dayjs from 'dayjs'

import { Student } from '../types/student'
import { Frequentation } from '../types/frequentation'

interface UseFrequentationListenersOptions {
  selectedDate: dayjs.Dayjs
  loadData: (date: dayjs.Dayjs) => void
  onStudentsReceived: (students: Student[]) => void
  onFrequentationsReceived: (frequentations: Frequentation[]) => void
  clearSelectedStudents: () => void
  clearSelectedFrequentations: () => void
}

export const useFrequentationListeners = ({
  selectedDate,
  loadData,
  onStudentsReceived,
  onFrequentationsReceived,
  clearSelectedStudents,
  clearSelectedFrequentations
}: UseFrequentationListenersOptions): void => {
  useEffect(() => {
    const handleStudentsWithoutFrequentation = (
      _event: unknown,
      response: { success: boolean; data: Student[] }
    ): void => {
      if (response.success) {
        onStudentsReceived(response.data)
      }
    }

    const handleFrequentationsByDate = (
      _event: unknown,
      response: { success: boolean; data: Frequentation[] }
    ): void => {
      if (response.success) {
        onFrequentationsReceived(response.data)
      }
    }

    const handleCreateFrequentation = (
      _event: unknown,
      response: { success: boolean; data: Student[] }
    ): void => {
      if (response.success) {
        loadData(selectedDate)
        clearSelectedStudents()
      }
    }

    const handleDeleteFrequentations = (
      _event: unknown,
      response: { success: boolean; ids: number[] }
    ): void => {
      if (response.success) {
        loadData(selectedDate)
        clearSelectedFrequentations()
      }
    }

    const removeStudentsListener = window.electron.ipcRenderer.on(
      'student:getWithoutFrequentationAt:response',
      handleStudentsWithoutFrequentation
    )

    const removeFrequentationsListener = window.electron.ipcRenderer.on(
      'frequentation:getByDate:response',
      handleFrequentationsByDate
    )

    const removeCreateFrequentationListener = window.electron.ipcRenderer.on(
      'frequentation:addMultiple:response',
      handleCreateFrequentation
    )

    const removeDeleteFrequentationsListener = window.electron.ipcRenderer.on(
      'frequentation:delete:response',
      handleDeleteFrequentations
    )

    loadData(selectedDate)

    return () => {
      removeStudentsListener()
      removeFrequentationsListener()
      removeCreateFrequentationListener()
      removeDeleteFrequentationsListener()
    }
  }, [
    selectedDate,
    loadData,
    onStudentsReceived,
    onFrequentationsReceived,
    clearSelectedStudents,
    clearSelectedFrequentations
  ])
}
