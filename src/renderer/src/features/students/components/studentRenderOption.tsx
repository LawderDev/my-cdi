import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { StudentViewModel } from '../../../types/view.models'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

type Props = {
  props: React.HTMLAttributes<HTMLLIElement>
  option: StudentViewModel
  selected: boolean
  duplicateCounts: Record<string, number>
}

const StudentRenderOption: React.FC<Props> = ({ props, option, selected, duplicateCounts }) => {
  const key = `${option.nom} ${option.prenom} ${option.classe}`.toLowerCase()
  const hasDuplicates = duplicateCounts[key] > 1
  const display = hasDuplicates
    ? `${option.nom} ${option.prenom} ${option.classe} (${option.ine})`
    : `${option.nom} ${option.prenom} ${option.classe}`

  return (
    <li {...props}>
      <Checkbox icon={icon} checkedIcon={checkedIcon} sx={{ mr: 1 }} checked={selected} />
      {display}
    </li>
  )
}

export default StudentRenderOption
