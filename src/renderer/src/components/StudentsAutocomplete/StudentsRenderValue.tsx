import React from 'react'
import Chip from '@mui/material/Chip'
import { Student } from '../../types/student'

type Props = {
  values: Student[]
  getItemProps: (opts: { index: number }) => React.ComponentProps<typeof Chip>
}

const StudentsRenderValue: React.FC<Props> = ({ values, getItemProps }) => (
  <>
    {values.map((option, index) => {
      const { key, ...itemProps } = getItemProps({ index })
      return (
        <Chip key={key} label={`${option.nom} ${option.prenom} ${option.classe}`} {...itemProps} />
      )
    })}
  </>
)

export default StudentsRenderValue
