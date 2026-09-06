import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@mui/material/styles'
import i18n from '@shared/i18n/config'
import { theme } from '@ui/theme'
import type { ReactNode } from 'react'
import { StudentFormContainer } from '../StudentFormContainer'
import type { StudentViewModel } from '@student/types'

const STUDENT_ID = 1

const STUDENT: StudentViewModel = {
  id: STUDENT_ID,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3A',
  ine: '123A',
  fullName: 'Jean Dupont',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  displayName: 'Jean Dupont',
  classLabel: '3A'
}

const FIELD_IDS = ['nom', 'prenom', 'classe', 'ine'] as const

const FIELD_LABELS: Record<(typeof FIELD_IDS)[number], string> = {
  nom: 'Nom',
  prenom: 'Prénom',
  classe: 'Classe',
  ine: 'INE'
}

async function fillForm(
  values: Record<(typeof FIELD_IDS)[number], string>,
  submitLabel = 'Ajouter'
) {
  for (const key of FIELD_IDS) {
    const input = screen.getByLabelText(FIELD_LABELS[key])
    input.focus()
    await userEvent.type(input, values[key])
  }
  await userEvent.click(screen.getByRole('button', { name: submitLabel }))
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </QueryClientProvider>
      </I18nextProvider>
    )
  }
}

describe('StudentFormContainer', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({ success: true, data: { students: [STUDENT] } }),
        create: vi.fn().mockResolvedValue({ success: true, data: STUDENT }),
        update: vi.fn().mockResolvedValue({ success: true, data: STUDENT })
      }
    })
  })

  it('renders in create mode', () => {
    render(<StudentFormContainer mode="create" student={null} open onClose={vi.fn()} />, {
      wrapper: createWrapper()
    })

    expect(screen.getByText('Ajouter un élève')).toBeInTheDocument()
  })

  it('renders in edit mode with student data', () => {
    render(<StudentFormContainer mode="edit" student={STUDENT} open onClose={vi.fn()} />, {
      wrapper: createWrapper()
    })

    expect(screen.getByText("Modifier l'élève")).toBeInTheDocument()
  })

  it('shows a success toast and closes after a successful create', async () => {
    const onClose = vi.fn()
    render(<StudentFormContainer mode="create" student={null} open onClose={onClose} />, {
      wrapper: createWrapper()
    })

    await fillForm({ nom: 'Martin', prenom: 'Léa', classe: '5B', ine: '999Z' })

    await waitFor(() => expect(screen.getByText('Un élève a bien été ajouté')).toBeInTheDocument())
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(window.electronAPI.student.create).toHaveBeenCalledWith({
      nom: 'Martin',
      prenom: 'Léa',
      classe: '5B',
      ine: '999Z'
    })
  })

  it('shows the live duplicate info while typing an existing INE', async () => {
    render(<StudentFormContainer mode="create" student={null} open onClose={vi.fn()} />, {
      wrapper: createWrapper()
    })

    const ineInput = screen.getByLabelText('INE')
    await waitFor(() => expect(window.electronAPI.student.list).toHaveBeenCalled())
    ineInput.focus()
    await userEvent.type(ineInput, '123A')

    expect(screen.getByText('Élève déjà enregistré : Jean Dupont')).toBeInTheDocument()
  })

  it('changes the submit button to Remplacer while a duplicate INE is typed', async () => {
    render(<StudentFormContainer mode="create" student={null} open onClose={vi.fn()} />, {
      wrapper: createWrapper()
    })

    await waitFor(() => expect(window.electronAPI.student.list).toHaveBeenCalled())
    const ineInput = screen.getByLabelText('INE')
    ineInput.focus()
    await userEvent.type(ineInput, '123A')

    expect(screen.getByRole('button', { name: 'Remplacer' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ajouter' })).not.toBeInTheDocument()
  })

  it('asks for confirmation in the same modal when the INE already exists, then replaces', async () => {
    const onClose = vi.fn()
    render(<StudentFormContainer mode="create" student={null} open onClose={onClose} />, {
      wrapper: createWrapper()
    })

    await waitFor(() => expect(window.electronAPI.student.list).toHaveBeenCalled())
    await fillForm({ nom: 'Martin', prenom: 'Léa', classe: '5B', ine: '123A' }, 'Remplacer')

    expect(screen.getByText("Remplacer les informations de l'élève ?")).toBeInTheDocument()
    expect(
      screen.getByText(
        'Un élève existe déjà avec cet INE (Jean Dupont, actuellement en 3A). Remplacer ses informations ?'
      )
    ).toBeInTheDocument()
    expect(window.electronAPI.student.create).not.toHaveBeenCalled()

    await userEvent.click(screen.getByRole('button', { name: 'Confirmer' }))

    await waitFor(() =>
      expect(screen.getByText("Les informations de l'élève ont été remplacées")).toBeInTheDocument()
    )
    expect(window.electronAPI.student.update).toHaveBeenCalledWith({
      id: STUDENT_ID,
      nom: 'Martin',
      prenom: 'Léa',
      classe: '5B'
    })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('returns to the form when the replace is cancelled', async () => {
    const onClose = vi.fn()
    render(<StudentFormContainer mode="create" student={null} open onClose={onClose} />, {
      wrapper: createWrapper()
    })

    await waitFor(() => expect(window.electronAPI.student.list).toHaveBeenCalled())
    await fillForm({ nom: 'Martin', prenom: 'Léa', classe: '5B', ine: '123A' }, 'Remplacer')

    await userEvent.click(screen.getByRole('button', { name: 'Annuler' }))

    // The confirmation step swaps back to the form inside the same modal, keeping
    // the values the user typed: nothing is updated and the modal stays open.
    expect(onClose).not.toHaveBeenCalled()
    expect(window.electronAPI.student.update).not.toHaveBeenCalled()
    expect(screen.getByLabelText('INE')).toHaveValue('123A')
  })

  it('shows an error toast when the create fails', async () => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({ success: true, data: { students: [] } }),
        create: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })
    render(<StudentFormContainer mode="create" student={null} open onClose={vi.fn()} />, {
      wrapper: createWrapper()
    })

    await fillForm({ nom: 'Martin', prenom: 'Léa', classe: '5B', ine: '999Z' })

    await waitFor(() => expect(screen.getByText('boom')).toBeInTheDocument())
  })

  it('shows an update toast and closes after a successful edit', async () => {
    const onClose = vi.fn()
    render(<StudentFormContainer mode="edit" student={STUDENT} open onClose={onClose} />, {
      wrapper: createWrapper()
    })

    await userEvent.click(screen.getByRole('button', { name: 'Enregistrer' }))

    await waitFor(() =>
      expect(
        screen.getByText("Les informations de l'élève ont été mises à jour")
      ).toBeInTheDocument()
    )
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
