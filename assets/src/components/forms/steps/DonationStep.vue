<template>
  <div>
    <p>{{ $t("default.stepper.donation.description") }}</p>

    <v-tabs
        color="tertiary"
        centered
        grow
        :vertical="windowWidth <= 450"
    >
      <v-tab class="text-no-transform" @click="updateForm({donation: {type: donationEnum.oneshot}})">
        {{ $t("default.stepper.donation.buttons.unique") }}
      </v-tab>
      <v-tab class="text-no-transform" @click="updateForm({donation:{type: donationEnum.monthly}})">
        {{ $t("default.stepper.donation.buttons.recurrent") }}
      </v-tab>
    </v-tabs>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <donation-block/>
    </v-form>

  </div>
</template>

<script>
import DonationBlock from "@/components/forms/blocks/DonationBlock";
import {mapActions, mapGetters} from "vuex";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import validationMixin from "../../../mixins/validationMixin";

export default {
  name: "donation-step",
  components: {
    DonationBlock
  },
  mixins: [itemTranslationMixin, validationMixin],
  data() {
    return {
      windowWidth: null
    }
  },
  computed: {
    ...mapGetters({
      donation: "getDonation",
      donationEnum: "getDonationEnum"
    })
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    }),
  },
  mounted() {
    this.windowWidth = window.innerWidth
  }
}
</script>

<style lang="scss" scoped>
.v-tabs {
  padding: 2rem 0;
}
</style>