import { useTranslation } from 'react-i18next'
import { Button } from '@ui/components/Button'

interface StudentFormActionsProps {
  isSubmitting: boolean
  submitLabel: string
  onCancel: () => void
  onSubmit: () => void
}

export function StudentFormActions({
  isSubmitting,
  submitLabel,
  onCancel,
  onSubmit
}: StudentFormActionsProps) {
  const { t } = useTranslation('common')

  return (
    <>
      <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
        {t('app.cancel')}
      </Button>
      <Button type="button" variant="primary" onClick={onSubmit} disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </>
  )
}
