import { MaybeRefOrGetter, toRef, watch } from 'vue'

interface UseBodyClassOptions {
  trueClass: string
  falseClass: string
}

export function useBodyClass(value: MaybeRefOrGetter<boolean>, options: UseBodyClassOptions): void {
  if (typeof document === 'undefined') {
    return
  }

  const { trueClass } = options
  const { falseClass } = options

  const updateBodyClass = (newValue: boolean) => {
    document.body.classList.remove(newValue ? falseClass : trueClass)
    document.body.classList.add(newValue ? trueClass : falseClass)
  }

  watch(toRef(value), updateBodyClass, { immediate: true })
}
