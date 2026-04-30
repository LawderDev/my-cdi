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
    openAddDialog,
    closeAddDialog,
    editingEntry,
    setEditingEntry,
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

      <JournalEntryList
        selectedDate={selectedDate}
        onAddClick={openAddDialog}
        onEditEntry={setEditingEntry}
      />

      <JournalEntryForm
        open={isAddDialogOpen}
        selectedDate={selectedDate}
        onClose={closeAddDialog}
      />

      {editingEntry && (
        <JournalEntryEditDialog
          open
          currentActivity={editingEntry.activity}
          activities={activityOptions}
          onSubmit={submitEdit}
          onClose={closeEditDialog}
        />
      )}
    </Container>
  )
}
