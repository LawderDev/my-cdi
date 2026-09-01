import Box from '@mui/material/Box'
import { CalendarContainer } from './containers/CalendarContainer'
import { JournalEntryFormContainer } from './containers/JournalEntryFormContainer'
import { JournalEntryListContainer } from './containers/JournalEntryListContainer'
import { JournalEntryEditDialogPresenter } from '@frequentation/components/JournalEntryEditDialogPresenter'
import { buildActivityTiles } from '@frequentation/components/ActivityGridPresenter/helpers/buildActivityTiles'
import { buildActivityTileNodes } from '@frequentation/components/ActivityGridPresenter/helpers/buildActivityTileNodes'
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
        <CalendarContainer selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <JournalEntryFormContainer selectedDate={selectedDate} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 3 }}>
        <JournalEntryListContainer selectedDate={selectedDate} onEditEntry={startEditing} />
      </Box>
      {editingEntry && editingActivity ? (
        <JournalEntryEditDialogPresenter
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
