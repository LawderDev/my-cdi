const TRANSIENT_PROPS_PREFIX = '$'

const NON_FORWARDED_PROPS = new Set(['sx', 'theme', 'as', 'ownerState'])

export function shouldForwardStyledProp(prop: PropertyKey): boolean {
  if (typeof prop !== 'string') {
    return false
  }
  if (prop.startsWith(TRANSIENT_PROPS_PREFIX)) {
    return false
  }
  return !NON_FORWARDED_PROPS.has(prop)
}
