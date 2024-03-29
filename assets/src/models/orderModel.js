import i18n from "@/plugins/i18n";
import CustomerModel from "@/models/customerModel";
import ProductOrderModel from "@/models/productOrderModel";
import DonationOrderModel from "@/models/donationOrderModel";

export default class OrderModel {
  constructor(data) {
    let order = {
      customer: new CustomerModel(data),
      productsOrdered: null,
      donationOrdered: [],
      totalAmount: data.order.price + data.donation.price,
      lang: i18n.locale,
      paymentMethod: data.payment_method
    }

    if (data.selectedProduct !== null) {
      order.productsOrdered = new ProductOrderModel(data)
    }

    if (data.donation.price > 0) {
      order.donationOrdered = [new DonationOrderModel(data)]
    }

    return order;
  }
}
