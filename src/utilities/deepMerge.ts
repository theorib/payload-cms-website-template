/**
 * Simple object check.
 * @param item - The item to check
 * @returns True if the item is an object (not array or null), false otherwise
 */
export function isObject(item: unknown): item is Record<string, unknown> {
  return typeof item === 'object' && item !== null && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target - The target object to merge into
 * @param source - The source object to merge from
 * @returns The merged object
 */
export default function deepMerge<
  T extends Record<string, unknown>,
  R extends Record<string, unknown>,
>(target: T, source: R): T & R {
  const output = { ...target } as T & R

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceValue = source[key]
      const targetValue = target[key]

      if (isObject(sourceValue)) {
        if (!(key in target)) {
          Object.assign(output, { [key]: sourceValue })
        } else if (isObject(targetValue)) {
          const mergedValue = deepMerge(targetValue, sourceValue)
          Object.assign(output, { [key]: mergedValue })
        } else {
          Object.assign(output, { [key]: sourceValue })
        }
      } else {
        Object.assign(output, { [key]: sourceValue })
      }
    })
  }

  return output
}
