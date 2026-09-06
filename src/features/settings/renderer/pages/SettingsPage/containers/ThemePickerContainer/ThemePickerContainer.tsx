import { useTranslation } from 'react-i18next'
import {
  OptionRow,
  ThemeField,
  ThemeFieldLabel,
  ThemePickerLayout
} from './ThemePickerContainer.styles'
import { useThemePicker } from './hooks/useThemePicker'
import { AccentSwatchPresenter } from './presenters/AccentSwatchPresenter'
import { ModeOptionPresenter } from './presenters/ModeOptionPresenter'

export function ThemePickerContainer() {
  const { t } = useTranslation('common')
  const { accentOptions, modeOptions } = useThemePicker()

  return (
    <ThemePickerLayout>
      <ThemeField>
        <ThemeFieldLabel>{t('settings.appearance.accent')}</ThemeFieldLabel>
        <OptionRow>
          {accentOptions.map((option) => (
            <AccentSwatchPresenter
              key={option.key}
              label={option.label}
              swatch={option.swatch}
              isActive={option.isActive}
              onSelect={option.onSelect}
            />
          ))}
        </OptionRow>
      </ThemeField>
      <ThemeField>
        <ThemeFieldLabel>{t('settings.appearance.mode')}</ThemeFieldLabel>
        <OptionRow>
          {modeOptions.map((option) => (
            <ModeOptionPresenter
              key={option.key}
              label={option.label}
              isActive={option.isActive}
              onSelect={option.onSelect}
            />
          ))}
        </OptionRow>
      </ThemeField>
    </ThemePickerLayout>
  )
}
