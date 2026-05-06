export const stringSorter =
  <I, T extends keyof I>
    (item: I, key: T) =>
    (
      a: I[T] extends string ? I : never,
      b: I[T] extends string ? I : never
    ): I[T] extends string ? number : never => {
      const aVal = (a[key] as string).toLowerCase()
      const bVal = (b[key] as string).toLowerCase()
      if (aVal < bVal) return -1 as I[T] extends string ? number : never
      if (aVal > bVal) return 1 as I[T] extends string ? number : never
      return 0 as I[T] extends string ? number : never
    }