<template lang="html">
  <div
    @drop.prevent.stop="onDrop"
    @dragenter.prevent.stop="onDragOver(true)"
    @dragleave.prevent.stop="onDragOver(false)"
    @dragover.prevent.stop
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { processFile, processUrl } from "../misc/scanner";
import CommonAPI from "../mixins/CommonAPI.vue";

export default {
  name: "qrcode-drop-zone",

  mixins: [CommonAPI],

  methods: {
    onDragOver(isDraggingOver: boolean) {
      this.$emit("dragover", isDraggingOver);
    },

    onDrop({ dataTransfer }: DragEvent) {
      this.onDragOver(false);

      const droppedFiles = [...(dataTransfer?.files || [])];
      const droppedUrl = dataTransfer?.getData("text/uri-list") || "";

      droppedFiles.forEach((file) => {
        this.onDetect(processFile(file));
      });

      if (droppedUrl !== "") {
        this.onDetect(processUrl(droppedUrl));
      }
    },
  },
};
</script>
