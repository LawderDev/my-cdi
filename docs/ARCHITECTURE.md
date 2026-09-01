# My-CDI Architecture & Guidelines

> Living document. Every line of code in this repo follows these rules.

---

## 1. Overview

My-CDI is a French school library (CDI) attendance tracking Electron desktop application.

| Layer     | Technology                        |
| --------- | --------------------------------- |
| Framework | React 19 + Electron 40            |
| Build     | electron-vite 5 + Vite 7          |
| Language  | TypeScript 5.9                    |
| Database  | better-sqlite3 + Drizzle ORM      |
| State     | TanStack Query 5 + React Compiler |
| Routing   | React Router 7                    |
| Forms     | React Hook Form + Zod             |
| UI        | MUI 7                             |
| i18n      | i18next + react-i18next           |
| Testing   | Vitest + React Testing Library    |

### Build & Tooling

| Script           | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| `typecheck:node` | Type-check main + preload (`tsconfig.node.json`) |
| `typecheck:web`  | Type-check renderer (`tsconfig.web.json`)        |
| `build:win`      | Windows installer (`electron-builder`)           |
| `build:mac`      | macOS DMG                                        |
| `build:linux`    | Linux AppImage / deb                             |
| `postinstall`    | `electron-builder install-app-deps`              |

**electron-vite** configures three separate build blocks (main, preload, renderer) with divergent path aliases. The renderer block injects `babel-plugin-react-compiler` with `target: '19'`. **Drizzle Kit** runs migrations and generates schema metadata.

---

## 2. Electron Process Architecture

Three-process model:

| Process      | Entry                   | Role                                    |
| ------------ | ----------------------- | --------------------------------------- |
| **Main**     | `src/main/index.ts`     | Electron app lifecycle, window creation |
| **Preload**  | `src/preload/index.ts`  | Secure bridge between main ↔ renderer   |
| **Renderer** | `src/renderer/main.tsx` | React root, providers, routes           |

Communication flows:

```
Renderer ──► Preload (contextBridge) ──► Main (ipcMain.handle)
     ▲                                          │
     └──────────────────────────────────────────┘
                              (ipcRenderer.invoke)
```

### Module Wiring (Main)

`src/main/modules.ts` orchestrates cross-feature dependency injection:

1. Instantiate gateways
2. Inject `studentGateway` into `frequentationModule`
3. Inject `frequentationGateway` into `statisticsModule`
4. Invoke `cleanupOldFrequentations()` after all modules initialize

### Auto-Updater

`main/index.ts` registers `registerAutoUpdater(targetWindow)` which wires `electron-updater` events to `webContents.send` via `UPDATER_CHANNELS`. On the renderer side, `window.electronAPI.updater` exposes `onUpdateAvailable`, `onDownloadProgress`, etc., using `subscribeToChannel` (pub/sub, not `invoke`).

`useAutoUpdater` tracks a state machine (`'idle' | 'available' | 'downloading' | 'downloaded' | 'error'`) and is the only allowed `useEffect` hook for updater sync. `UpdateBanner` mounts globally inside `AppShell`.

---

## 3. Feature-Vertical Architecture

Each feature is a self-contained vertical slice spanning both Electron processes.

```
src/
├── features/
│   ├── student/
│   │   ├── main/        # Backend clean arch
│   │   ├── renderer/    # Frontend
│   │   └── shared/      # IPC contract types (main ↔ renderer)
│   ├── frequentation/
│   └── statistics/
├── shared/              # Cross-cutting concerns
│   ├── ipc/             # Type-safe router + client
│   ├── db/              # Drizzle connection + schema
│   ├── ui/              # Design system + global helpers
│   ├── lib/             # Generic utilities + errors
│   ├── types/           # Cross-feature domain types
│   └── i18n/            # i18next config + locales
├── main/                # Electron entry + module wiring
├── preload/             # Context bridge
└── renderer/            # React root + routes
```

### Shared Types (IPC Contract)

Every feature's `shared/types.ts` defines the DTOs that cross the main/renderer boundary:

| Suffix               | Purpose                     | Example                  |
| -------------------- | --------------------------- | ------------------------ |
| `CreateXxxDto`       | Input for create operations | `CreateStudentDto`       |
| `UpdateXxxDto`       | Input for update operations | `UpdateStudentDto`       |
| `XxxResponseDto`     | Output from read operations | `StudentResponseDto`     |
| `XxxListResponseDto` | Paginated list response     | `StudentListResponseDto` |
| `BulkXxxResponseDto` | Batch operation result      | `BulkStudentResponseDto` |

---

## 4. Type-Safe IPC

No raw channel strings. The IPC system is type-safe end-to-end.

**Main side** — `shared/ipc/router.ts`

```ts
createMainRouter(ipcMain).procedure(STUDENT_CHANNELS.CREATE, async (input) => {
  return unwrap(await createStudent(deps, input))
})
```

**Renderer side** — `preload/index.ts` exposes `window.electronAPI`

