export type IdObj<Value> = { [id: string]: Value }

export const isObject = (value: unknown): value is IdObj<unknown> => typeof value === 'object' && value !== null

export const objIsEqual = (obj1: IdObj<unknown>, obj2: IdObj<unknown>): boolean => {
  const entries1 = Object.entries(obj1)
  return (
    entries1.length === Object.keys(obj2).length &&
    entries1.every(([index, value1]) => {
      const value2 = obj2[index]
      return isObject(value1) && isObject(value2) ? objIsEqual(value1, value2) : value1 === value2
    })
  )
}
