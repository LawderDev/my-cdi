# Design Spec — Filters, Sorting & Theming

## 1. Overview

Add popover filters and sort dropdowns to the **Journal de fréquentation** and **Students** pages. Introduce a polished **Dark** theme (aurora background) and a clean **Light** theme (solid cards, neutral borders, muted pastels). Add a Settings page with a theme toggle. The purple accent (`#7c4dff`) is fixed — no custom color picker.

## 2. Scope

### In Scope
- Popover filters on Journal page: activity type, student name/class, date range
- Sort dropdown on Journal page: time, name, class, activity
- Popover filters on Students page: class, visit count range, with/without visits
- Sort dropdown on Students page: all column headers (nom, prenom, classe, ine, visit count)
- Dark theme: aurora radial gradient background, translucent cards, accent glow on active elements
- Light theme: solid white cards, neutral warm gray borders, muted pastel tags, subtle shadows
- Settings page: theme toggle (dark / light), saved to localStorage

### Out of Scope
- Custom color picker
- Animation transitions between themes

### System Theme Detection
- On first launch (no `localStorage` preference), detect OS theme via `window.matchMedia('(prefers-color-scheme: dark)')`
- If the user manually selects a theme, that choice overrides the system preference and is persisted to `localStorage`
- A "System" option in the theme toggle allows the user to revert to following the OS preference
- Theme values: `"dark"`, `"light"`, `"system"` (default)

## 3. Filters

### 3.1 Journal Page Filters

| Filter | Type | UI |
|--------|------|-----|
| Activity type | Multi-select checkbox list | Popover |
| Student name/class | Search input + class dropdown | Popover |
| Date range | From / To date pickers | Popover |

All filters are combined with **AND** logic. An active filter chip appears below the toolbar for each active filter, with a remove (×) button. A **"Tout effacer"** link clears all active filters.

### 3.2 Students Page Filters

| Filter | Type | UI |
|--------|------|-----|
| Class | Multi-select checkbox list | Popover |
| Visit count range | Min / Max number inputs | Popover |
| With/without visits | Toggle switch | Popover |

Same chip + clear-all pattern as Journal.

### 3.3 Filter Popover Design

- Trigger: a **"Filtres"** button in the toolbar, styled as an accent-tinted secondary button
- Popover: MUI `Popover` component, anchored to the button
- Content: vertical stack of filter sections with section titles
- Each section has a subtle bottom border (`1px solid var(--border)`)
- Width: 280px
- Padding: 16px
- Shadow: `0 4px 20px rgba(0,0,0,0.15)` (dark), `0 4px 20px rgba(0,0,0,0.08)` (light)

## 4. Sorting

### 4.1 Journal Page Sort

Sort dropdown in the toolbar, options:
- Heure (défaut)
- Nom
- Classe
- Activité

Each option toggles between ascending and descending on click. Current sort is displayed in the dropdown button label: e.g. **"Trier: Heure ↑"**.

### 4.2 Students Page Sort

Keep existing column-header click-to-sort, but add a toolbar sort dropdown as an alternative (same pattern as Journal). The dropdown and column headers stay in sync.

## 5. Dark Theme

### 5.1 Background
- Base: `linear-gradient(160deg, #0a0f1a 0%, #0d1220 40%, #120a24 70%, #0a0f1a 100%)`
- Aurora overlay: 3 radial gradients (purple, blue, green) at very low opacity (2–6%)

### 5.2 Cards
- Background: `rgba(20, 29, 46, 0.85)`
- Border: `1px solid rgba(124, 77, 255, 0.06)`
- Border-radius: `14px`
- Hover: border transitions to `rgba(124, 77, 255, 0.12)`

