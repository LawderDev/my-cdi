let identifierCounter = 0

export function generateId(): string {
  identifierCounter += 1
  return `id-${identifierCounter}-${Math.random().toString(36).substring(2, 9)}`
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`)
}
