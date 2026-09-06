import { useTranslation } from 'react-i18next'
import { Card } from '@ui/components/Card'
import { SettingsLayout, SectionDescription, SectionTitle } from './SettingsPage.styles'
import { ThemePickerContainer } from './containers/ThemePickerContainer'

export function SettingsPage() {
  const { t } = useTranslation('common')

  return (
    <SettingsLayout>
      <Card>
        <SectionTitle>{t('settings.appearance.title')}</SectionTitle>
        <SectionDescription>{t('settings.appearance.description')}</SectionDescription>
        <ThemePickerContainer />
      </Card>
    </SettingsLayout>
  )
}
