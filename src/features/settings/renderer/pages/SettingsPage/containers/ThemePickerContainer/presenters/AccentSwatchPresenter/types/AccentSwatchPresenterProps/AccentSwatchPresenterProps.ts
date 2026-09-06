export interface AccentSwatchPresenterProps {
  label: string
  swatch: { main: string; background: string }
  isActive: boolean
  onSelect: () => void
}
