<template>
  <div>
    <hint
        class="my-2"
        v-if="alert"
        type="danger"
    >
      <p
          class="cg-base-text"
          v-html="alert"
      />
    </hint>

    <v-row>
      <v-col cols="6" xs="12">
        <text-input
            :value="order.quantity"
            :label="$t('default.stepper.adoption.quantity.label')"
            type="number"
            @input="updateQuantity"
            @change="checkQuantity"
            :max="max"
            :min="0"
            :rules="[rules.minValue, rules.required]"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" xs="12">
        <custom-amount
            v-model="order.price"
            ref="customAmount"
            @input="updateCustomAmount"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CustomAmount from "@/components/utils/CustomAmount";
import {mapGetters, mapActions} from "vuex";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import TextInput from "@/components/utils/TextInput.vue";
import validationMixin from "@/mixins/validationMixin";
import Hint from "@/components/utils/Hint.vue";

export default {
  name: "adoption-count-block",
  components: {
    Hint,
    TextInput,
    CustomAmount
  },
  mixins: [itemTranslationMixin, validationMixin],
  props: {
    alert: {
      type: String,
      default: ""
    },
    max: {
      type: Number,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
      minimumPrice: "getMinimumPrice"
    })
  },
  watch: {
    minimumPrice: {
      deep: true,
      handler(newVal) {
        this.setMinInput(newVal)
      }
    }
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm',
      setQuantity: 'setQuantity'
    }),
    updateCustomAmount(value) {
      if (value <= this.minimumPrice) {
        this.updateForm({order: {price: this.minimumPrice, customAmount: false}})
      } else {
        this.updateForm({order: {price: value, customAmount: true}})
      }
    },
    updateQuantity(value) {
      this.setQuantity(value)
    },
    checkQuantity(value) {
      if (value < 1) {
        this.setQuantity(1)
      }
    },
    setMinInput(value) {
      this.$refs.customAmount.setMinInput(value)
    }
  },
  mounted() {
    this.setMinInput(this.minimumPrice)
  }
}
</script>

<style lang="scss" scoped>
.v-divider {
  margin: 1rem 0;
  border-width: 1px;
}

.v-alert {
  margin-bottom: unset;
}
</style>
