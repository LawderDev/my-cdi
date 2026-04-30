import { Calendar } from './containers/Calendar'
import { JournalEntryForm } from './containers/JournalEntryForm'
import { JournalEntryList } from './containers/JournalEntryList'
import { JournalEntryEditDialog } from '@frequentation/components/JournalEntryEditDialog'
import { useJournalPage } from './hooks/useJournalPage'

const PAGE_CLASSES = 'grid grid-cols-[320px_1fr] gap-6 h-full'
const LEFT_COLUMN_CLASSES = 'flex flex-col gap-4'
const RIGHT_COLUMN_CLASSES = 'flex flex-col gap-4 min-h-0'

export function JournalPage() {
  const {
    selectedDate,
    setSelectedDate,
    editingEntry,
    editingActivity,
    setEditingActivity,
    startEditing,
    closeEditDialog,
    activityOptions,
    submitEdit
  } = useJournalPage()

  return (
    <div className={PAGE_CLASSES}>
      <div className={LEFT_COLUMN_CLASSES}>
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <JournalEntryForm selectedDate={selectedDate} />
      </div>
      <div className={RIGHT_COLUMN_CLASSES}>
        <JournalEntryList selectedDate={selectedDate} onEditEntry={startEditing} />
      </div>
      {editingEntry && editingActivity ? (
        <JournalEntryEditDialog
          open
          activity={editingActivity}
          activities={activityOptions}
          onActivityChange={setEditingActivity}
          onSubmit={submitEdit}
          onClose={closeEditDialog}
          entry={editingEntry}
        />
      ) : null}
    </div>
  )
}
