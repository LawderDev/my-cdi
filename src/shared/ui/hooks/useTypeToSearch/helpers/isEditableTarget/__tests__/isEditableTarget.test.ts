import { describe, it, expect } from 'vitest'
import { isEditableTarget } from '../isEditableTarget'

describe('isEditableTarget', () => {
  it('detects input, textarea and select targets', () => {
    expect(isEditableTarget(document.createElement('input'))).toBe(true)
    expect(isEditableTarget(document.createElement('textarea'))).toBe(true)
    expect(isEditableTarget(document.createElement('select'))).toBe(true)
  })

  it('detects contenteditable elements', () => {
    const div = document.createElement('div')
    div.setAttribute('contenteditable', 'true')
    expect(isEditableTarget(div)).toBe(true)
  })

  it('rejects non-editable elements and non-element targets', () => {
    expect(isEditableTarget(document.body)).toBe(false)
    expect(isEditableTarget(document.createElement('div'))).toBe(false)
    expect(isEditableTarget(null)).toBe(false)
    expect(isEditableTarget(window)).toBe(false)
  })
})
