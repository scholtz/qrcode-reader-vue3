export const indempotent = <T extends (...args: any[]) => any>(
  action: T
): T => {
  let called = false;
  let result: ReturnType<T> | undefined = undefined;

  return ((...args: Parameters<T>) => {
    if (called) {
      return result;
    } else {
      result = action(...args);
      called = true;

      return result;
    }
  }) as T;
};
