<template>
    <text-input
        :rules="[rules.required, rules.minLength, rules.specialChar]"
        :placeholder="$tc(label, order.quantity, {number: n, item: translation.item})"
        :max-length="30"
        :counter="true"
        v-model="value"
        @input="$emit('input', value)"
    />
</template>

<script>
import TextInput from "../../utils/TextInput";
import validationMixin from "../../../mixins/validationMixin";
import itemTranslationMixin from "../../../mixins/itemTranslationMixin";
import {mapGetters} from "vuex";

export default {
  name: "adoption-name-block",
  mixins: [validationMixin, itemTranslationMixin],
  components: {
    TextInput
  },
  props: {
    value: null,
    n: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapGetters({
      project: "getProject"
    }),
    label() {
      return 'default.stepper.customization.input.label.' + this.project
    },
    placeholder() {
      return 'default.stepper.customization.input.placeholder.' + this.project
    }
  }
}
</script>

<style scoped>

</style>