```ts
window.electronAPI.student.create(input)
window.electronAPI.frequentation.list(input)
```

**Channels** — Named constants in `shared/ipc/channels.ts`. Never use raw strings.

**Preload namespace** — `window.electronAPI` exposes nested namespaces (`student`, `frequentation`, `statistics`, `updater`) plus a standalone `getAppVersion()`. The pub/sub pattern (`subscribeToChannel` for updater events) wraps `ipcRenderer.on` / `removeListener`.

---

## 5. Database Layer

- **Drizzle ORM** with `better-sqlite3`
- **Schema** co-located in feature entities: `features/X/main/entities/X/`
- **Entity helpers** for computed fields live in `entities/X/helpers/` (e.g., `computeStudentFields` for `fullName`)
- **Zod schemas** live alongside Drizzle schema for validation
- **Migrations** managed by Drizzle Kit, output in `drizzle/`
- **Schema registry** at `shared/db/schema.ts` re-exports all feature schemas
- **Auto-cleanup**: frequentations older than 2 years are deleted on startup

```
shared/db/
├── connection.ts     # better-sqlite3 singleton
├── schema.ts       # Re-exports all feature schemas
└── migrate.ts      # Run migrations on startup
```

---

## 6. Backend Clean Architecture

Dependency direction:

```
controllers → use-cases → entities ← gateways (interface)
                                   ↓
                          gateways (implementation, injected at wiring time)
```

Rules:

- **Use-cases depend on gateway interfaces only** — never implementations
- **Gateway implementations are injected** in `features/X/main/index.ts`
- **Controllers are thin IPC orchestration** — no business logic
- Cross-feature dependencies: `frequentation` use-cases may depend on `student` gateway **interface**, not implementation

```
features/student/main/
├── entities/student/           # Drizzle schema + Zod schemas + computed-field helpers
├── use-cases/createStudent/      # Business logic
├── use-cases/helpers/            # Response formatting (entity → DTO)
├── use-cases/types/            # Use-case-specific types (UseCaseResult)
├── gateways/student/             # Interface + Drizzle implementation
└── controllers/student/         # IPC wiring
```

---

## 7. Renderer Entry & Provider Nesting

Provider stack order in `App.tsx`:

```
QueryClientProvider
  └── ThemeProvider
        └── CssBaseline
              └── LocalizationProvider (dayjs/fr)
                    └── ErrorBoundary
                          └── BrowserRouter
```

Query client defaults: `staleTime: 60s`, `retry: 1`.

### Global Layout (`AppShell`)

`AppShell` is the root layout for all pages. It wraps the route tree with:

- **Sidebar** — navigation rail with route icons
- **Header** — page title + context actions
- **UpdateBanner** — global auto-updater status (mounts inside the layout, not as a dialog)
- **Main content area** — renders `<Outlet />` for the active route

Global keyboard shortcuts (Ctrl/Cmd + 1/2/3) are registered here for instant navigation between main routes.

### Error Boundary

A single class-component `ErrorBoundary` wraps the route tree below `BrowserRouter`. It catches render errors, renders `ErrorFallback` (localized title + description + collapsible stack trace + reload button), and is the only error boundary in the app.

---

## 8. Frontend Container/Presenter Pattern

### Containers (`…Container`)

- Folder == file == component name: `containers/XContainer/XContainer.tsx`, re-exported by `index.ts`
- Import hooks, manage state, build view models, pass data to presenters via props
- May nest other containers
- **All logic lives here** — in `hooks/useX/` or `helpers/helperName/` sub-units, each with `index.ts` + `__tests__/`
- Containers may call `.map()` / `.filter()` / `.reduce()` and render JSX

### Presenters (`…Presenter`)

- Pure `props → JSX` components, named `XPresenter`, living under `presenters/` folders
- **Zero hooks** except `useTranslation` (read-only context consumer)
- **Zero state, zero logic, zero inline functions**
- **Zero `.map()` / `.filter()` / `.reduce()`** — lists arrive as pre-built `ReactNode[]` or the container maps a flat view model array in the container itself
- Zero arithmetic (`Math.min`, `parseInt`, `dayjs`, `toFixed`), zero string/class building, no non-`t` function calls
- Every presenter has a dedicated `XPresenter.styles.ts` file with `styled()` components

### Page → Container → Presenter Hierarchy

```
Page (pages/XPage/XPage.tsx)
  └── Container (containers/XContainer/XContainer.tsx)
        └── Presenter (presenters/XPresenter/XPresenter.tsx)
```

Pages orchestrate dialog state and compose containers. Containers manage data, selection, and batch actions, then pass props to presenters. Presenters are pure `props → JSX`.

### Naming

- The suffix is explicit and mandatory: `XContainer` / `XPresenter` (folder == file == component name)
- Shared/ui primitives (`Button`, `Card`, `Icon`, `Modal`…), pages, `ErrorBoundary`, and `src/renderer/` units keep unsuffixed names

