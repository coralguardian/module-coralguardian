import {merge} from "lodash";
import i18n from "@/plugins/i18n";
import AdopterEnum from "@/enums/adopterEnum";

export default class CustomerModel {
  constructor(data) {
    let customer = {
      firstname: data.adopter.first_name,
      lastname: data.adopter.last_name,
      address: data.adopter.address,
      postalCode: data.adopter.postal_code,
      city: data.adopter.city,
      country: data.adopter.country,
      email: data.adopter.email,
      customerType: data.adopter.type,
      wantsNewsletter: data.adopter.wants_newsletter,
      language: i18n.locale
    }

    if (data.adopter.type === AdopterEnum.company) {
      merge(customer, {
        alternateNewsletterEmail: data.adopter.alternate_newsletter_email,
        companyName: data.adopter.company_name,
      })

      if (data.adopter.siret) {
        customer.siret = data.adopter.siret
      }
    }

    return customer
  }
}
