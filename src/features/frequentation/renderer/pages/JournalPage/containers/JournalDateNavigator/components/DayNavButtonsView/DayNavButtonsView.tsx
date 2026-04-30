import { Button, ButtonGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface DayNavButtonsViewProps {
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export function DayNavButtonsView({ onPrevious, onNext, onToday }: DayNavButtonsViewProps) {
  const { t } = useTranslation('frequentation')
  return (
    <ButtonGroup variant="outlined">
      <Button onClick={onPrevious}>{t('previousDay')}</Button>
      <Button onClick={onToday}>{t('today')}</Button>
      <Button onClick={onNext}>{t('nextDay')}</Button>
    </ButtonGroup>
  )
}
