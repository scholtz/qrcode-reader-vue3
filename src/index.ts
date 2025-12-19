import type { App, Plugin } from "vue";
import QrcodeStream from "./components/QrcodeStream.vue";
import QrcodeCapture from "./components/QrcodeCapture.vue";
import QrcodeDropZone from "./components/QrcodeDropZone.vue";

// Install the components
export function install(app: App): void {
  app.component("qrcode-stream", QrcodeStream);
  app.component("qrcode-capture", QrcodeCapture);
  app.component("qrcode-drop-zone", QrcodeDropZone);
}

// Expose the components
export { QrcodeStream, QrcodeCapture, QrcodeDropZone };

// Export types
export type { QRCodeResult, QRCodeLocation } from "./misc/scanner";

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin: Plugin = { install };

export default plugin;

// Auto-install
declare global {
  interface Window {
    Vue?: App;
  }
}

let GlobalVue: App | null = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue ?? null;
} else {
  type GlobalWithVue = typeof globalThis & { Vue?: App };
  const maybeGlobal = globalThis as GlobalWithVue;
  GlobalVue = maybeGlobal.Vue ?? null;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
