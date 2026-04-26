# Integration & Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the complete application end-to-end, add shared UI components (Navbar, ConfirmDialog, layout), verify all features work together, and ensure the app is production-ready.

**Architecture:** All features (student + frequentation) are now implemented. This plan focuses on cross-cutting UI, final wiring, and end-to-end verification.

**Tech Stack:** React 19.x, TypeScript 5.9.x (strict), Electron 40.x, MUI 7.x, React Router 7.x, Vitest

---

## File Structure

```
my-cdi/
└── src/
    ├── main/
    │   └── index.ts                                       # Modify: add auto-updater
    ├── preload/
    │   ├── index.ts                                       # Modify: add updater IPC
    │   └── index.d.ts                                     # Modify: add updater types
    └── renderer/
        └── src/
            ├── main.tsx                                    # Modify: add ErrorBoundary
            ├── app/
            │   ├── app.tsx                                 # Modify: React Router + Layout
            │   ├── provider.tsx                            # Modify: keep (already has devtools)
            │   ├── routes/
            │   │   ├── JournalPage.tsx                    # Keep as-is
            │   │   ├── StudentsPage.tsx                   # Keep as-is
            │   │   └── StatisticsPage.tsx                  # Modify: i18n + styled placeholder
            │   └── router.ts                              # Create: React Router config
            ├── components/
            │   ├── Navbar/
            │   │   ├── Navbar.tsx                          # Create: refactored Navbar
            │   │   └── index.ts                            # Create: re-export
            │   ├── ConfirmDialog/
            │   │   ├── ConfirmDialog.tsx                   # Create: refactored from ConfirmationDialog
            │   │   └── index.ts                            # Create: re-export
            │   ├── ErrorBoundary/
            │   │   ├── ErrorBoundary.tsx                   # Create: error boundary
            │   │   └── index.ts                            # Create: re-export
            │   ├── AppLayout/
            │   │   ├── AppLayout.tsx                       # Create: Navbar + Outlet
            │   │   └── index.ts                            # Create: re-export
            │   ├── AppVersion/
            │   │   ├── AppVersion.tsx                      # Create: version from package.json
            │   │   └── index.ts                            # Create: re-export
            │   ├── dialogs/                                # Keep existing (StudentAdd/Edit/Delete, FrequentationEdit)
            │   │   ├── ConfirmationDialog.tsx              # Keep for backward compat
            │   │   └── index.ts                            # Modify: add ConfirmDialog export
            │   ├── CSVImportButton.tsx                     # Keep as-is
            │   ├── Versions.tsx                            # Keep (unused but harmless)
            │   └── shared/                                # Keep as-is
            ├── lib/
            │   ├── constants/
            │   │   ├── routes.ts                          # Create: ROUTES constants
            │   │   └── index.ts                           # Create: re-export
            │   ├── styles/
            │   │   ├── AppLayout.styles.ts                # Create: layout styles
            │   │   └── ...                                # Keep existing
            │   └── ...                                    # Keep existing (theme, i18n, queryClient, etc.)
            ├── locales/
            │   └── fr.json                                # Modify: add new i18n keys
            └── hooks/
                ├── usePageTitle.ts                        # Create: window title hook
                └── useKeyboardShortcuts.ts                # Create: keyboard shortcuts hook
```

---

### Task 1: ROUTES constants and i18n keys

**Files:**

- Create: `src/renderer/src/lib/constants/routes.ts`
- Create: `src/renderer/src/lib/constants/index.ts`
- Modify: `src/renderer/src/locales/fr.json`

- [ ] **Step 1: Create routes constants**

```typescript
// src/renderer/src/lib/constants/routes.ts
export const ROUTES = {
  JOURNAL: 'journal',
  STUDENTS: 'students',
  STATISTICS: 'statistics'
} as const

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES]

export const ROUTE_LABELS: Record<RouteName, string> = {
  [ROUTES.JOURNAL]: 'navBar.journal',
  [ROUTES.STUDENTS]: 'navBar.students',
  [ROUTES.STATISTICS]: 'navBar.statistics'
}

export const ROUTE_TITLES: Record<RouteName, string> = {
  [ROUTES.JOURNAL]: 'pageTitle.journal',
  [ROUTES.STUDENTS]: 'pageTitle.students',
  [ROUTES.STATISTICS]: 'pageTitle.statistics'
}

export const KEYBOARD_SHORTCUT_MAP: Record<string, RouteName> = {
  '1': ROUTES.JOURNAL,
  '2': ROUTES.STUDENTS,
  '3': ROUTES.STATISTICS
}
```

- [ ] **Step 2: Create constants index re-export**

```typescript
// src/renderer/src/lib/constants/index.ts
export { ROUTES, ROUTE_LABELS, ROUTE_TITLES, KEYBOARD_SHORTCUT_MAP } from './routes'
export type { RouteName } from './routes'
```

