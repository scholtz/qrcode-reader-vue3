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

export const eventOn = (
  target: EventTarget,
  eventName: string
): Promise<Event> =>
  new Promise((resolve) => {
    const handler = (event: Event): void => {
      target.removeEventListener(eventName, handler);
      resolve(event);
    };

    target.addEventListener(eventName, handler);
  });

export const timeout = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
