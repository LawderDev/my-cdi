import { FC, useEffect, useState } from 'react'
import { Container, Autocomplete, Chip, TextField, Checkbox, Button } from '@mui/material'
import Table from '../components/Table'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import dayjs from 'dayjs'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface StudentItem {
  id: number
  nom: string
  prenom: string
  classe: string
}

interface FrequentationItem {
  id: number
  starts_at: string
  activity: string
  created_at: string
  student: {
    id: number
    nom: string
    prenom: string
    classe: string
    fullName: string
  }
  formattedStartTime: string
}

const JournalPage: FC = () => {
  const [students, setStudents] = useState<StudentItem[]>([])
  const [selectedStudents, setSelectedStudents] = useState<StudentItem[]>([])
  const [frequentations, setFrequentations] = useState<FrequentationItem[]>([])

  useEffect(() => {
    initDatas()
  }, [])

  const initDatas = (): void => {
    getStudents()
    getFrequentations()
  }

  const getStudentLabel: (student: StudentItem) => string = (student) =>
    `${student.nom} ${student.prenom} ${student.classe}`

  useEffect(() => {
    const listener = (_event: unknown, data: { success: boolean; data: StudentItem[] }): void => {
      setStudents(data.data)
    }
    const removeListener = window.electron.ipcRenderer.on('student:getAll:response', listener)

    const freqListener = (
      _event: unknown,
      data: { success: boolean; data: FrequentationItem[] }
    ): void => {
      setFrequentations(data.data)
    }
    const removeFreqListener = window.electron.ipcRenderer.on(
      'frequentation:getAll:response',
      freqListener
    )

    const createListener = (
      _event: unknown,
      data: { success: boolean; data: StudentItem[] }
    ): void => {
      if (data.success) {
        initDatas()
      }
    }
    const removeCreateListener = window.electron.ipcRenderer.on(
      'frequentation:addMultiple:response',
      createListener
    )

    return () => {
      removeListener()
      removeFreqListener()
      removeCreateListener()
    }
  }, [])

  const getStudents = (): void => {
    window.electron.ipcRenderer.send('student:getAll')
  }

  const getFrequentations = (): void => {
    window.electron.ipcRenderer.send('frequentation:getAll', { withStudent: true })
  }

  const createFrequentation = (students: StudentItem[]): void => {
    const frequentations = students.map((student) => ({
      startsAt: new Date().toISOString(),
      activity: 'Travail',
      studentId: student.id
    }))
    window.electron.ipcRenderer.send('frequentation:addMultiple', { frequentations })
  }

  return (
    <Container sx={{ mt: '30px', minWidth: '100%', display: 'flex', gap: 3 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateTimePicker
          value={dayjs()}
          sx={{ height: '570px', marginTop: '4.9%', marginLeft: '24px' }}
        />
      </LocalizationProvider>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '85vh'
        }}
      >
        <Container sx={{ display: 'flex', padding: '0px !important' }}>
          <Autocomplete
            multiple
            id="fixed-tags-demo"
            limitTags={4}
            sx={{ width: '80% !important' }}
            value={selectedStudents}
            onChange={(_, newValue) => {
              setSelectedStudents(newValue)
            }}
            options={students}
            getOptionLabel={getStudentLabel}
            renderValue={(values, getItemProps) =>
              values.map((option, index) => {
                const { key, ...itemProps } = getItemProps({ index })
                return <Chip key={key} label={getStudentLabel(option)} {...itemProps} />
              })
            }
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props
              return (
                <li key={key} {...optionProps}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {getStudentLabel(option)}
                </li>
              )
            }}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="Fixed tag" placeholder="Favorites" />
            )}
          />
          <Button
            variant="text"
            sx={{ marginLeft: '16px' }}
            onClick={() => createFrequentation(selectedStudents)}
          >
            Ajouter les élèves
          </Button>
        </Container>
        {frequentations.length}
        <Table frequentations={frequentations} />
      </Container>
    </Container>
  )
}

export default JournalPage