### The two legal prop shapes

1. **Flat view models** for fixed slots — `initials`, `periodLabel`, `rowCount`, `percentDisplay`… all derivation done in the container:

```tsx
// ✅ Container — derives everything, builds flat view models
export function JournalEntryListContainer({ selectedDate, onEditEntry }: Props) {
  const rows = entries.map((entry) => ({
    initials: buildInitials(entry.student.prenom, entry.student.nom),
    periodLabel: getEntryPeriod(entry.time),
    selected: selectedIds.includes(entry.id),
    onRowClick: () => selectEntry(entry.id)
  }))
  return rows.map((row) => <JournalEntryRowPresenter key={row.id} {...row} />)
}

// ✅ Presenter — pure display of flat props, zero derivation
export function JournalEntryRowPresenter({ initials, periodLabel }: Props) {
  return <RowRoot>...</RowRoot>
}
```

2. **Node arrays** (`ReactNode[]`) for lists the container renders once:

```tsx
// ✅ Container builds the nodes
const dayNodes: ReactNode[] = cells.map((cell) => (
  <CalendarDayPresenter key={cell.iso} cell={cell} onClick={() => selectDay(cell.iso)} />
))
return <CalendarViewPresenter dayNodes={dayNodes} />

// ✅ Presenter renders them without mapping
export function CalendarViewPresenter({ dayNodes }: CalendarViewPresenterProps) {
  return <Grid>{dayNodes}</Grid>
}
```

Conditional rendering (`cond ? <A/> : null`) and early returns choosing *what* to render stay in presenters; everything else derived moves up.

### Styling: `styled()` in `.styles.ts`, theme as single source of truth

- **Zero inline `sx={{...}}`** in feature or shared/ui components. All styling lives in `XPresenter.styles.ts` (or `XContainer.styles.ts`) as `styled()` components from `@mui/material/styles`.
- **The MUI theme (`@ui/theme`) is the only source of design tokens.** `global.css` contains nothing but the font `@import` lines; element resets, scrollbar styling and the base body styles live in the `MuiCssBaseline` overrides in `theme.ts`. Never use CSS custom properties (`var(--...)`), hardcoded hex/rgba colors or raw px `fontSize` in components — resolve everything from the theme.
- MUI v9's `styled()` serialises style objects with emotion's raw CSS serializer and does **not** resolve MUI system props (`mt`, `px`, `gap`, `bgcolor`, …) — they would reach the stylesheet unprocessed and be silently dropped. Style objects therefore use **real CSS properties** and `theme.spacing()` for spacing-scale values (`paddingInline: theme.spacing(1)`, `backgroundColor`, `gap: theme.spacing(0.75)`), never system-prop shorthands.
- Every styled call passes the shared prop filter:

```tsx
// XPresenter.styles.ts
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const TileButton = styled('button', { shouldForwardProp: shouldForwardStyledProp })<{
  $isSelected: boolean
}>(({ theme, $isSelected }) => ({
  borderColor: $isSelected ? theme.palette.primary.main : theme.palette.divider,
  paddingInline: theme.spacing(1),
  '&[data-selected="true"]': {
    backgroundColor: alpha(theme.palette.primary.main, TINT_ALPHAS.surface)
  }
}))
```

- **Text slots render as `Typography`.** Plain text becomes `styled(Typography)` with the variant chosen at the call site (`<Label variant="overline">`, `<Value variant="h4">`). Non-text elements that need a font size (icons, chart-adjacent bits) use `theme.typography.<variant>.fontSize` or the numeric `TYPE_SCALE` export — never raw px. The scale lives in `TYPE_SCALE` (caption 11 / body2 12 / body1 13 / subtitle2 14 / subtitle1 16 / h6 18 / h5 20 / h4 28 / h3 40 / h2 48) and weights in `FONT_WEIGHTS`; both are re-exported from `@ui/theme`.
- **Tinted colors** (soft backgrounds/borders derived from a palette color) use `alpha()` with the shared `TINT_ALPHAS` steps (surface 0.1 / hover 0.2 / border 0.25). Custom palette slots added via module augmentation: `palette.sidebar`, `palette.surface`, `palette.dividerStrong`, `palette.activity.<tone>` (activity accents shared by chips, tiles and charts). Activity/period coloring is data-attribute driven (`data-tone`, `data-period`) — no CSS classes.
- Conditional styles via transient `$props` (typed in the generic) or attribute selectors when the state is already in the DOM (`'&[data-active="true"]'`, `'&[data-sign="up"]'`) — never conditional object spreads
- Transitions use `theme.transitions.create([...props], { duration: theme.transitions.duration.* })`; shadows use `theme.shadows[1..4]` (1 = soft card, 2 = large modal, 3/4 = accent glow); breakpoints use `theme.breakpoints.down('lg')` (lg = 1100px) — never `@media` with hardcoded px.
- px values > 12 are hoisted to `*_PX` constants; spacing-scale values use `theme.spacing()` (constants holding spacing steps are named `*_STEPS`)
- The one exception: `Card` forwards its callers' `sx` prop to its styled root (MUI applies caller `sx` after the base styles)

