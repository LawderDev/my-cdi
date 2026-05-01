export interface NavButtonProps {
  active: boolean
  iconName: string
  label: string
  ariaCurrent?: 'page'
  onClick: () => void
}
