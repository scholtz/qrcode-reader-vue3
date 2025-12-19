import type { App, Plugin, DefineComponent } from 'vue';
import type { DetectedBarcode } from 'barcode-detector';

// QR Code result types
export interface QRCodeLocation {
  topLeftCorner: { x: number; y: number };
  topRightCorner: { x: number; y: number };
  bottomRightCorner: { x: number; y: number };
  bottomLeftCorner: { x: number; y: number };
  topLeftFinderPattern: Record<string, never>;
  topRightFinderPattern: Record<string, never>;
  bottomLeftFinderPattern: Record<string, never>;
}

export interface QRCodeResult {
  content: string | null;
  location: QRCodeLocation | null;
  imageData: ImageData | null;
  binaryData: Uint8ClampedArray | null;
}

// Component prop types
export interface QrcodeStreamProps {
  camera?: 'auto' | 'rear' | 'front' | 'off';
  torch?: boolean;
  track?: (detectedCodes: DetectedBarcode[], ctx: CanvasRenderingContext2D | null) => void;
}

export interface QrcodeCaptureProps {}

export interface QrcodeDropZoneProps {}

// Component types
export const QrcodeStream: DefineComponent<QrcodeStreamProps>;
export const QrcodeCapture: DefineComponent<QrcodeCaptureProps>;
export const QrcodeDropZone: DefineComponent<QrcodeDropZoneProps>;

// Plugin install function
export function install(app: App): void;

// Default export
declare const plugin: Plugin;
export default plugin;