### 5.3 Active States (Glow)
- Sidebar active item: `background: rgba(124, 77, 255, 0.12)`, `box-shadow: 0 0 12px rgba(124, 77, 255, 0.12)`
- Calendar selected day: `background: rgba(124, 77, 255, 0.18)`, `box-shadow: 0 0 8px rgba(124, 77, 255, 0.08)`
- Primary button: `box-shadow: 0 2px 12px rgba(124, 77, 255, 0.2)`
- Filter button: `box-shadow: 0 0 8px rgba(124, 77, 255, 0.06)`

### 5.4 Tags
- Blue: `bg: rgba(96, 165, 250, 0.1)`, `text: #60a5fa`, `border: rgba(96, 165, 250, 0.15)`
- Green: `bg: rgba(74, 222, 128, 0.1)`, `text: #4ade80`, `border: rgba(74, 222, 128, 0.15)`
- Amber: `bg: rgba(251, 191, 36, 0.1)`, `text: #fbbf24`, `border: rgba(251, 191, 36, 0.08)`
- Purple: `bg: rgba(124, 77, 255, 0.1)`, `text: #a78bfa`, `border: rgba(124, 77, 255, 0.1)`

## 6. Light Theme

### 6.1 Background
- Base: `linear-gradient(160deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)`
- No aurora overlay (clean and flat)

### 6.2 Cards
- Background: `#ffffff`
- Border: `1px solid #e2e8f0`
- Border-radius: `14px`
- Shadow: `0 1px 3px rgba(0, 0, 0, 0.04)`
- Hover: border transitions to `#cbd5e1`

### 6.3 Active States
- Sidebar active item: `background: #f5f3ff`, `color: #7c4dff`
- Calendar selected day: `background: #f5f3ff`, `color: #7c4dff`
- Primary button: `background: #7c4dff`, `box-shadow: 0 2px 8px rgba(124, 77, 255, 0.25)`
- Filter button: `background: #f5f3ff`, `color: #7c4dff`, `border: 1px solid #ddd6fe`

### 6.4 Tags
All tags use soft pastel backgrounds with darker text and a subtle matching border:

| Tag | Background | Text | Border |
|-----|-----------|------|--------|
| Blue | `#eff6ff` | `#1d4ed8` | `#bfdbfe` |
| Green | `#f0fdf4` | `#15803d` | `#bbf7d0` |
| Amber | `#fffbeb` | `#b45309` | `#fef3c7` |
| Purple | `#faf5ff` | `#7c3aed` | `#f3e8ff` |

### 6.5 Inputs
- Background: `#f8fafc`
- Border: `1px solid #e2e8f0`
- Border-radius: `10px`
- Placeholder text: `#94a3b8`
- Focus: border color `#7c4dff`, `box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.1)`

## 7. CSS Variables

The existing `global.css` variable system is extended to support both themes. Variables are toggled by a `data-theme` attribute on `<html>`.

```css
/* Dark (default) */
:root {
  --bg: #0f172a;
  --bg-gradient-start: #0a0f1a;
  --bg-gradient-mid: #0d1220;
  --bg-gradient-end: #0a0f1a;
  --card: rgba(20, 29, 46, 0.85);
  --card-solid: #1e293b;
  --surface: #172033;
  --surface-solid: #0b1220;
  --accent: #7c4dff;
  --accent-hover: #a78bfa;
  --accent-bg: rgba(124, 77, 255, 0.1);
  --accent-border: rgba(124, 77, 255, 0.15);
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border: rgba(124, 77, 255, 0.06);
  --border-hover: rgba(124, 77, 255, 0.12);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.15);
  --radius: 14px;
  --radius-sm: 10px;
  --radius-xs: 8px;
}

/* Light */
[data-theme="light"] {
  --bg: #f8fafc;
  --bg-gradient-start: #f8fafc;
  --bg-gradient-mid: #f1f5f9;
  --bg-gradient-end: #f8fafc;
  --card: #ffffff;
  --card-solid: #ffffff;
  --surface: #f8fafc;
  --surface-solid: #f1f5f9;
  --accent: #7c4dff;
  --accent-hover: #6d28d9;
  --accent-bg: #f5f3ff;
  --accent-border: #ddd6fe;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --border-hover: #cbd5e1;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.08);
}
```

