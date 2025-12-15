import React from 'react'
import TextField from '@mui/material/TextField'

import { TextFieldProps } from '@mui/material/TextField'

type Props = {
  params: TextFieldProps
}

const StudentsRenderInput: React.FC<Props> = ({ params }) => (
  <TextField {...params} label="Fixed tag" placeholder="Favorites" />
)

export default StudentsRenderInput
