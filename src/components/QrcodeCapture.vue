<template lang="html">
  <input
    @change="onChangeInput"
    type="file"
    name="image"
    accept="image/*"
    capture="environment"
    multiple
  />
</template>

<script lang="ts">
import { processFile } from "../misc/scanner";
import CommonAPI from "../mixins/CommonAPI.vue";

export default {
  name: "qrcode-capture",

  mixins: [CommonAPI],

  methods: {
    onChangeInput(event: Event) {
      const target = event.target as HTMLInputElement;
      const files = [...(target.files || [])];
      const resultPromises = files.map(processFile);

      resultPromises.forEach(this.onDetect);
    },
  },
};
</script>
