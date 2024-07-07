export const arrayIsEqual = (array1: unknown[], array2: unknown[]) =>
  array1.length === array2.length && array1.every((value, index) => value === array2[index])
