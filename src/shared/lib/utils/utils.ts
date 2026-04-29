const ID_RADIX = 36
const ID_RANDOM_START = 2
const ID_RANDOM_END = 9

let identifierCounter = 0

export function generateId(): string {
  identifierCounter += 1
  const randomSegment = Math.random().toString(ID_RADIX).substring(ID_RANDOM_START, ID_RANDOM_END)
  return `id-${identifierCounter}-${randomSegment}`
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`)
}
