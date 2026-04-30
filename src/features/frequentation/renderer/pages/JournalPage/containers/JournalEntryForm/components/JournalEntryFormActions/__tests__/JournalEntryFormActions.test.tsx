import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { JournalEntryFormActions } from '../JournalEntryFormActions'

describe('JournalEntryFormActions', () => {
  it('triggers onCancel and disables submit while submitting', () => {
    const onCancel = vi.fn()
    render(
      <I18nextProvider i18n={i18n}>
        <JournalEntryFormActions isSubmitting onCancel={onCancel} />
      </I18nextProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: /annuler/i }))
    expect(onCancel).toHaveBeenCalled()
    expect(screen.getByRole('button', { name: /enregistrer/i })).toBeDisabled()
  })
})
