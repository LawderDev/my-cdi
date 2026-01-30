import React from 'react'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'

import { TextFieldProps } from '@mui/material/TextField'

type Props = {
  params: TextFieldProps
}

const StudentsRenderInput: React.FC<Props> = ({ params }) => {
  const { t } = useTranslation()

  return (
    <TextField
      {...params}
      label={t('journalPage.studentAutocomplete.label')}
      placeholder={t('journalPage.studentAutocomplete.placeholder')}
    />
  )
}

export default StudentsRenderInput
