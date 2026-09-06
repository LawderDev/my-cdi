import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Button } from '@ui/components/Button'
import type { ErrorFallbackProps } from './types/ErrorFallbackProps'
import {
  DescriptionText,
  DetailsBox,
  ErrorIcon,
  FallbackCard,
  Heading,
  PageRoot,
  PreBlock,
  TitleRow
} from './ErrorFallback.styles'

export function ErrorFallback({ error, onReload }: ErrorFallbackProps) {
  const { t } = useTranslation('common')
  return (
    <PageRoot>
      <FallbackCard>
        <TitleRow>
          <ErrorIcon name="error_outline" />
          <Heading variant="h5">{t('errorBoundary.title')}</Heading>
        </TitleRow>
        <DescriptionText variant="body1">{t('errorBoundary.description')}</DescriptionText>
        <DetailsBox as="details">
          <Box component="summary">{t('errorBoundary.details')}</Box>
          <PreBlock as="pre">{error.message}</PreBlock>
        </DetailsBox>
        <Button variant="primary" onClick={onReload}>
          {t('errorBoundary.reload')}
        </Button>
      </FallbackCard>
    </PageRoot>
  )
}