## 8. Settings Page

### 8.1 Route
- `/settings` — accessible from the sidebar gear icon

### 8.2 Layout
- Two-column grid on desktop: Appearance card + Preview card
- Single column on mobile

### 8.3 Appearance Card
- **Theme toggle**: two selectable cards side by side (Dark / Light), showing an icon and label
- Selected theme gets the accent border and background tint
- Choice is persisted to `localStorage` under key `cdi-theme`
- On app start, the theme is read from `localStorage` and applied by setting `data-theme` on `<html>`

### 8.4 Preview Card
- Shows 2–3 sample list rows using the currently selected theme
- Updates instantly when the theme toggle changes (no page reload)

## 9. Component Plan

### New Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `FilterPopover` | `src/shared/ui/components/` | Reusable popover container for filters |
| `FilterChip` | `src/shared/ui/components/` | Active filter chip with remove button |
| `SortDropdown` | `src/shared/ui/components/` | Sort dropdown button + menu |
| `ThemeToggle` | `src/shared/ui/components/` | Dark/light theme selector |
| `JournalFilterContent` | `src/features/frequentation/renderer/pages/JournalPage/containers/JournalEntryList/components/` | Journal-specific filter form inside popover |
| `StudentFilterContent` | `src/features/student/renderer/pages/StudentsPage/containers/StudentList/components/` | Students-specific filter form inside popover |

### Modified Components
| Component | Changes |
|-----------|---------|
| `JournalEntryToolbar` | Add Filter button + Sort dropdown |
| `JournalEntryList` | Wire up filter state + sort state |
| `StudentListToolbar` | Add Filter button + Sort dropdown |
| `StudentList` | Wire up filter state + sync column sort with dropdown |
| `AppShell` | Apply `data-theme` attribute, read from localStorage on mount |
| `global.css` | Add light theme variables |
| `theme.ts` | Add light MUI theme variant |

## 10. Data Flow

```
JournalEntryList / StudentList
  ├─ FilterPopover (open/close state)
  │   └─ FilterContent (form state)
  ├─ FilterChip[] (derived from filter state)
  ├─ SortDropdown (sort state: { field, direction })
  └─ List (filtered + sorted entries)
```

Filter state is local to each page container. Sort state is also local. Both are computed on each render — no caching needed given the data size.

## 11. Error Handling

- Empty filter results: show empty state message in the list area
- Invalid date range (end before start): disable Apply button, show inline error
- Invalid visit count range: same pattern

## 12. Accessibility

- Filter popover: `aria-expanded` on trigger, focus trap inside popover
- Filter chips: each chip has a remove button with `aria-label="Supprimer filtre [name]"`
- Sort dropdown: `aria-label="Trier par"` on trigger
- Theme toggle: `role="radiogroup"`, each option `role="radio"`
- Color contrast: all text meets WCAG AA (4.5:1) in both themes

## 13. UX Audit Findings (To Address)

A full UI/UX audit was conducted. Here are the findings grouped by priority.

### CRITICAL (9 issues)

