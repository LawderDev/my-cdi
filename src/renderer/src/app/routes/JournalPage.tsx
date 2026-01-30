import { FC, useState } from 'react'
import { Container } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'

import {
  JournalDatePicker,
  StudentSelector,
  JournalBatchActions
} from '../../features/journal/components'
import { StudentTable } from '../../components/shared/StudentTable'
import { ConfirmationDialog } from '../../components/dialogs'
import { FrequentationEditDialog } from '../../components/dialogs/FrequentationEditDialog'
import { useJournalData } from '../../features/journal/hooks/useJournalData'
import { useJournalStudentSelection } from '../../features/journal/hooks/useJournalStudentSelection'
import { useJournalBatchOperations } from '../../features/journal/hooks/useJournalBatchOperations'
import { useFrequentationActions } from '../../features/journal/hooks/useFrequentationActions'
import type { StudentViewModel } from '../../types/view.models'
import type { FrequentationViewModel } from '../../types/view.models'
import { rootContainerStyles, layoutContainerStyles } from '../../lib/styles/JournalPage.styles'
import { useTranslation } from 'react-i18next'

const JournalPage: FC = () => {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    frequentationId: null as number | null
  })
  const [editModal, setEditModal] = useState({
    open: false,
    frequentation: null as FrequentationViewModel | null
  })

  const { students, frequentations, createFrequentations, deleteFrequentations } =
    useJournalData(selectedDate)

  const studentSelection = useJournalStudentSelection()

  const batchOperations = useJournalBatchOperations({
    frequentations,
    onDeleteFrequentation: (ids: number[]) => deleteFrequentations(ids),
    selectedDate: selectedDate.toDate()
  })

  const frequentationActions = useFrequentationActions({
    createFrequentations,
    deleteFrequentations,
    selectedDate: selectedDate
  })

  // Removed useEffect as TanStack Query handles data fetching automatically

  const handleAddStudents = async (
    studentsToCreate: StudentViewModel[],
    activity: string
  ): Promise<void> => {
    const result = await frequentationActions.createFrequentation(studentsToCreate, activity)
    if (result) {
      studentSelection.clearSelection()
    } else {
      console.error('Failed to add frequentations')
    }
  }

  return (
    <Container sx={rootContainerStyles}>
      <JournalDatePicker
        value={selectedDate}
        onChange={(newValue) => {
          if (newValue) {
            setSelectedDate(newValue)
            studentSelection.clearSelection()
          }
        }}
      />

      <Container sx={layoutContainerStyles}>
        <StudentSelector
          selectedStudents={studentSelection.selectedStudents}
          availableStudents={students}
          onSelectionChange={studentSelection.handleSelectionChange}
          onAddStudents={handleAddStudents}
        />

        <StudentTable
          data={frequentations}
          selectedIds={batchOperations.selectedFrequentations}
          onSelectionChange={batchOperations.handleSelectionChange}
          onDelete={(id: number) => {
            setDeleteModal({ open: true, frequentationId: id })
          }}
          onEdit={(item) => {
            if ('activity' in item) {
              // FrequentationViewModel
              setEditModal({ open: true, frequentation: item })
            }
          }}
          isFrequentationTable={true}
        />

        <JournalBatchActions
          selectedCount={batchOperations.selectedFrequentations.length}
          totalCount={frequentations.length}
          onSelectAll={batchOperations.handleSelectAll}
          onClearSelection={batchOperations.clearSelection}
          onDeleteSelected={batchOperations.handleDeleteSelected}
        />

        <ConfirmationDialog
          open={deleteModal.open}
          onClose={() => setDeleteModal({ open: false, frequentationId: null })}
          onConfirm={async () => {
            if (deleteModal.frequentationId) {
              const result = await frequentationActions.deleteFrequentation([
                deleteModal.frequentationId
              ])
              if (result) {
                setDeleteModal({ open: false, frequentationId: null })
              } else {
                console.error('Delete failed, modal stays open')
              }
            }
          }}
          title="Confirmer la suppression"
          message="Êtes-vous sûr de vouloir supprimer cette fréquentation ?"
          confirmText="Supprimer"
          severity="error"
        />

        <FrequentationEditDialog
          open={editModal.open}
          onClose={() => setEditModal({ open: false, frequentation: editModal.frequentation })}
          onSave={async (activity: string) => {
            if (editModal.frequentation) {
              const success = await frequentationActions.updateFrequentation(
                editModal.frequentation.id,
                { activity: activity }
              )
              return success
            }
            return false
          }}
          initialActivity={editModal.frequentation?.activity || ''}
        />
      </Container>
    </Container>
  )
}

export default JournalPage
