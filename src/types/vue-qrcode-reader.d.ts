// Type definitions for qrcode-reader-vue3
// Project: https://github.com/scholtz/qrcode-reader-vue3
// Definitions: https://github.com/scholtz/qrcode-reader-vue3

import type { App, Plugin, DefineComponent } from 'vue';
import type { DetectedBarcode } from 'barcode-detector';

export * from './index';

declare module 'qrcode-reader-vue3' {
  import { QrcodeStream, QrcodeCapture, QrcodeDropZone, install } from './index';
  export { QrcodeStream, QrcodeCapture, QrcodeDropZone, install };
  export * from './index';
  
  const plugin: Plugin;
  export default plugin;
}

declare module 'QrcodeCapture' {
  import { QrcodeCapture } from './index';
  export default QrcodeCapture;
}

declare module 'QrcodeDropZone' {
  import { QrcodeDropZone } from './index';
  export default QrcodeDropZone;
}

declare module 'QrcodeStream' {
  import { QrcodeStream } from './index';
  export default QrcodeStream;
}
