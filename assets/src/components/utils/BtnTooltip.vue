<template>
  <v-tooltip
      class="btn-tooltip"
      color="tertiary"
      max-width="350"
      attach="#full-form"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon
          class="setup-tooltip-icon"
          v-bind="attrs"
          v-on="on"
          small
      >
        mdi-information-outline
      </v-icon>
    </template>
    <slot></slot>
  </v-tooltip>
</template>

<script>
export default {
  name: "btn-tooltip",
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
.setup-tooltip-icon {
  position: absolute;
  right: -15px;
  top: -5px;
}
</style>