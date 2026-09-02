import { describe, it, expect, vi } from 'vitest'
import { downloadTextFile } from '../downloadTextFile'

describe('downloadTextFile', () => {
  it('creates an object URL, clicks a download anchor, and revokes the URL', () => {
    const objectUrl = 'blob:fake-url'
    const createObjectURL = vi.fn().mockReturnValue(objectUrl)
    const revokeObjectURL = vi.fn()
    vi.stubGlobal('URL', { ...URL, createObjectURL, revokeObjectURL })

    const click = vi.fn()
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(click)

    downloadTextFile('report body', 'report.txt')

    expect(createObjectURL).toHaveBeenCalledOnce()
    expect(click).toHaveBeenCalledOnce()
    expect(revokeObjectURL).toHaveBeenCalledWith(objectUrl)

    clickSpy.mockRestore()
    vi.unstubAllGlobals()
  })
})
