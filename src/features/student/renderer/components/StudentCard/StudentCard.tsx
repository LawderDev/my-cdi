import { Card, CardContent, Typography } from '@mui/material'
import { cardStyles, ineLabelStyles } from './StudentCard.styles'
import type { StudentViewModel } from '@student/types'

interface StudentCardProps {
  student: StudentViewModel
  onClick: (student: StudentViewModel) => void
}

const INE_PREFIX = 'INE:'

export function StudentCard({ student, onClick }: StudentCardProps) {
  const handleClick = () => {
    onClick(student)
  }

  return (
    <Card sx={cardStyles} onClick={handleClick}>
      <CardContent>
        <Typography variant="subtitle1">{student.displayName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {student.classLabel}
        </Typography>
        <Typography sx={ineLabelStyles}>
          {INE_PREFIX} {student.ine}
        </Typography>
      </CardContent>
    </Card>
  )
}
