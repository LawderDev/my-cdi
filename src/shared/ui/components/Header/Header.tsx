import { useHeader } from './hooks/useHeader'
import { HeaderPresenter } from './presenters/HeaderPresenter'

export function Header() {
  const { title, subtitle, time } = useHeader()
  return <HeaderPresenter title={title} subtitle={subtitle} time={time} />
}