- [ ] **Step 3: Update i18n French locale with new keys**

Replace the entire content of `src/renderer/src/locales/fr.json`:

```json
{
  "navBar": {
    "journal": "Journal",
    "students": "Élèves",
    "statistics": "Statistiques"
  },
  "pageTitle": {
    "journal": "Journal - MyCdi",
    "students": "Élèves - MyCdi",
    "statistics": "Statistiques - MyCdi"
  },
  "statisticsPage": {
    "title": "Statistiques CDI",
    "subtitle": "Visualisez les données de fréquentation et d'utilisation du CDI",
    "placeholderTitle": "Page en cours de développement",
    "placeholderSubtitle": "Les statistiques et graphiques seront bientôt disponibles"
  },
  "errorBoundary": {
    "title": "Une erreur est survenue",
    "message": "L'application a rencontré une erreur inattendue.",
    "reload": "Recharger"
  },
  "appVersion": {
    "version": "Version {{version}}"
  },
  "journalPage": {
    "studentAutocomplete": {
      "label": "Élèves",
      "placeholder": "Sélectionner des élèves"
    },
    "addStudentsButton": {
      "label": "Ajouter des élèves"
    }
  },
  "studentPage": {
    "title": "Liste des élèves",
    "addStudentButton": {
      "label": "Ajouter un élève",
      "importCsv": "Importer des CSV",
      "searchStudents": "Rechercher des élèves..."
    }
  },
  "table": {
    "firstName": "Prénom",
    "lastName": "Nom",
    "fullName": "Nom complet",
    "class": "Classe",
    "ine": "INE",
    "activity": "Activité",
    "actions": "Actions",
    "selectAll": "Tout sélectionner",
    "deselectAll": "Tout désélectionner"
  },
  "activity": {
    "title": "Activité",
    "work": "Travail",
    "reading": "Lecture",
    "computer": "Ordinateur",
    "relaxation": "Détente",
    "other": "Autre"
  },
  "dialog": {
    "editActivity": {
      "title": "Modifier l'activité",
      "required": "L'activité est requise"
    }
  },
  "common": {
    "cancel": "Annuler",
    "save": "Sauvegarder",
    "add": "Ajouter",
    "confirm": "Confirmer"
  }
}
```

- [ ] **Step 4: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: No errors related to `routes.ts` or `fr.json`

- [ ] **Step 5: Commit**

```bash
git add src/renderer/src/lib/constants/routes.ts src/renderer/src/lib/constants/index.ts src/renderer/src/locales/fr.json
git commit -m "feat: add ROUTES constants and i18n keys for integration"
```

---

### Task 2: ConfirmDialog shared UI component

**Files:**

- Create: `src/renderer/src/components/ConfirmDialog/ConfirmDialog.tsx`
- Create: `src/renderer/src/components/ConfirmDialog/index.ts`
- Modify: `src/renderer/src/components/dialogs/index.ts`

- [ ] **Step 1: Create ConfirmDialog component**

This refactors the existing `ConfirmationDialog` into the folder-per-unit convention with i18n support.

```tsx
// src/renderer/src/components/ConfirmDialog/ConfirmDialog.tsx
import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  severity?: 'info' | 'warning' | 'error'
  onConfirm: () => void
  onClose: () => void
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText,
  cancelText,
  severity = 'info',
  onConfirm,
  onClose
}) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText || t('common.cancel')}</Button>
        <Button
          variant="contained"
          color={severity === 'error' ? 'error' : 'primary'}
          onClick={onConfirm}
        >
          {confirmText || t('common.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
```

- [ ] **Step 2: Create ConfirmDialog index re-export**

```typescript
// src/renderer/src/components/ConfirmDialog/index.ts
export { ConfirmDialog } from './ConfirmDialog'
```

- [ ] **Step 3: Update dialogs index to also export ConfirmDialog**

The existing `ConfirmationDialog` is still used by `JournalBatchActions` and `StudentsPageBatchActions`. We add the new `ConfirmDialog` export alongside it.

```typescript
// src/renderer/src/components/dialogs/index.ts
export { default as StudentEditDialog } from './StudentEditDialog'
export { default as StudentDeleteDialog } from './StudentDeleteDialog'
export { ConfirmationDialog } from './ConfirmationDialog'
export { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog'
```

