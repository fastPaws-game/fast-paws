const isPrimitive = (val: any): boolean => val !== Object(val)

const isObject = (obj: any): boolean => obj != null && typeof obj === 'object'

type Indexed<T = any> = { [k in string | symbol]: T }

// setValue({ foo: 5 }, 'bar.baz', 10), // { foo: 5, bar: { baz: 10 } }
export function setValue(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (isPrimitive(object)) return object
  if (typeof path != 'string' || path == '') throw new Error('Path must be string')
  let obj = object as Indexed
  const arr = path.split('.')
  const last = arr.pop()
  arr.forEach(key => {
    if (!obj[key]) obj[key] = {}
    obj = obj[key] as Indexed
  })
  obj[last!] = value
  return object
}

export function getValue(object: Indexed | unknown, path: string): Indexed | unknown {
  if (isPrimitive(object)) return object
  if (typeof path != 'string' || path == '') throw new Error('Path must be string')
  let obj = object as Indexed
  const arr = path.split('.')
  const last = arr.pop()
  arr.forEach(key => {
    if (!obj[key]) obj[key] = {}
    obj = obj[key] as Indexed
  })
  return obj[last!]
}