| # | Issue | File | Recommendation |
|---|-------|------|----------------|
| 1 | **Hover-only action visibility** — `.td-actions` and `JournalEntryRow` actions use `opacity: 0` and only reveal on `:hover`. Keyboard focus does **not** trigger hover, so tabbed users cannot see action buttons. | `global.css`, `JournalEntryRow.tsx` | Add `:focus-within` rules or always show actions. |
| 2 | **JournalEntryRow not keyboard accessible** — The entire row is a clickable `Box` (not native interactive). Keyboard users cannot focus or activate it. | `JournalEntryRow.tsx` | Convert to `<button>` or add `tabIndex={0}`, `onKeyDown`, and `:focus-visible` outline. |
| 3 | **Color contrast failure** — `var(--text-dim)` (#64748b) on `var(--card)` (#1e293b) ≈ 3.7:1, fails WCAG AA 4.5:1 for small text. | `global.css` | Lighten `--text-dim` to `#94a3b8` or darker surfaces. |
| 4 | **White-on-accent contrast failure** — `#fff` on `var(--accent)` (#7c4dff) ≈ 3.0:1. Logo text, today badge, primary button fail AA. | `SidebarView.tsx`, `CalendarDay.tsx`, `Button.tsx` | Use darker accent variant `#6d28d9` for backgrounds with white text, or increase font size/weight. |
| 5 | **Destructive confirm autoFocus** — `ConfirmDialog` sets `autoFocus` on the **confirm** button. Users can accidentally trigger delete with Enter. | `ConfirmDialog.tsx` | Remove `autoFocus` or move it to the cancel button. |
| 6 | **MobileTimePicker in desktop app** — `TimeRow` uses `MobileTimePicker` in Electron, showing a mobile wheel instead of desktop input. | `TimeRow.tsx` | Use `DesktopTimePicker` or adaptive `TimePicker`. |
| 7 | **Keyboard shortcuts hijack input** — `Ctrl/Cmd+1/2/3` listen on `window` and call `preventDefault()` unconditionally, intercepting typing in text fields. | `AppShell.tsx` | Check `event.target` is not `<input>`, `<textarea>`, or `[contenteditable]`. |
| 8 | **Settings link bypasses router** — `window.location.hash = '#'` breaks deep linking, back button, and state management. | `Sidebar.tsx` | Implement a real `/settings` route via react-router. |
| 9 | **Raw hex values instead of tokens** — Multiple components use raw `#fff` instead of theme tokens, breaking theme switching. | `Button.tsx`, `SidebarView.tsx`, `CalendarDay.tsx` | Replace with `theme.palette.primary.contrastText` or CSS variable. |

### HIGH (16 issues)

| # | Issue | File | Recommendation |
|---|-------|------|----------------|
| 10 | **No loading spinner on submit** — Submit button only disables, no visual feedback during async save. | `JournalEntryForm.tsx` | Show `CircularProgress` or "Saving…" label. |
| 11 | **No empty states** — Zero students or zero search results show nothing. No guidance for users. | `StudentList.tsx`, `StatisticsPage.tsx` | Add `<EmptyState>` component with helpful message + action. |
| 12 | **No 404/fallback route** — Unknown paths show blank. | `routes/index.tsx` | Add catch-all route with redirect or error page. |
| 13 | **Dialog aria-label duplicates title** — `Modal.tsx` sets `aria-label={title}` while `DialogTitle` is visible. Causes duplicate screen reader announcements. | `Modal.tsx` | Remove `aria-label`, rely on visible `DialogTitle`. |
| 14 | **Fixed px layout** — `gridTemplateColumns: '320px 1fr'` and `RESPONSIVE_BREAKPOINT_PX` are hardcoded. | `JournalPage.tsx`, `StatisticsPage.tsx` | Use `minmax()` or MUI breakpoints. |
| 15 | **Nested scroll contexts** — `main` scrolls vertically, `JournalEntryList` Card also scrolls. Creates scroll trapping. | `JournalPage.tsx` | Remove inner Card scroll, let page scroll naturally. |
| 16 | **No visual shortcut affordance** — Keyboard shortcuts exist but nowhere in the UI shows them. | `AppShell.tsx` | Add shortcut hints in Sidebar tooltips or help menu. |
| 17 | **Fonts loaded from network** — Google Fonts `@import` fails offline, causing layout shift. | `global.css` | Bundle fonts locally via npm or electron-builder extras. |
| 18 | **Unused dependency bloat** — `@mui/icons-material` installed but unused; app uses Material Icons font. | `package.json` | Remove `@mui/icons-material` from deps. |
| 19 | **No `:active` press state** — Custom `Button` and `IconButton` lack pressed feedback. | `Button.tsx`, `IconButton.tsx` | Add `&:active` style (e.g., `transform: translateY(1px)` or darken). |
| 20 | **Loading state not announced** — `StudentList` and `StatisticsPage` loading text has no `role="status"` or `aria-live`. | `StudentList.tsx`, `StatisticsPage.tsx` | Add `role="status"` and `aria-live="polite"`. |
| 21 | **Form errors far from fields** — Submit errors appear in Snackbar at bottom, not near offending fields. | `JournalEntryForm.tsx` | Display inline errors or a summary banner at top of form. |
| 22 | **No deep linking** — Selected date and search term are state-only, not shareable via URL. | `JournalPage.tsx`, `StudentListToolbar.tsx` | Sync state to URL query params. |
| 23 | **Layout shift from banner** — `UpdateBanner` pushes content down when it appears. | `UpdateBanner.tsx` | Reserve fixed space or animate with `transform`. |
| 24 | **No `prefers-reduced-motion`** — All transitions animate regardless of OS accessibility settings. | Global | Add `@media (prefers-reduced-motion: reduce)` query. |
| 25 | **Icon font fallback** — If Material Icons font fails, users see raw text (`groups`, `search`). | `Icon.tsx` | Add `font-display: swap` or migrate to SVG icons. |

### MEDIUM (18 issues)

| # | Issue | File | Recommendation |
|---|-------|------|----------------|
| 26 | **Base font size 14px** — Below 16px recommended for accessible default text. | `global.css` | Consider 15px or 16px body, 14px for UI chrome only. |
| 27 | **11px uppercase labels** — Very small uppercase text is harder to read. | `global.css` | Use 12px minimum or sentence-case. |
| 28 | **Activity chip backgrounds too faint** — `0.12` opacity makes tags almost invisible against cards. | `global.css` | Increase to `0.2` or `0.25`. |
| 29 | **No `contrastText` in theme** — Primary palette lacks `contrastText`, leading to ad-hoc `#fff`. | `theme.ts` | Add `contrastText` to all palette colors. |
| 30 | **Form label not associated** — `StudentMultiSelect` label is `<Box component="span">` with no `htmlFor`. | `StudentMultiSelect.tsx` | Use `<label htmlFor>` or `aria-labelledby`. |
| 31 | **Table lacks caption/aria-label** — Native `<table>` has no context for screen readers. | `StudentTable.tsx` | Add `<caption>` or `aria-label`. |
| 32 | **Snackbar duration too short** — 4000ms may not be enough for cognitive/motor impairments. | `JournalEntryList.tsx`, `StudentList.tsx` | Increase to 6000ms+ or add close button. |
| 33 | **No `:focus-visible` on NavButton** — Browser default ring may be low-contrast on dark sidebar. | `NavButton.tsx` | Add explicit `&:focus-visible` outline. |
| 34 | **No empty state announcement** — `EmptyState` lacks `role="status"`. | `EmptyState.tsx` | Add `role="status"`. |
| 35 | **Visits placeholder not described** — `—` dash has no `aria-label`. | `StudentTableRow.tsx` | Add `aria-label={t('visits.none')}`. |
| 36 | **Spacing not on 8pt grid** — `px: 3.5` = 28px, not a multiple of 8. | `AppShell.tsx` | Use `px: 4` (32px) or `px: 3` (24px). |
| 37 | **MUI v9 with React 19** — `@mui/material` ^9.0.0 is very new; verify Electron Chromium compat. | `package.json` | Check MUI docs for React 19 support matrix. |

## 14. Testing

- Unit tests for filter logic (AND combination, date range, visit count)
- Unit tests for sort logic (ascending/descending per field)
- Component tests for FilterPopover open/close, chip add/remove
- Visual regression: both themes rendered and compared against baselines
- Accessibility audit: run axe-core or Lighthouse a11y check on both themes
