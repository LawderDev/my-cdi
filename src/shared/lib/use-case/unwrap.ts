type UseCaseResultLike<T> = { success: true; data: T } | { success: false; error: string }

export function unwrap<T>(result: UseCaseResultLike<T>): T {
  if (!result.success) {
    throw new Error(result.error)
  }
  return result.data
}
