<template>
  <div class="button-container" :id="uuid">
    <v-tooltip
        class="btn-tooltip"
        color="primary"
        max-width="350"
        :attach="'#' + uuid"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon
            class="setup-tooltip-icon"
            color="primary"
            v-bind="attrs"
            v-on="on"
            small
        >
          mdi-information
        </v-icon>
      </template>
      <div class="tooltip-container">
        <slot></slot>
      </div>
    </v-tooltip>
  </div>
</template>

<script>
import {customAlphabet} from 'nanoid/non-secure';

export default {
  name: "btn-tooltip",
  props: {
    attach: {
      type: String,
      default: "#full-form"
    }
  },
  data() {
    return {
      uuid: null
    }
  },
  mounted() {
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ', 20);
    this.uuid = nanoid()
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  position: relative;
  display: inline-block;
}

.setup-tooltip-icon {
  color: $primary;
  margin-left: 16px;
  font-size: 20px !important;

  @media #{map-get($display-breakpoints, 'xs-only')} {
    margin-left: 9px;
  }
}

.tooltip-container {
  color: white;
  line-height: 24px;
  font-size: 16px;
  padding: 10px;
}
</style>
