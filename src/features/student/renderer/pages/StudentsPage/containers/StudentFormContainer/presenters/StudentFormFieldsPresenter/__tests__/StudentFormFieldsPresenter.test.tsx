import { describe, it, expect } from 'vitest'
import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { StudentFormFieldsPresenter } from '../StudentFormFieldsPresenter'

const LABEL_NODE = 'nom-label'
const FIELD_NODE = 'field-input'

function buildFieldRowNodes(): ReactNode[] {
  return [
    <div key="nom">
      <label htmlFor="student-field-nom">{LABEL_NODE}</label>
      <input id="student-field-nom" />
    </div>,
    <div key="prenom">
      <label htmlFor="student-field-prenom">{FIELD_NODE}</label>
      <input id="student-field-prenom" />
    </div>
  ]
}

describe('StudentFormFieldsPresenter', () => {
  it('renders the field row nodes it receives', () => {
    render(<StudentFormFieldsPresenter fieldRowNodes={buildFieldRowNodes()} />)
    expect(screen.getByText(LABEL_NODE)).toBeInTheDocument()
    expect(screen.getByText(FIELD_NODE)).toBeInTheDocument()
    expect(screen.getByLabelText(LABEL_NODE)).toBeInTheDocument()
  })
})
