import {concat, merge} from "lodash";
import CustomerModel from "@/models/customerModel";
import OrderModel from "@/models/orderModel";
import DonationEnum from "@/enums/donationEnum";
import PaymentMethodEnum from "@/enums/paymentMethodEnum";

// public path is from wp, used to set full images path
/* global publicPath */
let basePath = (typeof publicPath !== "undefined") && (publicPath !== null) ? publicPath[0] : ""
/* global apiNamespace */
let apiPath = (typeof apiNamespace !== "undefined") && (apiNamespace !== null) ? apiNamespace[0] : ""

export default class BaseFormStore {
  constructor() {
    this.state = {
      formType: "basic",
      baseImgPath: basePath,
      apiNamespace: apiPath,
      data: {
        step: 0,
        baseElementPrice: null,
        adopter: {
          id: null,
          type: null,
          first_name: "",
          last_name: "",
          email: "",
          address: "",
          postal_code: null,
          city: "",
          country: null,
          wants_newsletter: false
        },
        order: {
          id: null,
          uuid: null,
          type: "regular",
          clientSecret: null,
          stripePaymentIntentId: null,
          price: null,
          customAmount: false,
          quantity: 1,
          status: null
        },
        orderToken: "",
        donation: {
          type: DonationEnum.monthly,
          price: 0,
          status: null
        },
        payment_method: PaymentMethodEnum.creditCard,
        project: null,
      },
      isInitialized: false
    }

    this.getters = {
      getSteps: state => {
        let steps = []
        state.data.forms.forEach(form => {
          steps = concat(steps, form.steps)
        })
        return steps
      },
      step: state => state.data.step,
      getCurrentStep: (state, getters) => getters.getSteps[state.data.step],
      stepCount: (state, getters) => getters.getSteps.length,
      getApiData: (state, getters) => getters.getCurrentStep.api ? getters.getCurrentStep.api : null,
      getOrderToken: state => state.data.orderToken,
      getAdopter: state => state.data.adopter,
      getCustomerModel: state => new CustomerModel(state.data),
      getOrder: state => state.data.order,
      getImgPath: state => state.baseImgPath,
      getDonation: state => state.data.donation,
      getApiNamespace: state => state.apiNamespace,
      getOrderModel: (state) => new OrderModel(state.data),
      getProject: state => state.data.project,
      isInitialized: state => state.isInitialized,
      getPaymentMethod: state => state.data.payment_method
    };

    this.mutations = {
      updateForm(state, data) {
        merge(state.data, data)
      },
      forceUpdate(state, data) {
        state.data = data
      },
      incrementStep(state, count) {
        state.data.step = state.data.step + count
      },
      decrementStep(state, count) {
        state.data.step = state.data.step - count
      },
      initializeForm(state) {
        state.isInitialized = true
      }
    };

    this.actions = {
      forceUpdate(context, data) {
        return new Promise((resolve) => {
          context.commit('forceUpdate', data)
          resolve()
        })
      },
      updateForm(context, data) {
        return new Promise((resolve) => {
          context.commit('updateForm', data)
          resolve()
        })
      },
      incrementStep(context) {
        return new Promise(resolve => {
          let stepNumber = context.getters.step
          let stepIncremented = 1;
          let isNextStep = false

          while (stepNumber < context.getters.getSteps.length) {
            // context.getters.getSteps[stepNumber] = nextStep car les étapes ne commencent pas à 0
            if (
              context.getters.getSteps[stepNumber].evaluate === undefined ||
              context.getters.getSteps[stepNumber].evaluate(context.state)
            ) {
              isNextStep = true
              context.commit('incrementStep', stepIncremented)
              resolve()
              break
            }
            stepNumber++
            stepIncremented++
          }
          if (!isNextStep) {
            context.dispatch("loadNextForm")
              .then(() => {
                context.commit('incrementStep', 1)
                resolve()
              })
          }
        })
      },
      decrementStep(context) {
        if (context.state.data.step > 0) {
          let formToUnload = null;
          if (!Object.is(context.getters.getCurrentForm, context.getters.getPreviousForm)) {
            formToUnload = context.getters.getCurrentForm
          }

          let stepNumber = context.getters.step
          let stepDecreased = 1;
          let isPreviousStep = false

          while (stepNumber > 0) {
            // context.getters.getSteps[stepNumber - 2] = previous car les étapes ne commencent pas à 0
            let previousStep = context.getters.getSteps[stepNumber - 2]
            let currentStep = context.getters.getSteps[stepNumber - 1]
            currentStep.destroy(context.state)
            if (previousStep.evaluate(context.state)) {
              isPreviousStep = true
              context.commit('decrementStep', stepDecreased)
              if (formToUnload !== null) {
                context.commit('unloadForm', formToUnload)
              }
              break
            }
            stepNumber--
            stepDecreased++
          }

          if (!isPreviousStep) {
            context.commit('decrementStep', 1)
            if (formToUnload !== null) {
              context.commit('unloadForm', formToUnload)
            }
          }
        }
      },
      loadNextForm(context) {
        return new Promise(resolve => {
          context.getters.getCurrentForm.nextForm(context).then(() => resolve())
        })
      },
      initializeForm(context) {
        if (!context.state.isInitialized) {
          context.commit("initializeForm")
        }
      }
    }
  }
}