- [ ] **Step 4: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/renderer/src/components/ConfirmDialog/ConfirmDialog.tsx src/renderer/src/components/ConfirmDialog/index.ts src/renderer/src/components/dialogs/index.ts
git commit -m "feat: add ConfirmDialog shared component with i18n support"
```

---

### Task 3: Navbar shared UI component

**Files:**

- Create: `src/renderer/src/components/Navbar/Navbar.tsx`
- Create: `src/renderer/src/components/Navbar/index.ts`
- Modify: `src/renderer/src/app/app.tsx` (update import to use new Navbar)

- [ ] **Step 1: Create new Navbar component with ROUTES constants and i18n**

```tsx
// src/renderer/src/components/Navbar/Navbar.tsx
import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES, ROUTE_LABELS } from '../../lib/constants'
import type { RouteName } from '../../lib/constants'
import { AppVersion } from '../AppVersion/AppVersion'
import { theme } from '../../lib/theme'

const NAV_ITEMS: RouteName[] = [ROUTES.JOURNAL, ROUTES.STUDENTS, ROUTES.STATISTICS]

export const Navbar: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const currentRoute = (location.pathname.replace('/', '') || ROUTES.JOURNAL) as RouteName

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: theme.palette.background.default }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: theme.palette.text.primary }}
        >
          MyCdi
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {NAV_ITEMS.map((route) => {
            const isActive = currentRoute === route
            return (
              <Button
                key={route}
                color="inherit"
                variant={isActive ? 'outlined' : 'text'}
                onClick={() => navigate(`/${route}`)}
                sx={{
                  color: theme.palette.text.primary,
                  borderColor: isActive ? theme.palette.primary.main : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(124, 77, 255, 0.1)',
                    color: theme.palette.primary.main
                  }
                }}
              >
                {t(ROUTE_LABELS[route])}
              </Button>
            )
          })}
        </Box>

        <AppVersion />
      </Toolbar>
    </AppBar>
  )
}
```

- [ ] **Step 2: Create Navbar index re-export**

```typescript
// src/renderer/src/components/Navbar/index.ts
export { Navbar } from './Navbar'
```

- [ ] **Step 3: Update app.tsx import to point to new Navbar location**

In `src/renderer/src/app/app.tsx`, change:

```
import Navbar from '../components/Navbar'
```

to:

```
import { Navbar } from '../components/Navbar'
```

(This will be a no-op at this point since app.tsx will be fully rewritten in Task 5, but this ensures the file compiles until then.)

- [ ] **Step 4: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: Errors about `react-router-dom` not found (expected — we install it in Task 5). Confirm no OTHER errors.

- [ ] **Step 5: Commit**

```bash
git add src/renderer/src/components/Navbar/Navbar.tsx src/renderer/src/components/Navbar/index.ts src/renderer/src/app/app.tsx
git commit -m "feat: add Navbar component with ROUTES constants and i18n"
```

---

### Task 4: AppVersion component

**Files:**

- Create: `src/renderer/src/components/AppVersion/AppVersion.tsx`
- Create: `src/renderer/src/components/AppVersion/index.ts`

- [ ] **Step 1: Create AppVersion component**

This reads the version from `package.json` via Vite's `define` feature. We'll use a constant injected at build time.

```tsx
// src/renderer/src/components/AppVersion/AppVersion.tsx
import React from 'react'
import { Typography, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { theme } from '../../lib/theme'

declare const __APP_VERSION__: string

export const AppVersion: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Tooltip title={t('appVersion.version', { version: __APP_VERSION__ })}>
      <Typography
        variant="caption"
        sx={{
          ml: 3,
          color: theme.palette.text.secondary,
          opacity: 0.6,
          cursor: 'default'
        }}
      >
        v{__APP_VERSION__}
      </Typography>
    </Tooltip>
  )
}
```

- [ ] **Step 2: Create AppVersion index re-export**

```typescript
// src/renderer/src/components/AppVersion/index.ts
export { AppVersion } from './AppVersion'
```

- [ ] **Step 3: Update electron.vite.config.ts to inject **APP_VERSION****

In `src/renderer/src/lib/constants/routes.ts` (already created), we already have our constants. Now we need Vite to define `__APP_VERSION__`. Modify `electron.vite.config.ts`:

Replace the existing `renderer` section:

```typescript
// electron.vite.config.ts — replace the entire file
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'

const pkgVersion = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')).version

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared')
      }
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']]
        }
      })
    ],
    define: {
      __APP_VERSION__: JSON.stringify(pkgVersion)
    }
  }
})
```

- [ ] **Step 4: Add **APP_VERSION** to env.d.ts**

Append to `src/renderer/src/env.d.ts`:

```typescript
/// <reference types="vite/client" />

