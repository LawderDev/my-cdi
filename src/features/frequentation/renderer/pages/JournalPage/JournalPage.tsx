import Box from '@mui/material/Box'
import { Calendar } from './containers/Calendar'
import { JournalEntryForm } from './containers/JournalEntryForm'
import { JournalEntryList } from './containers/JournalEntryList'
import { JournalEntryEditDialog } from '@frequentation/components/JournalEntryEditDialog'
import { buildActivityTiles } from '@frequentation/components/ActivityGrid/helpers/buildActivityTiles'
import { buildActivityTileNodes } from '@frequentation/components/ActivityGrid/helpers/buildActivityTileNodes'
import { buildInitials } from '@frequentation/helpers/buildInitials'
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
          tileNodes={buildActivityTileNodes(
            buildActivityTiles(activityOptions, editingActivity, setEditingActivity)
          )}
          onSubmit={submitEdit}
          onClose={closeEditDialog}
          entry={{
            initials: buildInitials(editingEntry.student.prenom, editingEntry.student.nom),
            colorSeed: editingEntry.student.id,
            displayName: editingEntry.student.displayName,
            classe: editingEntry.student.classe
          }}
        />
      ) : null}
    </Box>
  )
}
