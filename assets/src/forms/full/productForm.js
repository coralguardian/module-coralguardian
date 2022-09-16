import AbstractForm from "../abstractForm";
import adoptionHelper from "@/helpers/adoptionHelper";
import AdoptionForm from "@/forms/full/adoptionForm";
import GiftForm from "@/forms/full/giftForm";

export default class ProductForm extends AbstractForm {

  nextForm(context) {
    return new Promise((resolve, reject) => {
      let state = context.state
      switch (state.data.target) {
        case adoptionHelper.me:
          context.dispatch('loadForm', new AdoptionForm())
            .then(() => resolve())
            .catch((err) => {
              reject(err)
            })
          break;
        case adoptionHelper.friend:
          context.dispatch('loadForm', new GiftForm())
            .then(() => resolve())
            .catch((err) => {
              reject(err)
            })
          break;
        default:
          reject("Formulaire non trouvé")
      }
    })
  }

  steps = [
    {
      tab: {
        title: "default.stepper.header.full.adoption"
      },
      component: "AdoptionSetupStep",
      validate: true,
      customValidation: true,
      display: (state) => {
        return state.data.order.productType === null
      }
    }
  ]
}