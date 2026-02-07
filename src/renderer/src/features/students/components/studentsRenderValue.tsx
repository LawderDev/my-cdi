import React from 'react'
import Chip from '@mui/material/Chip'
import { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete'
import { StudentViewModel } from '../../../types/view.models'

type Props = {
  values: StudentViewModel[]
  getTagProps: AutocompleteRenderGetTagProps
  duplicateCounts: Record<string, number>
}

const StudentsRenderValue: React.FC<Props> = ({ values, getTagProps, duplicateCounts }) => (
  <>
    {values.map((option, index) => {
      const { key, ...tagProps } = getTagProps({ index })
      const dupKey = `${option.nom} ${option.prenom} ${option.classe}`.toLowerCase()
      const hasDuplicates = duplicateCounts[dupKey] > 1
      const display = hasDuplicates
        ? `${option.nom} ${option.prenom} ${option.classe} (${option.ine})`
        : `${option.nom} ${option.prenom} ${option.classe}`
      return <Chip key={key} label={display} {...tagProps} />
    })}
  </>
)

export default StudentsRenderValue
