import { useTranslation } from 'react-i18next'
import { Button } from '@ui/components/Button'

interface StudentFormActionsPresenterProps {
  isSubmitting: boolean
  submitLabel: string
  onCancel: () => void
  onSubmit: () => void
}

export function StudentFormActionsPresenter({
  isSubmitting,
  submitLabel,
  onCancel,
  onSubmit
}: StudentFormActionsPresenterProps) {
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
