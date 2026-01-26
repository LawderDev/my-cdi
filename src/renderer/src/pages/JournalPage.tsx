import { FC, useState, useEffect } from 'react'
import { Container } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'

import { JournalDatePicker, StudentSelector, JournalBatchActions } from '../components/journal'
import { StudentTable } from '../components/shared/StudentTable'
import { ConfirmationDialog } from '../components/dialogs'
import { FrequentationEditDialog } from '../components/dialogs/FrequentationEditDialog'
import { useJournalData } from '../hooks/useJournalData'
import { useJournalStudentSelection } from '../hooks/useJournalStudentSelection'
import { useJournalBatchOperations } from '../hooks/useJournalBatchOperations'
import { useFrequentationActions } from '../hooks/useFrequentationActions'
import type { StudentViewModel } from '../types/view.models'
import type { FrequentationViewModel } from '../types/view.models'
import { rootContainerStyles, layoutContainerStyles } from '../styles/JournalPage.styles'

const JournalPage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    frequentationId: null as number | null
  })
  const [editModal, setEditModal] = useState({
    open: false,
    frequentation: null as FrequentationViewModel | null
  })

  const {
    students,
    frequentations,
    fetchDailyDataAt,
    createFrequentationsAt,
    deleteFrequentationsAt
  } = useJournalData()

  const studentSelection = useJournalStudentSelection()

  const batchOperations = useJournalBatchOperations({
    frequentations,
    onDeleteFrequentation: (ids: number[]) => deleteFrequentationsAt(ids, selectedDate),
    selectedDate: selectedDate.toDate()
  })

  const frequentationActions = useFrequentationActions({
    createFrequentationsAt,
    deleteFrequentationsAt,
    selectedDate: selectedDate
  })

  useEffect(() => {
    console.log('Fetching data for date:', selectedDate.format('YYYY-MM-DD'))
    fetchDailyDataAt(selectedDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate])

  const handleAddStudents = async (
    studentsToCreate: StudentViewModel[],
    activity: string
  ): Promise<void> => {
    console.log(
      'Adding frequentations for students:',
      studentsToCreate.map((s) => `${s.nom} ${s.prenom}`),
      'with activity:',
      activity
    )
    const result = await frequentationActions.createFrequentation(studentsToCreate, activity)
    console.log('Add frequentations result:', result)
    if (result) {
      console.log('Frequentations added successfully, clearing selection')
      studentSelection.clearSelection()
    } else {
      console.error('Failed to add frequentations')
    }
  }

  return (
    <Container sx={rootContainerStyles}>
      <JournalDatePicker
        value={selectedDate}
        onChange={(newValue) => newValue && setSelectedDate(newValue)}
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
              console.log('Deleting frequentation ID:', deleteModal.frequentationId)
              const result = await frequentationActions.deleteFrequentation(
                [deleteModal.frequentationId],
                selectedDate
              )
              console.log('Delete result:', result)
              if (result) {
                console.log('Delete successful, refreshing data')
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
          onClose={() => setEditModal({ open: false, frequentation: null })}
          onSave={async (activity: string) => {
            if (editModal.frequentation) {
              console.log(
                'Updating frequentation ID:',
                editModal.frequentation.id,
                'with activity:',
                activity
              )
              const result = await frequentationActions.updateFrequentation(
                editModal.frequentation.id,
                { activity }
              )
              console.log('Update result:', result)
              if (result) {
                console.log('Update successful, refreshing data')
                await fetchDailyDataAt(selectedDate)
                setEditModal({ open: false, frequentation: null })
              } else {
                console.error('Update failed, modal stays open')
              }
            }
          }}
          initialActivity={editModal.frequentation?.activity || ''}
        />
      </Container>
    </Container>
  )
}

export default JournalPage