declare const __APP_VERSION__: string
```

- [ ] **Step 5: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: Only expected react-router-dom errors from Task 3. No new errors for AppVersion.

- [ ] **Step 6: Commit**

```bash
git add src/renderer/src/components/AppVersion/AppVersion.tsx src/renderer/src/components/AppVersion/index.ts electron.vite.config.ts src/renderer/src/env.d.ts
git commit -m "feat: add AppVersion component with build-time version injection"
```

---

### Task 5: Install React Router and create router config

**Files:**

- Modify: `package.json` (add react-router-dom)
- Create: `src/renderer/src/app/router.tsx`

- [ ] **Step 1: Install react-router-dom**

Run: `npm install react-router-dom`
Expected: Package added to dependencies. `package.json` updated.

- [ ] **Step 2: Create router configuration with lazy-loaded pages**

```tsx
// src/renderer/src/app/router.tsx
import React, { Suspense, lazy } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout/AppLayout'
import { ROUTES } from '../lib/constants'

const JournalPage = lazy(() => import('./routes/JournalPage'))
const StudentsPage = lazy(() => import('./routes/StudentsPage'))
const StatisticsPage = lazy(() => import('./routes/StatisticsPage'))

const LoadingFallback: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <p>Chargement...</p>
  </div>
)

const LazyJournalPage: React.FC = () => (
  <Suspense fallback={<LoadingFallback />}>
    <JournalPage />
  </Suspense>
)

const LazyStudentsPage: React.FC = () => (
  <Suspense fallback={<LoadingFallback />}>
    <StudentsPage />
  </Suspense>
)

const LazyStatisticsPage: React.FC = () => (
  <Suspense fallback={<LoadingFallback />}>
    <StatisticsPage />
  </Suspense>
)

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LazyJournalPage /> },
      { path: ROUTES.JOURNAL, element: <LazyJournalPage /> },
      { path: ROUTES.STUDENTS, element: <LazyStudentsPage /> },
      { path: ROUTES.STATISTICS, element: <LazyStatisticsPage /> }
    ]
  }
])

export const AppRouter: React.FC = () => <RouterProvider router={router} />
```

- [ ] **Step 3: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: May show errors about AppLayout not existing yet (Task 6). That's expected.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/renderer/src/app/router.tsx
git commit -m "feat: add React Router with lazy-loaded page routes"
```

---

### Task 6: App Layout component (Navbar + Outlet + styles)

**Files:**

- Create: `src/renderer/src/components/AppLayout/AppLayout.tsx`
- Create: `src/renderer/src/components/AppLayout/index.ts`
- Create: `src/renderer/src/lib/styles/AppLayout.styles.ts`

- [ ] **Step 1: Create AppLayout styles**

```typescript
// src/renderer/src/lib/styles/AppLayout.styles.ts
import { SxProps, Theme } from '@mui/material'

export const rootBoxStyles: SxProps<Theme> = {
  height: '100vh',
  width: '100vw',
  backgroundColor: 'background.default',
  overflow: 'auto'
}

export const contentBoxStyles: SxProps<Theme> = {
  flex: 1,
  overflow: 'auto'
}
```

- [ ] **Step 2: Create AppLayout component**

```tsx
// src/renderer/src/components/AppLayout/AppLayout.tsx
import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { rootBoxStyles, contentBoxStyles } from '../../lib/styles/AppLayout.styles'

export const AppLayout: React.FC = () => {
  return (
    <Box sx={rootBoxStyles}>
      <Navbar />
      <Box sx={contentBoxStyles}>
        <Outlet />
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: Create AppLayout index re-export**

```typescript
// src/renderer/src/components/AppLayout/index.ts
export { AppLayout } from './AppLayout'
```

- [ ] **Step 4: Rewrite app.tsx to use React Router**

Replace the entire content of `src/renderer/src/app/app.tsx`:

```tsx
// src/renderer/src/app/app.tsx
import React from 'react'
import { Provider } from './provider'
import { AppRouter } from './router'

function App(): React.JSX.Element {
  return (
    <Provider>
      <AppRouter />
    </Provider>
  )
}

export default App
```

- [ ] **Step 5: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: No errors. The old Navbar default import is gone; the new named import in Navbar.tsx is used internally.

- [ ] **Step 6: Delete old Navbar.tsx (it has been replaced by the folder)**

Run: `rm src/renderer/src/components/Navbar.tsx`

- [ ] **Step 7: Verify the app still typechecks after cleanup**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: No errors

- [ ] **Step 8: Commit**

```bash
git add src/renderer/src/components/AppLayout/AppLayout.tsx src/renderer/src/components/AppLayout/index.ts src/renderer/src/lib/styles/AppLayout.styles.ts src/renderer/src/app/app.tsx
git rm src/renderer/src/components/Navbar.tsx
git commit -m "feat: add AppLayout component with React Router Outlet"
```

---

### Task 7: Statistics placeholder page update

**Files:**

- Modify: `src/renderer/src/app/routes/StatisticsPage.tsx`

- [ ] **Step 1: Update StatisticsPage to use i18n and styled placeholder**

Replace the entire content of `src/renderer/src/app/routes/StatisticsPage.tsx`:

```tsx
// src/renderer/src/app/routes/StatisticsPage.tsx
import React from 'react'
import { Container, Typography, Paper, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Construction as ConstructionIcon } from '@mui/icons-material'
import { theme } from '../../lib/theme'

const StatisticsPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          {t('statisticsPage.title')}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary, opacity: 0.8 }}>
          {t('statisticsPage.subtitle')}
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 4,
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.paper
        }}
      >
        <ConstructionIcon
          sx={{
            fontSize: 64,
            color: theme.palette.primary.main,
            opacity: 0.4,
            mb: 2
          }}
        />
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          {t('statisticsPage.placeholderTitle')}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary, opacity: 0.7, mt: 1 }}>
          {t('statisticsPage.placeholderSubtitle')}
        </Typography>
      </Paper>
    </Container>
  )
}

export default StatisticsPage
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/renderer/src/app/routes/StatisticsPage.tsx
git commit -m "feat: update StatisticsPage with i18n and styled placeholder"
```

---

### Task 8: Error Boundary component

**Files:**

- Create: `src/renderer/src/components/ErrorBoundary/ErrorBoundary.tsx`
- Create: `src/renderer/src/components/ErrorBoundary/index.ts`

- [ ] **Step 1: Create ErrorBoundary component**

```tsx
// src/renderer/src/components/ErrorBoundary/ErrorBoundary.tsx
import React, { Component } from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { ErrorOutline as ErrorIcon } from '@mui/icons-material'
import { theme } from '../../lib/theme'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  private handleReload = (): void => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            p: 4
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 480,
              textAlign: 'center',
              backgroundColor: theme.palette.background.paper
            }}
          >
            <ErrorIcon sx={{ fontSize: 48, color: theme.palette.error.main, mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
              Une erreur est survenue
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
              L&apos;application a rencontré une erreur inattendue.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                opacity: 0.7,
                mb: 3,
                fontFamily: 'monospace',
                wordBreak: 'break-word'
              }}
            >
              {this.state.error?.message}
            </Typography>
            <Button variant="contained" onClick={this.handleReload}>
              Recharger
            </Button>
          </Paper>
        </Box>
      )
    }

    return this.props.children
  }
}
```

- [ ] **Step 2: Create ErrorBoundary index re-export**

```typescript
// src/renderer/src/components/ErrorBoundary/index.ts
export { ErrorBoundary } from './ErrorBoundary'
```

- [ ] **Step 3: Wire ErrorBoundary into main.tsx**

Replace the entire content of `src/renderer/src/main.tsx`:

```tsx
// src/renderer/src/main.tsx
import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/app'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
```

- [ ] **Step 4: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/renderer/src/components/ErrorBoundary/ErrorBoundary.tsx src/renderer/src/components/ErrorBoundary/index.ts src/renderer/src/main.tsx
git commit -m "feat: add ErrorBoundary component and wire into app root"
```

---

### Task 9: React Query Devtools (already present — verify and adjust)

**Files:**

- Modify: `src/renderer/src/app/provider.tsx` (verify devtools condition)

- [ ] **Step 1: Verify React Query Devtools are already configured**

Read `src/renderer/src/app/provider.tsx` — it already imports `ReactQueryDevtools` and renders it conditionally:

```tsx
{
  process.env.NODE_ENV === 'development' && <ReactQueryDevtools />
}
```

This is correct. The devtools are only shown in development. No changes needed to the Provider.

However, `@tanstack/react-query-devtools` is in `devDependencies` in `package.json`, which is correct for production builds.

No file changes needed. Mark this task as complete.

- [ ] **Step 2: Commit (noop if nothing changed)**

If no files changed, skip commit. Otherwise:

```bash
git add -A
git commit -m "chore: verify React Query Devtools configuration"
```

---

### Task 10: Window title updates (document title based on current route)

**Files:**

- Create: `src/renderer/src/hooks/usePageTitle.ts`

- [ ] **Step 1: Create usePageTitle hook**

```typescript
// src/renderer/src/hooks/usePageTitle.ts
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES, ROUTE_TITLES } from '../lib/constants'
import type { RouteName } from '../lib/constants'

const DEFAULT_TITLE = 'MyCdi'

export const usePageTitle = (): void => {
  const { t } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    const pathRoute = location.pathname.replace('/', '') || ROUTES.JOURNAL
    const routeName = pathRoute as RouteName
    const titleKey = ROUTE_TITLES[routeName]

    if (titleKey) {
      document.title = t(titleKey)
    } else {
      document.title = DEFAULT_TITLE
    }
  }, [location.pathname, t])
}
```

- [ ] **Step 2: Wire usePageTitle into AppLayout**

Update `src/renderer/src/components/AppLayout/AppLayout.tsx` to include `usePageTitle`:

