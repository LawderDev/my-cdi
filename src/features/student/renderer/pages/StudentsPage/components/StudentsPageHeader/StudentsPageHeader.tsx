import { Box, Typography } from '@mui/material'

const HEADER_BOTTOM_MARGIN = 2

interface StudentsPageHeaderProps {
  title: string
}

export function StudentsPageHeader({ title }: StudentsPageHeaderProps) {
  return (
    <Box sx={{ mb: HEADER_BOTTOM_MARGIN }}>
      <Typography variant="h4">{title}</Typography>
    </Box>
  )
}
