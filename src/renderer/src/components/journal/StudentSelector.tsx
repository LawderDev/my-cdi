import React, { useState } from 'react'
import { Container, Button } from '@mui/material'
import { Autocomplete, TextField } from '@mui/material'
import StudentsRenderValue from '../studentsAutocomplete/studentsRenderValue'
import StudentRenderOption from '../studentsAutocomplete/studentRenderOption'
import StudentsRenderInput from '../studentsAutocomplete/studentsRenderInput'
import type { StudentViewModel } from '../../types/view.models'
import {
  autocompleteWrapperStyles,
  autocompleteStyles,
  addStudentsButtonStyles
} from '../../styles/JournalPage.styles'
import { ACTIVITY_OPTIONS, translateActivityToEnglish } from '@shared/types/activities.enum'

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
  const [selectedActivity, setSelectedActivity] = useState<string>('Travail')

  const getStudentLabel = (student: StudentViewModel): string =>
    `${student.nom} ${student.prenom} ${student.classe}`

  const handleAddStudents = (): void => {
    if (selectedStudents.length > 0) {
      const englishActivity = translateActivityToEnglish(selectedActivity)
      onAddStudents(selectedStudents, englishActivity)
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
        renderValue={(values, getItemProps) => (
          <StudentsRenderValue values={values} getItemProps={getItemProps} />
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
        options={ACTIVITY_OPTIONS}
        renderInput={(params) => <TextField {...params} label="Activité" variant="outlined" />}
        freeSolo
        forcePopupIcon={true}
      />
      <Button
        variant="text"
        sx={addStudentsButtonStyles}
        onClick={handleAddStudents}
        disabled={selectedStudents.length === 0}
      >
        Ajouter les élèves
      </Button>
    </Container>
  )
}