```tsx
// src/renderer/src/components/AppLayout/AppLayout.tsx
import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { rootBoxStyles, contentBoxStyles } from '../../lib/styles/AppLayout.styles'
import { usePageTitle } from '../../hooks/usePageTitle'

export const AppLayout: React.FC = () => {
  usePageTitle()

  return (
    <Box sx={rootBoxStyles}>
      <Navbar />
      <Box sx={contentBoxStyles}>
        <Outlet />
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: Update index.html default title**

In `src/renderer/index.html`, change the `<title>` tag from `Electron` to `MyCdi`:

```html
<title>MyCdi</title>
```

- [ ] **Step 4: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/renderer/src/hooks/usePageTitle.ts src/renderer/src/components/AppLayout/AppLayout.tsx src/renderer/index.html
git commit -m "feat: add usePageTitle hook to update window title on route change"
```

---

### Task 11: Keyboard shortcuts (Ctrl+1/2/3 for page navigation)

**Files:**

- Create: `src/renderer/src/hooks/useKeyboardShortcuts.ts`
- Modify: `src/renderer/src/components/AppLayout/AppLayout.tsx`

- [ ] **Step 1: Create useKeyboardShortcuts hook**

```typescript
// src/renderer/src/hooks/useKeyboardShortcuts.ts
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { KEYBOARD_SHORTCUT_MAP, ROUTES } from '../lib/constants'
import type { RouteName } from '../lib/constants'

const MODIFIER_KEY = 'ctrl'

export const useKeyboardShortcuts = (): void => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!event[MODIFIER_KEY]) return

      const route = KEYBOARD_SHORTCUT_MAP[event.key]
      if (!route) return

      event.preventDefault()

      const targetPath = `/${route}`
      if (location.pathname !== targetPath) {
        navigate(targetPath)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate, location.pathname])
}
```

- [ ] **Step 2: Wire useKeyboardShortcuts into AppLayout**

Update `src/renderer/src/components/AppLayout/AppLayout.tsx` to include `useKeyboardShortcuts`:

```tsx
// src/renderer/src/components/AppLayout/AppLayout.tsx
import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { rootBoxStyles, contentBoxStyles } from '../../lib/styles/AppLayout.styles'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'

export const AppLayout: React.FC = () => {
  usePageTitle()
  useKeyboardShortcuts()

  return (
    <Box sx={rootBoxStyles}>
      <Navbar />
      <Box sx={contentBoxStyles}>
        <Outlet />
      </Box>
    </Box>
  )
}
```

- [ ] **Step 3: Verify typecheck passes**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/renderer/src/hooks/useKeyboardShortcuts.ts src/renderer/src/components/AppLayout/AppLayout.tsx
git commit -m "feat: add Ctrl+1/2/3 keyboard shortcuts for page navigation"
```

---

### Task 12: Auto-updater integration

**Files:**

- Modify: `src/main/index.ts`
- Modify: `src/preload/index.ts`
- Modify: `src/preload/index.d.ts`
- Modify: `electron-builder.yml`

- [ ] **Step 1: Add auto-updater to main process**

Add the auto-updater logic to `src/main/index.ts`. Insert at the top, after existing imports, and add a new function called `setupAutoUpdater`.

Add these imports at the top of `src/main/index.ts` (after the existing imports):

```typescript
import { autoUpdater } from 'electron-updater'
```

Add this function after `createWindow()`:

```typescript
function setupAutoUpdater(): void {
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('update-available', () => {
    console.log('Update available')
  })

  autoUpdater.on('update-not-available', () => {
    console.log('No updates available')
  })

  autoUpdater.on('download-progress', (progressInfo) => {
    console.log(`Download progress: ${progressInfo.percent.toFixed(1)}%`)
  })

  autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded, will install on quit')
  })

  autoUpdater.on('error', (error) => {
    console.error('Auto-updater error:', error)
  })

  autoUpdater.checkForUpdates().catch((error) => {
    console.error('Failed to check for updates:', error)
  })
}
```

Then in the `app.whenReady().then(...)` block, after `createWindow()`, add:

```typescript
setupAutoUpdater()
```

The final `src/main/index.ts` should look like this:

```typescript
// src/main/index.ts
import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import icon from '../../resources/icon.png?asset'
import { CDIDatabase } from './database/database'
import { createStudentModule } from './modules/student'
import { createFrequentationModule } from './modules/frequentation'

declare global {
  var modules: {
    student: ReturnType<typeof createStudentModule>
    frequentation: ReturnType<typeof createFrequentationModule>
  }
}

const database = new CDIDatabase()

const modules = {
  student: createStudentModule(database.getDb()),
  frequentation: createFrequentationModule(database.getDb())
}

