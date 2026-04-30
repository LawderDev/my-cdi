import { previousDayIso, nextDayIso, todayIso } from '../../helpers/journalDate'

interface UseJournalDateOptions {
  selectedDate: string
  onSelectedDateChange: (isoDate: string) => void
}

export function useJournalDate({ selectedDate, onSelectedDateChange }: UseJournalDateOptions) {
  function goToPreviousDay() {
    onSelectedDateChange(previousDayIso(selectedDate))
  }

  function goToNextDay() {
    onSelectedDateChange(nextDayIso(selectedDate))
  }

  function goToToday() {
    onSelectedDateChange(todayIso())
  }

  return { goToPreviousDay, goToNextDay, goToToday } as const
}