### List & Table Patterns

**No shared `DataTable` abstraction.** Each feature builds its own list:

- Student list: raw HTML `<table>` (`StudentTablePresenter` + `StudentTableRowPresenter`); the container passes `headerNodes` / `rowNodes` / `countLabel`
- Journal list: flex `Box` rows (`JournalEntryRowPresenter`)

**Sorting** is client-side via pure helpers:

- `buildNextSortConfig(sortConfig, field)` toggles `asc` / `desc`
- `sortStudentRows(rows, config)` uses `Intl.Collator('fr')` for locale-aware sorting

**No pagination.** All lists load the full dataset and filter/sort client-side.

### Filtering & Search

All filtering happens in the renderer on the full fetched dataset. Pattern:

1. `useState` for filter terms (`useStudentFilters`, `useEntryPeriodFilter`)
2. Pure helper filters the rows (`filterStudentRows`, `filterEntriesByPeriod`)
3. Data hook composes fetch → filter → sort → pass to presenter

Search is case-insensitive multi-field match (`nom`, `prenom`, `classe`, `ine`).

### Batch Operations

Consistent 3-layer architecture for any list with multi-select:

1. **Selection hook** (`useStudentSelection` / `useJournalEntrySelection`)
   - `useState<number[]>` for `selectedIds`
   - `toggle(id)`, `selectAll(ids)`, `clearSelection()`, `isSelected(id)`

2. **Batch actions container** (`StudentBatchActionsContainer` / `JournalBatchActionsContainer`)
   - Renders a strip with "Select All / Deselect All", "Delete", "Change Activity"
   - Uses `ConfirmDialog` for destructive confirmation
   - Calls `onAfterDelete` / `onAfterUpdate` to clear selection after mutation

3. **Orchestration hook** (`useStudentBatchActions` / `useJournalBatchActions`)
   - Manages `ConfirmDialog` open/close state
   - Computes `isAllSelected` (selectedCount === totalCount)
   - Derives toggle label ("Select All" vs "Deselect All")

---

## 9. Error Handling

### Use-Case Results

Every use-case returns a discriminated union:

```ts
type UseCaseResult<T> = { success: true; data: T } | { success: false; error: string }
```

Controllers `unwrap()` the result before sending it over IPC. The renderer receives `{ success, data }` or `{ success, error }`.

**IPC errors** also carry an optional `code` field: `{ success: false; error: string; code?: string }`.

### AppError

```ts
throw new AppError(ErrorCode.STUDENT_NOT_FOUND, 'Student not found')
```

- `AppError` exposes `readonly code: ErrorCode`
- Always use `ErrorCode` enum, never raw strings
- `isAppError()` for type narrowing at boundaries

**IPC serialization** — the router extracts `error.message` and `error.code` manually; it does not call `toJSON()`.

---

## 10. Route Lazy Loading

Pages are lazy-loaded via `React.lazy()` to keep the initial bundle small.

```tsx
// src/renderer/routes/JournalPage.tsx
const JournalPageImpl = lazy(async () => {
  const mod = await import('@frequentation/pages/JournalPage')
  return { default: mod.JournalPage }
})
export default JournalPageImpl
```

**Exception**: Route files use `export default` because React Router's `React.lazy()` requires a default export.

### Suspense Fallback

Lazy-loaded pages are wrapped in `Suspense` with a `RouteSuspenseFallback` spinner (own unit under `src/renderer/routes/RouteSuspenseFallback/`). A local `SuspenseRoute` helper in `AppRoutes` composes the `Suspense` boundary so each route declaration stays one line.

---

## 11. React Query API Patterns

### Fetchers

Every IPC fetcher checks the discriminated result and throws on failure:

```ts
const result = await window.electronAPI.student.getById(id)
if (!result.success) {
  throw new Error(result.error)
}
return result.data
```

### Mutations

After a successful mutation, invalidate the feature's query key factory:

```ts
queryClient.invalidateQueries({ queryKey: studentKeys.all })
```

---

## 12. Hook Naming Conventions

| Pattern           | Example               | Purpose                                 |
| ----------------- | --------------------- | --------------------------------------- |
| `useXxxPage`      | `useJournalPage`      | Page-level orchestration                |
| `useXxxData`      | `useStudentListData`  | Data filtering/sorting over React Query |
| `useXxxForm`      | `useJournalEntryForm` | Form logic (RHF + Zod)                  |
| `useXxxSelection` | `useStudentSelection` | Selection state (checkboxes, etc.)      |
| `useXxxQueries`   | `useStudentQueries`   | React Query read hooks                  |
| `useXxxMutations` | `useCreateStudent`    | React Query mutation hooks              |

---

## 13. Form Patterns

### RHF + Zod Integration

