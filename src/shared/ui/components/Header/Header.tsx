import { useHeader } from './hooks/useHeader'
import { HeaderView } from './components/HeaderView'

export function Header() {
  const { title, subtitle, time } = useHeader()
  return <HeaderView title={title} subtitle={subtitle} time={time} />
}
