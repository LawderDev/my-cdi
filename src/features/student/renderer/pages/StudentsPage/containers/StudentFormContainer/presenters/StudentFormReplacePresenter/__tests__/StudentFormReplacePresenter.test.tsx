import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StudentFormReplacePresenter } from '../StudentFormReplacePresenter'

describe('StudentFormReplacePresenter', () => {
  it('renders the replace question message', () => {
    render(
      <StudentFormReplacePresenter message="Un élève existe déjà avec cet INE (Jean Dupont, actuellement en 3A)." />
    )

    expect(
      screen.getByText('Un élève existe déjà avec cet INE (Jean Dupont, actuellement en 3A).')
    ).toBeInTheDocument()
  })
})
