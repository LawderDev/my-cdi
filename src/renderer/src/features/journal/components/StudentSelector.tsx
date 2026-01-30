import React, { useState, useMemo } from 'react'
import { Container, Button } from '@mui/material'
import { Autocomplete, TextField } from '@mui/material'
import StudentsRenderValue from '../../students/components/studentsRenderValue'
import StudentRenderOption from '../../students/components/studentRenderOption'
import StudentsRenderInput from '../../students/components/studentsRenderInput'
import type { StudentViewModel } from '../../../types/view.models'
import {
  autocompleteWrapperStyles,
  autocompleteStyles,
  addStudentsButtonStyles
} from '../../../lib/styles/JournalPage.styles'
import { ActivityType } from '@shared/types/activities.enum'
import { useTranslation } from 'react-i18next'

interface StudentSelectorProps {
  selectedStudents: StudentViewModel[]
  availableStudents: StudentViewModel[]
  onSelectionChange: (students: StudentViewModel[]) => void
  onAddStudents: (students: StudentViewModel[], activity: string) => void
}

export const StudentSelector: React.FC<StudentSelectorProps> = ({
  selectedStudents,
  availableStudents,
  onSelectionChange,
  onAddStudents
}) => {
  const { t } = useTranslation()
  const activityOptions = useMemo(() => Object.values(ActivityType), [])

  const [selectedActivity, setSelectedActivity] = useState<string>(activityOptions[0] || '')

  const getStudentLabel = (student: StudentViewModel): string =>
    `${student.nom} ${student.prenom} ${student.classe}`

  const handleAddStudents = (): void => {
    if (selectedStudents.length > 0) {
      onAddStudents(selectedStudents, selectedActivity)
    }
  }

  return (
    <Container sx={autocompleteWrapperStyles}>
      <Autocomplete
        multiple
        id="students-autocomplete"
        limitTags={4}
        sx={{ ...autocompleteStyles, mr: 2, flex: 1 }}
        value={selectedStudents}
        onChange={(_, newValue) => {
          onSelectionChange(newValue)
        }}
        options={availableStudents}
        getOptionLabel={getStudentLabel}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderTags={(values, getTagProps) => (
          <StudentsRenderValue values={values} getTagProps={getTagProps} />
        )}
        renderOption={(props, option, { selected }) => (
          <StudentRenderOption props={props} option={option} selected={selected} />
        )}
        renderInput={(params) => <StudentsRenderInput params={params} />}
      />
      <Autocomplete
        id="activity-autocomplete"
        sx={{ minWidth: 180 }}
        value={selectedActivity}
        onChange={(_, newValue) => {
          if (newValue) setSelectedActivity(newValue)
        }}
        options={activityOptions}
        getOptionLabel={(option) => t(`activity.${option}`)}
        renderInput={(params) => (
          <TextField {...params} label={t('activity.title')} variant="outlined" />
        )}
        freeSolo
        forcePopupIcon={true}
      />
      <Button
        variant="text"
        sx={addStudentsButtonStyles}
        onClick={handleAddStudents}
        disabled={selectedStudents.length === 0}
      >
        {t('journalPage.addStudentsButton.label')}
      </Button>
    </Container>
  )
}