- Form schemas live in `validations/` folders (e.g., `studentFormSchema`, `journalEntryFormSchema`).
- DTO mapping helpers live in `helpers/` (e.g., `mapFormToCreateDto`, `mapFormToBatchDto`).
- Edit forms use `values:` (not `defaultValues:`) to populate from a view model.

### Two Input Patterns

1. **`register` pattern** — simple text inputs (`StudentFormFields` receives `UseFormRegister` + `FieldErrors`).
2. **`Controller` pattern** — custom/complex inputs (`TimeRow`, `StudentMultiSelect`, `ActivityGrid` wrapped in `<Controller>`).

---

## 14. React Quality Rules

### No Manual Memoization

React Compiler handles automatic memoization. **Zero** `useMemo` / `useCallback` in the codebase.

### No `useWatch` (Default)

Prefer deriving values during render (`form.formState.isValid`, `form.getValues()`, direct prop reads) over subscribing to field changes.

Because this project runs **React Compiler in strict mode**, automatic memoization already isolates re-renders. Therefore `useWatch` is **never strictly necessary** here.

Exception — only if a deeply nested child component in a very large form genuinely cannot access the value any other way and React Compiler does not cover the case. The usage must be justified in a PR description.

### `useEffect` Only for External System Sync

Per [React docs](https://react.dev/learn/you-might-not-need-an-effect), `useEffect` is **only** allowed for synchronizing with external systems:

- `useClock` — syncs with browser `setInterval`
- `usePageTitle` — syncs with `document.title`
- `useKeyboardShortcuts` — syncs with `document` key events
- `useAutoUpdater` — syncs with Electron auto-updater

**Forbidden in all other cases** — derive state during render, not in effects.

### Hooks Location

- **Containers** (`…Container`) and **hooks/** folders only
- **Presenters** (`…Presenter`) must have zero hooks (except `useTranslation`) and zero `.map()`
- **Helpers** must have zero React imports

### No Inline Components

Never define a component inside another component. Extract to its own folder with `index.ts` + `.styles.ts`.

---

## 15. Dialog / Modal Pattern

Shared primitives in `shared/ui/components/`:

- **Modal** — wrapper around MUI Dialog with custom `maxWidth` mapping (`sm`→`xs`, `md`→`sm`, `lg`→`md`). Accepts a `footer` prop for action buttons.
- **ConfirmDialog** — pre-built confirmation with a `destructive` prop for danger styling.
- **useDialog** — `{ isOpen, open, close }` hook for local dialog state.

Feature dialogs (e.g., `JournalEntryEditDialogPresenter`) use `Modal` directly. Forms inside modals embed a `<form>` and pass actions via the `footer` prop.

---

## 16. Gateway Naming Conventions

Gateway methods follow a strict naming convention:

| Action    | Pattern       | Example                 |
| --------- | ------------- | ----------------------- |
| Create    | `create`      | `create(student)`       |
| Read one  | `getById`     | `getById(id)`           |
| Read by   | `getByXxx`    | `getByClass(class)`     |
| Read all  | `getAll`      | `getAll()`              |
| Update    | `update`      | `update(id, data)`      |
| Delete    | `delete`      | `delete(id)`            |
| Delete by | `deleteByXxx` | `deleteByStudentId(id)` |
| Count     | `count`       | `count()`               |

No `findByXxx` or `listXxx`. Every gateway returns `Entity | null` for single reads, never throws for missing rows.

---

## 17. Date / Time Handling

- **Storage**: dates stored as ISO strings in SQLite; time-of-day stored as `HH:mm` strings.
- **Display**: `formatDate` (`DD/MM/YYYY`) and `formatDateTime` (`DD/MM/YYYY HH:mm`) via `dayjs` with French locale.
- **UI**: MUI X Date Pickers wrapped in `LocalizationProvider` with `AdapterDayjs` and `adapterLocale="fr"`.
- **Cleanup**: `CLEANUP_RETENTION_YEARS = 2` — old frequentations deleted on startup.

---

## 18. CSV Import Flow

**Renderer side:**

- `StudentCsvImportButton` opens a `Modal` with a click-to-browse dropzone
- Hidden `<input type="file" accept=".csv">` triggered by dropzone click
- `File.text()` reads the file, passes raw CSV string to `useImportStudentsCsv` mutation

**Main side:**

- `importStudentsCsv` use-case receives the raw CSV string
- `parseStudentCsv` (PapaParse) parses with `header: true`, validates required columns, caps rows at `MAX_CSV_IMPORT_ROWS`
- `csvRowSchema` (Zod) validates each row
- Deduplicates against existing DB rows (`ine` match) and within-file duplicates
- Gateway creates each student
- Returns `CsvImportResult` `{ created, errors, errorMessages }`

**Key decision:** File contents are read in the renderer and passed as a string over IPC; the main process never touches the filesystem directly.

---

## 19. Statistics & Custom SVG Visualization

**No charting library** (no Recharts, no Chart.js). All charts are custom SVG rendered by pure geometry helpers.

**Backend:** `getStatsForPeriod` computes aggregates from raw frequentation rows and returns a flat DTO with `dailyCounts`, `activityCounts`, `classCounts`, `morningRate` / `afternoonRate`, and `averagePerDay`.

**Frontend pure helpers transform DTOs into SVG primitives:**

- `buildDonutSlices(activityCounts)` → SVG path `d` strings + colors
- `buildTrendPath(dailyCounts, dimensions)` → SVG path `M...L...`, area path, dot coordinates, Y-axis labels
- `buildWeeklyBars(dailyCounts)` → bar heights in px, weekday labels, weekend vs weekday colors
- `svgArc()` computes SVG arc paths for donut slices

Presenters (`ActivityDonutChart`, `MonthlyTrendChart`, `WeeklyBarChart`) render raw `<svg>` elements from these helpers.

---

## 20. Code Quality Rules

### No Type Casting

No `as Type`, no `as unknown`, no `as never`, no non-null assertions (`!.`).

Allowed: `as const` (readonly literal narrowing).

```ts
// ❌
const student = row as StudentEntity
const name = data!.nom

// ✅
const student = StudentEntitySchema.parse(row)
const result = studentGateway.getById(id) // returns StudentEntity | null
```

### No Magic Strings

Every concept-string is a named constant:

| String type    | Mechanism             | Location                  |
| -------------- | --------------------- | ------------------------- |
| Query keys     | Query key factory     | `features/X/api/XKeys.ts` |
| Activity types | `ActivityType` enum   | `shared/types/index.ts`   |
| Route paths    | `ROUTES` constants    | `shared/lib/routes/`      |
| Error codes    | `ErrorCode` enum      | `shared/lib/errors/`      |
| i18n keys      | Type-safe `Resources` | `shared/i18n/config.ts`   |

### No Magic Numbers

Every numeric value is a named `const`:

```ts
// ❌
if (students.length > 1000) { ... }

// ✅
const MAX_CSV_IMPORT_ROWS = 1000
if (students.length > MAX_CSV_IMPORT_ROWS) { ... }
```

Exception: MUI spacing values `0–12` are theme-relative and don't need constants.

### No Bracketless One-Line If

Every `if`, `else if`, `else` uses curly braces:

```ts
// ❌
if (!student) return null

// ✅
if (!student) {
  return null
}
```

### Prefer Early Return

Flatten nested conditionals with guard clauses:

```ts
// ❌ nested
if (entry) {
  if (entry.isValid) {
    doWork(entry)
  }
}

// ✅ early return
if (!entry) {
  return
}
if (!entry.isValid) {
  return
}
doWork(entry)
```

### Single Responsibility Per Function

Each function does exactly one thing. If you need "and" to describe it, split it.

### Self-Documented Code — No Comments

Code must explain itself through clear names. Comments are **only** for explaining **why**, never **what** or **how**.

```ts
// ❌
const MAX_RETRIES = 3 // maximum number of retries

// ✅
const MAX_RETRIES = 3

// ✅ acceptable — explains why
const CACHE_TTL_MS = 5 * 60 * 1000 // SQLite WAL mode plan cache invalidates after 5min
```

### No Abbreviations

Use full words. `v` → `version`, `num` → `number`, `msg` → `message`.

### Utilities (`shared/lib/utils.ts`)

- **`generateId()`** — counter + random-segment ID generator for client-side keys
- **`assertNever(value: never)`** — runtime exhaustiveness check for switch/match arms; pairs with the No Type Casting rule

---

## 21. Design System Wrappers

### Enum-to-Display Metadata

Presentation metadata for enum values is stored as parallel `Record<Enum, X>` maps (tone, icon) in `renderer/helpers/`. This keeps domain types clean while allowing presenters to resolve visual attributes — colors resolve through the theme (`getActivityTone` maps `ActivityType` to a `theme.palette.activity` tone), never through CSS classes:

```ts
const activityTone: Record<ActivityType, ActivityTone> = { ... }
const activityIcons: Record<ActivityType, string> = { ... }
```

The design system in `shared/ui/components/` wraps MUI primitives with application-specific behavior:

| Component       | Purpose                                        |
| --------------- | ---------------------------------------------- |
| `Button`        | Custom `primary`/`secondary`/`danger` variants |
| `Icon`          | Material Icons Round with size aliases         |
| `IconButton`    | Icon-only button with `tone="danger"` support  |
| `Avatar`        | Deterministic color from seed string           |
| `Card`          | Styled surface for content blocks              |
| `Chip`          | Status / category indicators                   |
| `EmptyState`    | Illustration + message for empty lists         |
| `Autocomplete`  | MUI Autocomplete with custom filtering helpers |
| `Modal`         | Dialog wrapper with custom width mapping       |
| `ErrorBoundary` | Global render-error catch + fallback UI        |

`.styles.ts` files export `styled()` components (plus `*_PX` size constants) built with `@mui/material/styles` `styled()` using plain CSS properties and `theme.spacing()` — never MUI system props — and the shared `shouldForwardStyledProp` filter; not MUI `sx`. All design tokens come from the MUI theme (`@ui/theme`): palette (including the custom `sidebar`/`surface`/`dividerStrong`/`activity` slots), `TYPE_SCALE` + `FONT_WEIGHTS` for typography, `RADII`, `TINT_ALPHAS` and `theme.shadows[1..4]`. `global.css` contains only the font imports.

---

## 22. File Structure Rules

1. **Every named unit is a folder** with `moduleName.ts`/`moduleName.tsx` + `index.ts` re-export
2. **Every folder with logic has `__tests__/`** co-located
3. **Types and query key factories are flat files** — no subfolders, no tests. Exception: component prop types live in `types/XxxProps.ts` subfolders alongside the component.
4. **`.tsx` for JSX, `.ts` for everything else** — applies to `index` files too. `index.ts` for re-export-only files.
5. **Gateway exception**: two coordinated files (`*.gateway.ts` + `*.gateway.drizzle.ts`) + `index.ts`
6. **No barrel files**: `index.ts` only re-exports from its single sibling implementation

---

## 23. Co-Location Rules

Every artifact lives as close as possible to its consumer. Only hoist when shared by 2+ consumers at the same level.

| Artifact   | 1 consumer                   | Multiple at same level  | Cross-feature            |
| ---------- | ---------------------------- | ----------------------- | ------------------------ |
| Component  | `containers/X/presenters/Y/` | `renderer/presenters/`  | `shared/ui/components/`  |
| Container  | `pages/X/containers/Y/`      | N/A (nest deeper)       | N/A                      |
| Hook       | `containers/X/hooks/`        | `renderer/hooks/`       | `shared/ui/hooks/`       |
| Helper     | `containers/X/helpers/`      | `renderer/helpers/`     | `shared/ui/helpers/`     |
| Validation | `containers/X/validations/`  | `renderer/validations/` | `shared/ui/validations/` |
| Type       | `containers/X/types/`        | `renderer/types/`       | `shared/types/`          |

---

## 24. Import Rules & Path Aliases

| Scenario                      | Style    | Example                                                              |
| ----------------------------- | -------- | -------------------------------------------------------------------- |
| Same folder or subfolders     | Relative | `import { useBatchDelete } from './hooks/useBatchDelete'`            |
| Same feature, different level | Alias    | `import { useStudentQueries } from '@student/api/useStudentQueries'` |
| Different feature             | Shared   | `import type { StudentGateway } from '@student-shared'`              |
| Cross-cutting shared          | Alias    | `import { useDialog } from '@shared/ui/hooks/useDialog'`             |
| Design system                 | Short    | `import { Button } from '@ui/components/Button'`                     |
| Utilities                     | Short    | `import { AppError } from '@lib/errors'`                             |

### Path Aliases

| Alias                   | Resolves to (Renderer)                  | Resolves to (Main)                  |
| ----------------------- | --------------------------------------- | ----------------------------------- |
| `@student/*`            | `src/features/student/renderer/*`       | `src/features/student/main/*`       |
| `@frequentation/*`      | `src/features/frequentation/renderer/*` | `src/features/frequentation/main/*` |
| `@statistics/*`         | `src/features/statistics/renderer/*`    | `src/features/statistics/main/*`    |
| `@student-shared`       | `src/features/student/shared`           | `src/features/student/shared`       |
| `@frequentation-shared` | `src/features/frequentation/shared`     | `src/features/frequentation/shared` |
| `@statistics-shared`    | `src/features/statistics/shared`        | `src/features/statistics/shared`    |
| `@shared/*`             | `src/shared/*`                          | `src/shared/*`                      |
| `@ui/*`                 | `src/shared/ui/*`                       | N/A                                 |
| `@lib`                  | `src/shared/lib`                        | `src/shared/lib`                    |
| `@types`                | `src/shared/types`                      | `src/shared/types`                  |

---

## 25. Testing Strategy

| File type                  | Test type   | Location                          | What it tests                        |
| -------------------------- | ----------- | --------------------------------- | ------------------------------------ |
| `hooks/`                   | Unit        | `hooks/unitName/__tests__/`       | Hook logic in isolation              |
| `helpers/`                 | Unit        | `helpers/unitName/__tests__/`     | Pure function I/O                    |
| `validations/`             | Unit        | `validations/unitName/__tests__/` | Zod schema pass/fail                 |
| Use-case `index.ts`        | Unit        | `use-cases/unitName/__tests__/`   | Business logic with mock gateway     |
| Entity `index.ts`          | Unit        | `entities/unitName/__tests__/`    | Drizzle schema + Zod validation      |
| Gateway implementation     | Unit        | `gateways/unitName/__tests__/`    | Drizzle queries against in-memory DB |
| `api/` (React Query hooks) | Unit        | `api/unitName/__tests__/`         | Query keys, mutation calls           |
| Container components       | Integration | `containers/X/__tests__/`         | Renders, data flows, callbacks       |
| Presenter components       | Integration | `presenters/X/__tests__/`         | Props render correctly, interactions |
| Page components            | Integration | `pages/X/__tests__/`              | Page renders, routes work            |

**Rule:** Every folder with logic has `__tests__/` co-located. No empty test directories.

### Test Bootstrapping

`vitest.config.ts` loads `shared/test/setup.ts` which imports `@testing-library/jest-dom/vitest` matchers.

### Renderer Test Mocking

Renderer tests mock the IPC bridge by stubbing the global:

```ts
vi.stubGlobal('electronAPI', {
  student: { list: vi.fn().mockResolvedValue({ success: true, data: [] }) }
})
```

### In-Memory DB Testing (Gateways)

Gateway tests create `new Database(':memory:')` and execute raw `CREATE TABLE ...` SQL (plus `PRAGMA` statements) to build the schema by hand, then instantiate the Drizzle gateway directly against the in-memory connection.

---

## 26. Data Flow

```
[User Action]
    ↓
[Container Component (hooks + state)]
    ↓
[React Query Mutation Hook] (renderer/api/)
    ↓
[Preload Bridge] (preload/index.ts — thin pass-through)
    ↓
[IPC Router] (shared/ipc/router.ts)
    ↓
[Controller] (features/X/main/controllers/)
    ↓
[Use Case] (features/X/main/use-cases/)
    ↓
[Gateway Interface] (features/X/main/gateways/X.gateway.ts)
    ↓
[Gateway Implementation] (features/X/main/gateways/X.gateway.drizzle.ts)
    ↓
[Drizzle → SQLite] (shared/db/)
```

### Read-Side DTO-to-ViewModel Transform

Backend DTOs are enriched before reaching presenters. Example: `toJournalEntryViewModel` combines `student.prenom + nom` into `displayName`, looks up the activity label via an injected translator, and attaches `activityColor`. This keeps presenters free of lookup logic.

---

## 27. i18n Strategy

Namespaced JSON files at `shared/i18n/locales/fr/`:

```
shared/i18n/
├── config.ts
└── locales/
    └── fr/
        ├── common.json        # Shared UI strings
        ├── student.json       # Student feature strings
        └── frequentation.json # Attendance strings
```

- French-only for now, but extensible
- Type-safe via i18next `Resources` interface

### English Keys, French Display

Even though the application UI is in French, **all code-side keys, constants, and type literals must be in English**. The French translation lives exclusively in the JSON locale files.

```ts
// ✅ English keys in code
export type EntryPeriod = 'morning' | 'afternoon'
const periodLabel = period === 'morning' ? t('period.morning') : t('period.afternoon')

// ❌ French keys in code
export type EntryPeriod = 'matin' | 'aprem'
const periodLabel = period === 'matin' ? t('period.matin') : t('period.aprem')
```

---

## 28. Exceptions

The following patterns are explicitly allowed as exceptions to the rules above:

### `as const` Readonly Narrowing + Indexed Type Extraction

Allowed for literal type narrowing. The pattern is also used to derive strict union types from constant objects:

```ts
export const ROUTES = { ... } as const
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
```

All other `as` assertions are forbidden.

### `useTranslation` in Presenters

`useTranslation('namespace')` is allowed in presenter components. It is a read-only context hook and does not introduce logic or state.

### MUI Spacing Values

MUI `sx` prop spacing values (`mt`, `mb`, `gap`, `p`, etc.) in the range `0–12` are theme-relative and do not need named constants. Values outside this range and all other numeric values must still be named constants.

### `export default` in Route Files

Route files (`src/renderer/routes/*.tsx`) and `shared/i18n/config.ts` use `export default` because React Router's `React.lazy()` and i18next require it. All other files use named exports only.

### `useWatch`

Forbidden by default. Exception only if a deeply nested child component in a very large form genuinely cannot access the value any other way and React Compiler does not cover the case. Must be justified in a PR description.

---

## 29. Compliance Checklist

When adding or modifying code, verify:

- [ ] No `useMemo` / `useCallback`
- [ ] No `useWatch`
- [ ] `useEffect` only in external-system-sync hooks
- [ ] No hooks in presenters (except `useTranslation`)
- [ ] No inline functions/components inside components
- [ ] Dedicated `.styles.ts` for every JSX file
- [ ] No `as` assertions (except `as const`)
- [ ] No non-null assertions (`!.`)
- [ ] No magic strings in `invalidateQueries` — use query key factories
- [ ] No magic numbers — named constants
- [ ] No bracketless `if`
- [ ] Prefer early return over nesting
- [ ] Single responsibility per function
- [ ] No comments explaining "what" or "how"
- [ ] No abbreviations
- [ ] `__tests__/` co-located with every logic folder
- [ ] Build passes (`npm run typecheck`)
- [ ] All tests pass (`npx vitest run`)
