declare module 'webrtc-adapter/src/js/chrome/getusermedia' {
  export function shimGetUserMedia(window: Window, browserDetails: any): void;
}

declare module 'webrtc-adapter/src/js/firefox/getusermedia' {
  export function shimGetUserMedia(window: Window, browserDetails: any): void;
}

declare module 'webrtc-adapter/src/js/safari/safari_shim' {
  export function shimGetUserMedia(window: Window, browserDetails: any): void;
}
