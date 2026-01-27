import React from 'react'
import Chip from '@mui/material/Chip'
import { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete'
import { StudentViewModel } from '../../../types/view.models'

type Props = {
  values: StudentViewModel[]
  getTagProps: AutocompleteRenderGetTagProps
}

const StudentsRenderValue: React.FC<Props> = ({ values, getTagProps }) => (
  <>
    {values.map((option, index) => {
      const { key, ...tagProps } = getTagProps({ index })
      return (
        <Chip key={key} label={`${option.nom} ${option.prenom} ${option.classe}`} {...tagProps} />
      )
    })}
  </>
)

export default StudentsRenderValue
