<script lang="ts">
import { BarcodeDetector } from "barcode-detector";
import type { QRCodeResult } from "../misc/scanner";

export default {
  beforeMount() {
    // if (!('BarcodeDetector' in window)) {
    type WindowWithBarcodeDetector = Window & {
      BarcodeDetector?: typeof BarcodeDetector;
    };
    const windowWithBarcodeDetector = window as WindowWithBarcodeDetector;
    windowWithBarcodeDetector.BarcodeDetector = BarcodeDetector;
    // }
  },

  methods: {
    async onDetect(resultPromise: Promise<QRCodeResult>) {
      this.$emit("detect", resultPromise);

      try {
        const { content } = await resultPromise;

        if (content !== null) {
          this.$emit("decode", content);
        }
      } catch (error) {
        // fail silently
      }
    },
  },
};
</script>
