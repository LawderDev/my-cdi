import { FC, useState } from 'react'
import { Container, Autocomplete, Chip, TextField, Checkbox, Button, Box } from '@mui/material'
import Table from '../components/StudentsTable'
import StudentsRenderValue from '../components/StudentsAutocomplete/StudentsRenderValue'
import StudentRenderOption from '../components/StudentsAutocomplete/StudentRenderOption'
import StudentsRenderInput from '../components/StudentsAutocomplete/StudentsRenderInput'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'
import dayjs from 'dayjs'

import { useFrequentationListeners } from '../hooks/useFrequentationListeners'
import { Frequentation } from '../types/frequentation'
import { Student } from '../types/student'
import {
  rootContainerStyles,
  datePickerStyles,
  layoutContainerStyles,
  autocompleteWrapperStyles,
  autocompleteStyles,
  addStudentsButtonStyles,
  actionsContainerStyles
} from './JournalPage.styles'

const JournalPage: FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])
  const [frequentations, setFrequentations] = useState<Frequentation[]>([])
  const [selectedFrequentations, setSelectedFrequentations] = useState<number[]>([])
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs())

  useFrequentationListeners({
    selectedDate,
    onStudentsReceived: setStudents,
    onFrequentationsReceived: setFrequentations,
    setSelectedStudents,
    setSelectedFrequentations
  })

  const deleteFrequentations = (ids: number[]): void => {
    window.electron.ipcRenderer.send('frequentation:delete', { ids })
  }

  const createFrequentation = (studentsToCreate: Student[]): void => {
    const frequentationsPayload = studentsToCreate.map((student) => ({
      startsAt: selectedDate.format('YYYY-MM-DDTHH:mm:ss'),
      activity: 'Travail',
      studentId: student.id
    }))
    window.electron.ipcRenderer.send('frequentation:addMultiple', {
      frequentations: frequentationsPayload
    })
  }

  const getStudentLabel = (student: Student): string =>
    `${student.nom} ${student.prenom} ${student.classe}`

  const onDateChange = (newValue: dayjs.Dayjs | null): void => {
    if (newValue && !newValue.isSame(selectedDate, 'minute')) {
      setSelectedStudents([])
      setSelectedFrequentations([])
      setSelectedDate(newValue)
    }
  }

  return (
    <Container sx={rootContainerStyles}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateTimePicker value={selectedDate} onChange={onDateChange} sx={datePickerStyles} />
      </LocalizationProvider>

      <Container sx={layoutContainerStyles}>
        <Container sx={autocompleteWrapperStyles}>
          <Autocomplete
            multiple
            id="fixed-tags"
            limitTags={4}
            sx={autocompleteStyles}
            value={selectedStudents}
            onChange={(_, newValue) => {
              setSelectedStudents(newValue)
            }}
            options={students}
            getOptionLabel={getStudentLabel}
            renderValue={(values, getItemProps) => (
              <StudentsRenderValue values={values} getItemProps={getItemProps} />
            )}
            renderOption={(props, option, { selected }) => (
              <StudentRenderOption props={props} option={option} selected={selected} />
            )}
            renderInput={(params) => <StudentsRenderInput params={params} />}
          />
          <Button
            variant="text"
            sx={addStudentsButtonStyles}
            onClick={() => createFrequentation(selectedStudents)}
          >
            Ajouter les élèves
          </Button>
        </Container>
        <Table
          frequentations={frequentations}
          selectedFrequentations={selectedFrequentations}
          onSelectedFrequentationsChange={setSelectedFrequentations}
          onDeleteFrequentation={deleteFrequentations}
        />
        <Box sx={actionsContainerStyles}>
          <Button
            variant="outlined"
            onClick={() => {
              if (selectedFrequentations.length === frequentations.length) {
                setSelectedFrequentations([])
              } else {
                setSelectedFrequentations(frequentations.map((f) => f.id))
              }
            }}
            disabled={frequentations.length === 0}
          >
            {selectedFrequentations.length === frequentations.length && frequentations.length > 0
              ? 'Désélectionner tout'
              : 'Sélectionner tout'}
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={selectedFrequentations.length === 0}
            onClick={() => deleteFrequentations(selectedFrequentations)}
          >
            Supprimer la sélection
          </Button>
        </Box>
      </Container>
    </Container>
  )
}

export default JournalPage
