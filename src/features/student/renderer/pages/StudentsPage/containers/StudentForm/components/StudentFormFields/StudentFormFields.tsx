import type { ReactNode } from 'react'
import Box from '@mui/material/Box'

interface StudentFormFieldsProps {
  fieldRowNodes: ReactNode[]
}

export function StudentFormFields({ fieldRowNodes }: StudentFormFieldsProps) {
  return <Box>{fieldRowNodes}</Box>
}
