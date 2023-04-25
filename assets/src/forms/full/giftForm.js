import AbstractForm from "../abstractForm";
import ProductEnum from "@/enums/productEnum";
import {clone} from "lodash";
import Step from "@/forms/Step";
import RecipientCustomizationStep from "@/forms/steps/RecipientCustomizationStep";

export default class GiftForm extends AbstractForm {

  unload(state) {
    return new Promise(resolve => {
      state.data.order.productType = null
      state.data.order.quantity = 1
      state.data.order.price = null
      resolve()
    })
  }

  onload(state) {
    // cas d'une redirection de fichiers, on ne connait pas les produits et on n'en a pas besoin
    if (!state.products) {
      return
    }
    const products = state.products.filter(product => product.key === state.data.order.productType)
    const lowestPrice = Math.min(...products.map(product => product.price))
    state.data.order.price = lowestPrice
    state.data.baseElementPrice = lowestPrice
    state.data.selectedProduct = clone(products[0])
  }

  constructor() {
    super();
    this.steps = [
      new Step(
        "default.stepper.adoption.title",
        2,
        "ReefAdoptionStep",
        (state) => {
          return state.data.order.productType === ProductEnum.reef
        },
        true,
        false,
        false,
        true
      ),
      new Step(
        "default.stepper.adoption.title",
        2,
        "CoralAdoptionStep",
        (state) => {
          return state.data.order.productType === ProductEnum.coral
        },
        true,
        false,
        false,
        true
      ),
      new Step(
        "default.stepper.information.title",
        3,
        "InformationStep",
        () => true,
        true,
        false,
        false,
        true
      ),
      new RecipientCustomizationStep(),
      new Step(
        "default.stepper.bonusDonation.title",
        5,
        "PrePaymentDonationStep",
        () => true,
        true,
        true,
        false,
        true,
        null,
        true,
        false,
        'finalized'
      ),
      new Step(
        "default.stepper.payment.title",
        6,
        "PaymentStep",
        () => true,
        true,
        false,
        true,
        true,
        {method: "post", endpoint: "createOrder"},
        true,
        false,
        'pay'
      ),
      new Step(
        null,
        null,
        "FinalRecipientStep",
        () => true,
        true,
        false,
        false,
        false,
        null,
        false,
        true
      )
    ]
  }
}
