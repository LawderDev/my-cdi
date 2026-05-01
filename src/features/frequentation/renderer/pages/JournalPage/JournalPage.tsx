import Box from '@mui/material/Box'
import { Calendar } from './containers/Calendar'
import { JournalEntryForm } from './containers/JournalEntryForm'
import { JournalEntryList } from './containers/JournalEntryList'
import { JournalEntryEditDialog } from '@frequentation/components/JournalEntryEditDialog'
import { useJournalPage } from './hooks/useJournalPage'

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
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gridTemplateRows: '1fr',
        gap: 3,
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 3 }}>
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <JournalEntryForm selectedDate={selectedDate} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 3 }}>
        <JournalEntryList selectedDate={selectedDate} onEditEntry={startEditing} />
      </Box>
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
    </Box>
  )
}
