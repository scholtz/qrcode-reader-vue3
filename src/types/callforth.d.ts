declare module 'callforth' {
  export function eventOn(element: HTMLElement | HTMLVideoElement | HTMLImageElement, eventName: string): Promise<Event>;
  export function timeout(ms: number): Promise<void>;
}
