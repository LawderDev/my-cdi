import { describe, it, expect } from 'vitest'
import { mapFormToCreateDto, mapFormToUpdateDto } from '../mapFormToCreateDto'
import type { StudentFormData } from '../../../types/StudentFormData'

describe('mapFormToCreateDto', () => {
  it('maps form data to CreateStudentDto', () => {
    const formData: StudentFormData = {
      nom: '  Dupont  ',
      prenom: '  Jean  ',
      classe: '  3ème A  ',
      ine: '  123A  '
    }
    const result = mapFormToCreateDto(formData)

    expect(result).toEqual({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3ème A',
      ine: '123A'
    })
  })
})

describe('mapFormToUpdateDto', () => {
  it('maps form data to UpdateStudentDto (only changed fields)', () => {
    const original = { nom: 'Old', prenom: 'Jean', classe: '3A', ine: '123A' }
    const formData: StudentFormData = { nom: 'New', prenom: 'Jean', classe: '3A', ine: '123A' }
    const result = mapFormToUpdateDto(original, formData)

    expect(result).toEqual({ nom: 'New' })
  })

  it('returns empty object when nothing changed', () => {
    const original = { nom: 'Same', prenom: 'Same', classe: 'Same', ine: 'Same' }
    const formData: StudentFormData = {
      nom: 'Same',
      prenom: 'Same',
      classe: 'Same',
      ine: 'Same'
    }
    const result = mapFormToUpdateDto(original, formData)

    expect(result).toEqual({})
  })
})
