import { useEffect, Dispatch, SetStateAction } from 'react'
import dayjs from 'dayjs'

import { Student } from '../types/student'
import { Frequentation } from '../types/frequentation'

interface UseFrequentationListenersOptions {
  selectedDate: dayjs.Dayjs
  onStudentsReceived: (students: Student[]) => void
  onFrequentationsReceived: (frequentations: Frequentation[]) => void
  setSelectedStudents: Dispatch<SetStateAction<Student[]>>
  setSelectedFrequentations: Dispatch<SetStateAction<number[]>>
}

export const useFrequentationListeners = ({
  selectedDate,
  onStudentsReceived,
  onFrequentationsReceived,
  setSelectedStudents,
  setSelectedFrequentations
}: UseFrequentationListenersOptions): void => {
  useEffect(() => {
    const sendLoadData = (date: dayjs.Dayjs): void => {
      const formattedDate = date.format('YYYY-MM-DD')
      window.electron.ipcRenderer.send('student:getWithoutFrequentationAt', formattedDate)
      window.electron.ipcRenderer.send('frequentation:getByDate', formattedDate)
    }

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
        // reload data directly from the hook to avoid requiring a stable loadData prop
        sendLoadData(selectedDate)
        setSelectedStudents([])
      }
    }

    const handleDeleteFrequentations = (
      _event: unknown,
      response: { success: boolean; ids: number[] }
    ): void => {
      if (response.success) {
        // reload data directly from the hook to avoid requiring a stable loadData prop
        sendLoadData(selectedDate)
        setSelectedFrequentations([])
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

    sendLoadData(selectedDate)

    return () => {
      removeStudentsListener()
      removeFrequentationsListener()
      removeCreateFrequentationListener()
      removeDeleteFrequentationsListener()
    }
  }, [
    selectedDate,
    onStudentsReceived,
    onFrequentationsReceived,
    setSelectedStudents,
    setSelectedFrequentations
  ])
}
