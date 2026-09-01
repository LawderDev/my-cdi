import { CalendarContainer } from './containers/CalendarContainer'
import { JournalEntryFormContainer } from './containers/JournalEntryFormContainer'
import { JournalEntryListContainer } from './containers/JournalEntryListContainer'
import { JournalEntryEditDialogPresenter } from '@frequentation/components/JournalEntryEditDialogPresenter'
import { buildActivityTiles } from '@frequentation/components/ActivityGridPresenter/helpers/buildActivityTiles'
import { buildActivityTileNodes } from '@frequentation/components/ActivityGridPresenter/helpers/buildActivityTileNodes'
import { buildInitials } from '@frequentation/helpers/buildInitials'
import { useJournalPage } from './hooks/useJournalPage'
import { PageGrid, SideColumn } from './JournalPage.styles'

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
    <PageGrid>
      <SideColumn>
        <CalendarContainer selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        <JournalEntryFormContainer selectedDate={selectedDate} />
      </SideColumn>
      <SideColumn>
        <JournalEntryListContainer selectedDate={selectedDate} onEditEntry={startEditing} />
      </SideColumn>
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
    </PageGrid>
  )
}
