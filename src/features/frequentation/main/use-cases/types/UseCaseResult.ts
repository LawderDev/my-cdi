export type UseCaseResult<T> = { success: true; data: T } | { success: false; error: string }
