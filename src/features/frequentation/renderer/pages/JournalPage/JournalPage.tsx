import { Container, Typography, Box } from '@mui/material'
import { useJournalPage } from './hooks/useJournalPage'
import { JournalDateNavigator } from './containers/JournalDateNavigator'
import { JournalEntryList } from './containers/JournalEntryList'
import { JournalEntryForm } from './containers/JournalEntryForm'
import { JournalEntryEditDialog } from '@frequentation/components/JournalEntryEditDialog'

const CONTAINER_TOP_MARGIN = 3
const TITLE_BOTTOM_MARGIN = 2

export function JournalPage() {
  const {
    selectedDate,
    setSelectedDate,
    isAddDialogOpen,
    closeAddDialog,
    editingEntry,
    editingActivity,
    setEditingActivity,
    startEditing,
    closeEditDialog,
    title,
    activityOptions,
    submitEdit
  } = useJournalPage()

  return (
    <Container sx={{ mt: CONTAINER_TOP_MARGIN }}>
      <Box sx={{ mb: TITLE_BOTTOM_MARGIN }}>
        <Typography variant="h4">{title}</Typography>
      </Box>

      <JournalDateNavigator selectedDate={selectedDate} onSelectedDateChange={setSelectedDate} />

      <JournalEntryList selectedDate={selectedDate} onEditEntry={startEditing} />

      {isAddDialogOpen ? (
        <JournalEntryForm selectedDate={selectedDate} onSubmitted={closeAddDialog} />
      ) : null}

      {editingEntry && editingActivity && (
        <JournalEntryEditDialog
          open
          activity={editingActivity}
          activities={activityOptions}
          onActivityChange={setEditingActivity}
          onSubmit={submitEdit}
          onClose={closeEditDialog}
        />
      )}
    </Container>
  )
}
