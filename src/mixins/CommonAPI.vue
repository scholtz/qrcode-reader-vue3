<script lang="ts">
import { BarcodeDetector } from "barcode-detector";
import type { QRCodeResult } from "../misc/scanner";

export default {
  beforeMount() {
    // if (!('BarcodeDetector' in window)) {
    (window as any).BarcodeDetector = BarcodeDetector;
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
