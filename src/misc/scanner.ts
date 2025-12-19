import { DropImageFetchError } from "./errors";
import { BarcodeDetector, type DetectedBarcode } from "barcode-detector";
import { eventOn } from "callforth";

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

const adaptOldFormat = (detectedCodes: DetectedBarcode[]): QRCodeResult => {
  if (detectedCodes.length > 0) {
    const [firstCode] = detectedCodes;

    const [topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner] =
      firstCode.cornerPoints;

    return {
      content: firstCode.rawValue,
      location: {
        topLeftCorner,
        topRightCorner,
        bottomRightCorner,
        bottomLeftCorner,

        // not supported by native API:
        topLeftFinderPattern: {},
        topRightFinderPattern: {},
        bottomLeftFinderPattern: {},
      },
      imageData: null,
      binaryData: null,
    };
  } else {
    return {
      content: null,
      location: null,
      imageData: null,
      binaryData: null,
    };
  }
};

interface ScanState {
  lastScanned: number;
  contentBefore: string | null;
  locationBefore: QRCodeLocation | null;
  binaryData: Uint8ClampedArray | null;
}

export interface KeepScanningOptions {
  detectHandler: (result: QRCodeResult) => void;
  locateHandler: (detectedCodes: DetectedBarcode[]) => void;
  minDelay: number;
}

/**
 * Continuously extracts frames from camera stream and tries to read
 * potentially pictured QR codes.
 */
export const keepScanning = (
  videoElement: HTMLVideoElement,
  options: KeepScanningOptions
): void => {
  const barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] });

  const { detectHandler, locateHandler, minDelay } = options;

  const processFrame =
    (state: ScanState) =>
    async (timeNow: number): Promise<void> => {
      if (videoElement.readyState > 1) {
        const { lastScanned, contentBefore, locationBefore } = state;

        if (timeNow - lastScanned >= minDelay) {
          const detectedCodes = await barcodeDetector.detect(videoElement);
          const { content, location, imageData, binaryData } =
            adaptOldFormat(detectedCodes);

          if (content !== null && content !== contentBefore) {
            detectHandler({ content, location, imageData, binaryData });
          }

          if (location !== null || locationBefore !== null) {
            locateHandler(detectedCodes);
          }

          window.requestAnimationFrame(
            processFrame({
              lastScanned: timeNow,
              contentBefore: content ?? contentBefore,
              locationBefore: location,
              binaryData: binaryData,
            })
          );
        } else {
          window.requestAnimationFrame(processFrame(state));
        }
      }
    };

  processFrame({
    contentBefore: null,
    locationBefore: null,
    lastScanned: performance.now(),
    binaryData: null,
  })(performance.now());
};

const imageElementFromUrl = async (url: string): Promise<HTMLImageElement> => {
  if (url.startsWith("http") && url.includes(location.host) === false) {
    throw new DropImageFetchError();
  }

  const image = document.createElement("img");
  image.src = url;

  await eventOn(image, "load");

  return image;
};

export const processFile = async (
  file: File | Blob | ImageBitmap | ImageData
): Promise<QRCodeResult> => {
  const barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] });
  const detectedCodes = await barcodeDetector.detect(file);

  return adaptOldFormat(detectedCodes);
};

export const processUrl = async (url: string): Promise<QRCodeResult> => {
  const barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] });
  const image = await imageElementFromUrl(url);
  const detectedCodes = await barcodeDetector.detect(image);

  return adaptOldFormat(detectedCodes);
};
