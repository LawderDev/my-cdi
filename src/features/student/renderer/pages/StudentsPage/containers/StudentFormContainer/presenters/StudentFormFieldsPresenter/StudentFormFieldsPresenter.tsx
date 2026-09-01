import type { ReactNode } from 'react'
import Box from '@mui/material/Box'

interface StudentFormFieldsPresenterProps {
  fieldRowNodes: ReactNode[]
}

export function StudentFormFieldsPresenter({ fieldRowNodes }: StudentFormFieldsPresenterProps) {
  return <Box>{fieldRowNodes}</Box>
}
