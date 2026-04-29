export type IpcResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }

export type IpcProcedure<Input, Output> = (input: Input) => Promise<Output>
