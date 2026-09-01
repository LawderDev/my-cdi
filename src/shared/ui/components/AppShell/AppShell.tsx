import { Outlet } from 'react-router'
import { Sidebar } from '../Sidebar'
import { Header } from '../Header'
import { UpdateBanner } from '../UpdateBanner'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { useAppShellShortcuts } from './hooks/useAppShellShortcuts'
import { ContentColumn, MainArea, ShellRoot } from './AppShell.styles'

export function AppShell() {
  usePageTitle()
  useKeyboardShortcuts(useAppShellShortcuts())

  return (
    <ShellRoot>
      <Sidebar />
      <ContentColumn>
        <Header />
        <UpdateBanner />
        <MainArea as="main">
          <Outlet />
        </MainArea>
      </ContentColumn>
    </ShellRoot>
  )
}