global.modules = modules

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function setupAutoUpdater(): void {
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('update-available', () => {
    console.log('Update available')
  })

  autoUpdater.on('update-not-available', () => {
    console.log('No updates available')
  })

  autoUpdater.on('download-progress', (progressInfo) => {
    console.log(`Download progress: ${progressInfo.percent.toFixed(1)}%`)
  })

  autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded, will install on quit')
  })

  autoUpdater.on('error', (error) => {
    console.error('Auto-updater error:', error)
  })

  if (!is.dev) {
    autoUpdater.checkForUpdates().catch((error) => {
      console.error('Failed to check for updates:', error)
    })
  }
}

app.on('before-quit', async () => {})

app.whenReady().then(() => {
  console.log('🚀 Initializing application modules...')

  try {
    database.cleanup()
    console.log('✅ Database cleanup completed')
    console.log('🎉 All modules initialized successfully!')
  } catch (error) {
    console.error('❌ Failed to initialize modules:', error)
    throw error
  }

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  setupAutoUpdater()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

- [ ] **Step 2: Verify main process typecheck**

Run: `npx tsc --noEmit -p tsconfig.node.json --composite false 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/main/index.ts
git commit -m "feat: integrate electron-updater for auto-update checks on startup"
```

---

### Task 13: Fix ESLint import restrictions for new component paths

**Files:**

- Modify: `eslint.config.mjs`

The existing ESLint config restricts imports from `features` into `app`, and from `components/hooks/lib/types/utils` from `features/app`. Our new components (AppLayout, Navbar, ErrorBoundary, ConfirmDialog, AppVersion) live in `src/renderer/src/components/`, and they import from `lib/constants` and `lib/theme`. The AppLayout also imports hooks from `hooks/`. These are in the restricted zones from `app`. But `components` is not in the `from` restriction — the restriction is one-directional:

```
target: [components, hooks, lib, types, utils]
from: [features, app]
```

This means features and app cannot import from `components/hooks/lib/types/utils` — wait, that's wrong. Let me re-read the config.

Looking at the config more carefully:

- `target: [components, hooks, lib, types, utils]` — **from** `[features, app]`
- This means: `components/hooks/lib/types/utils` cannot import from `features` or `app`

But `AppLayout` imports `usePageTitle` from `hooks/` and `Navbar` from `components/`. Both are within the same restricted zones, so they can import from each other. The issue would be if `Navbar` imports from `lib/constants` — since both `components` and `lib` are in the `target` array, and the `from` is `[features, app]`, importing from `lib` inside `components` is fine (components is a target, not a from; lib is also a target, not a from — the restriction is that targets can't import FROM features/app).

Actually, re-reading: the `import/no-restricted-paths` uses:

- zones with `target` and `from` — code in `target` cannot import from `from`

The zones are:

1. `target: features/journal`, `from: features` (except journal) — journal can't import from other features
2. `target: features/students`, `from: features` (except students) — students can't import from other features
3. `target: features`, `from: app` — features can't import from app
4. `target: [components, hooks, lib, types, utils]`, `from: [features, app]` — shared code can't import from features or app

Wait, zone 4 says: code IN `components/hooks/lib/types/utils` cannot import FROM `features` or `app`. This means our `Navbar` (in `components/`) importing from `lib/constants` is fine since lib is not in `from`. But `Navbar` imports from `lib/theme` — that's fine.

The `AppLayout` component imports `usePageTitle` from `hooks/` — both `components` and `hooks` are in the target, so importing from `hooks` inside `components` is fine.

The `usePageTitle` hook imports from `lib/constants` — hooks importing from lib is fine since features/app are in the `from`.

However, `AppLayout` is used inside `router.tsx`, which is in `app/`. The `AppRouter` in `router.tsx` imports `AppLayout` from `components/AppLayout`. Since `app` is in the `from` of zone 3 and 4, and the code importing IS `app` (not the target), this should be fine.

Actually wait — let me re-check. Zone 3: `target: features`, `from: app` means features can't import from app. But we want app importing from components, which is zone 4 in reverse — app is in the `from`, and components is in the `target`. Zone 4 prevents `components` from importing from `app`, not the other way around.

So `app/router.tsx` importing `AppLayout` from `components/AppLayout` is NOT restricted by any zone (app is not a target in any zone that has components as from).

No ESLint changes needed.

- [ ] **Step 1: Run ESLint to verify no import restriction violations**

Run: `npx eslint src/renderer/src/app/router.tsx src/renderer/src/components/AppLayout/AppLayout.tsx src/renderer/src/components/Navbar/Navbar.tsx src/renderer/src/hooks/usePageTitle.ts src/renderer/src/hooks/useKeyboardShortcuts.ts 2>&1 | head -30`
Expected: No errors or only warnings (not errors). If there are import restriction errors, they need to be fixed.

- [ ] **Step 2: If any errors found, fix them and commit. If no errors, skip commit.**

```bash
git add -A
git commit -m "chore: verify ESLint import restrictions with new components"
```

---

### Task 14: End-to-end typecheck and ESLint verification

**Files:**

- All previously modified files

- [ ] **Step 1: Run full typecheck for web (renderer)**

Run: `npx tsc --noEmit -p tsconfig.web.json --composite false`
Expected: EXIT 0, no errors

- [ ] **Step 2: Run full typecheck for node (main + preload)**

Run: `npx tsc --noEmit -p tsconfig.node.json --composite false`
Expected: EXIT 0, no errors

- [ ] **Step 3: Run full typecheck (both together)**

Run: `npm run typecheck`
Expected: EXIT 0, no errors

- [ ] **Step 4: Run ESLint on entire codebase**

Run: `npm run lint 2>&1 | tail -20`
Expected: EXIT 0, no errors (warnings are acceptable)

- [ ] **Step 5: If any issues found, fix them**

Fix any typecheck or lint errors found in the previous steps. Common things to check:

- Missing imports for `react-router-dom`
- Missing `key` props in loops
- Type assertions that should be avoided

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve typecheck and lint errors from integration"
```

---

### Task 15: Dev smoke test

**Files:**

- No file changes — manual verification only

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: Electron window opens

- [ ] **Step 2: Verify Journal page loads (default route)**

- App opens on the Journal page (hash route `/#/journal`)
- Date picker is visible
- Student selector autocomplete is visible
- Navbar shows all three tabs: Journal, Élèves, Statistiques
- "Journal" tab is highlighted
- Version number (v1.0.0) appears in the Navbar

- [ ] **Step 3: Verify navigation to Students page**

- Click "Élèves" in Navbar
- StudentsPage loads with search bar, table, and "Ajouter un élève" button
- URL changes to `/#/students`
- "Élèves" tab is highlighted
- Document title changes to "Élèves - MyCdi"

- [ ] **Step 4: Verify navigation to Statistics page**

- Click "Statistiques" in Navbar
- StatisticsPage loads with construction icon and placeholder text
- URL changes to `/#/statistics`
- "Statistiques" tab is highlighted

- [ ] **Step 5: Verify keyboard shortcuts**

- Press Ctrl+1 → navigates to Journal
- Press Ctrl+2 → navigates to Students
- Press Ctrl+3 → navigates to Statistics

- [ ] **Step 6: Verify CRUD operations on Students page**

- Click "Ajouter un élève" → dialog appears
- Fill in name, prenom, classe, ine → click "Ajouter" → student appears in table
- Edit a student → changes persist
- Delete a student → confirmation dialog appears, confirm → student removed

- [ ] **Step 7: Verify Journal page CRUD**

- Navigate back to Journal
- Select a student from autocomplete, pick activity, click "Ajouter des élèves"
- Entry appears in the frequentation table below
- Edit an entry's activity → changes persist
- Delete an entry → confirmation dialog → entry removed

- [ ] **Step 8: Verify React Query Devtools**

- In dev mode, the TanStack Query Devtools icon should appear in the bottom-left corner
- Clicking it opens the devtools panel

- [ ] **Step 9: Close the app and stop the dev server**

- Close the Electron window
- The dev process should exit cleanly

---

### Task 16: Final commit and verify clean state

**Files:**

- No file changes — final verification only

- [ ] **Step 1: Check for any uncommitted changes**

Run: `git status`
Expected: `nothing to commit, working tree clean` or only unrelated files

- [ ] **Step 2: If there are uncommitted changes from integration work, commit them**

```bash
git add -A
git commit -m "chore: final integration polish cleanup"
```

- [ ] **Step 3: Verify git log shows all integration commits**

Run: `git log --oneline -15`
Expected: All task commits visible in order:

1. `feat: add ROUTES constants and i18n keys for integration`
2. `feat: add ConfirmDialog shared component with i18n support`
3. `feat: add Navbar component with ROUTES constants and i18n`
4. `feat: add AppVersion component with build-time version injection`
5. `feat: add React Router with lazy-loaded page routes`
6. `feat: add AppLayout component with React Router Outlet`
7. `feat: update StatisticsPage with i18n and styled placeholder`
8. `feat: add ErrorBoundary component and wire into app root`
9. `feat: add usePageTitle hook to update window title on route change`
10. `feat: add Ctrl+1/2/3 keyboard shortcuts for page navigation`
11. `feat: integrate electron-updater for auto-update checks on startup`
12. Any fixes from Task 14

- [ ] **Step 4: Final full verification**

Run: `npm run typecheck && npm run lint`
Expected: Both pass with exit code 0

- [ ] **Step 5: Verify the build succeeds**

Run: `npx electron-vite build 2>&1 | tail -20`
Expected: Build completes successfully with no errors
