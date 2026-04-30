import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import type { ReactNode } from 'react'
import { StudentFormFields } from '../StudentFormFields'
import type { FieldErrors } from 'react-hook-form'
import type { StudentFormData } from '../../../types/StudentFormData'

function FormHarness({
  children
}: {
  children: (register: ReturnType<typeof useForm<StudentFormData>>['register']) => ReactNode
}) {
  const { register } = useForm<StudentFormData>()
  return <>{children(register)}</>
}

function renderFields(errors: FieldErrors<StudentFormData> = {}) {
  return render(
    <I18nextProvider i18n={i18n}>
      <FormHarness>
        {(register) => <StudentFormFields register={register} errors={errors} />}
      </FormHarness>
    </I18nextProvider>
  )
}

describe('StudentFormFields', () => {
  it('renders all form fields', () => {
    renderFields()

    expect(screen.getByLabelText(/Nom/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Prénom/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Classe/)).toBeInTheDocument()
    expect(screen.getByLabelText(/INE/)).toBeInTheDocument()
  })

  it('shows error messages', () => {
    const errors: FieldErrors<StudentFormData> = {
      nom: { type: 'required', message: 'Le nom est obligatoire' }
    }
    renderFields(errors)

    expect(screen.getByText('Le nom est obligatoire')).toBeInTheDocument()
  })
})
